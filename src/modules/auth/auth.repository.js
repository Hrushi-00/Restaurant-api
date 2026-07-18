import Auth from "./auth.model.js";

class AuthRepository {
  async createUser(userData) {
    return await Auth.create(userData);
  }

  async findUserByEmail(email) {
    return await Auth.findOne({ email }).select("+password +refreshToken");
  }

  async findUserByPhone(phone) {
    return await Auth.findOne({ phone });
  }

  async findUserById(userId) {
    return await Auth.findById(userId);
  }

  async updateUser(userId, updateData) {
    return await Auth.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await Auth.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true }
    );
  }

  async removeRefreshToken(userId) {
    return await Auth.findByIdAndUpdate(
      userId,
      { refreshToken: null },
      { new: true }
    );
  }
}

export default new AuthRepository();