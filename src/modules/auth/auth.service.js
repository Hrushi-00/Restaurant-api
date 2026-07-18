import AuthRepository from "./auth.repository.js";

import hashPassword from "../../utils/hashPassword.js";
import comparePassword from "../../utils/comparePassword.js";
import { userResponse } from "./auth.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

import ApiError from "../../utils/ApiError.js";

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