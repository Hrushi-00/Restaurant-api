import AuthRepository from "./auth.repository.js";

import hashPassword from "../../utils/hashPassword.js";
import comparePassword from "../../utils/comparePassword.js";
import { userResponse } from "./auth.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

import ApiError from "../../utils/ApiError.js";
import {
  enqueueEmailJob,
  enqueueNotificationJob,
} from "../../queues/index.js";

class AuthService {
  /**
   * Register User
   */
  async register(userData) {
    const { name, email, phone, password } = userData;

    // Check existing email
    const existingEmail = await AuthRepository.findUserByEmail(email);

    if (existingEmail) {
      throw new ApiError(409, "Email already registered");
    }

    // Check existing phone
    if (phone) {
      const existingPhone = await AuthRepository.findUserByPhone(phone);

      if (existingPhone) {
        throw new ApiError(409, "Phone number already registered");
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await AuthRepository.createUser({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    void enqueueNotificationJob("welcome-user", {
      userId: user._id.toString(),
      type: "welcome",
      title: "Welcome to RestroFlow",
      message: `Hello ${user.name}, your account has been created successfully.`,
      email: user.email,
    });

    if (user.email) {
      void enqueueEmailJob("welcome-email", {
        to: user.email,
        subject: "Welcome to RestroFlow",
        text: `Hello ${user.name}, your account has been created successfully.`,
      });
    }

    return userResponse(user);
  }

  /**
   * Login User
   */
  async login(email, password) {
    const user = await AuthRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Generate Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save Refresh Token
    await AuthRepository.updateRefreshToken(
      user._id,
      refreshToken
    );

    // Remove sensitive data
    user.password = undefined;
    user.refreshToken = undefined;

    void enqueueNotificationJob("user-login", {
      userId: user._id.toString(),
      type: "login",
      title: "Login successful",
      message: `${user.name} just signed in.`,
      email: user.email,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Logout User
   */
  async logout(userId) {
    await AuthRepository.removeRefreshToken(userId);

    return true;
  }
  async getCurrentUser(userId) {
    const user = await AuthRepository.findUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return userResponse(user);
  }
}

export default new AuthService();
