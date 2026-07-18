import AuthService from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const user = await AuthService.register(req.body);

  return res.status(201).json(
    new ApiResponse(201, user, "User registered successfully")
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await AuthService.login(
    email,
    password
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        accessToken,
      },
      "Login successful"
    )
  );
});

export const logout = asyncHandler(async (req, res) => {
  await AuthService.logout(req.user.id);

  res.clearCookie("refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful"));
});
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await AuthService.getCurrentUser(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "User profile fetched successfully"
    )
  );
});