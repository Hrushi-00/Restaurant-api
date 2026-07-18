import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export default hashPassword;