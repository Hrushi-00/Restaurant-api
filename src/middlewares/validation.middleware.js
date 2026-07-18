import { validationResult } from "express-validator";
import ApiResponse from "../utils/ApiResponse.js";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(
      new ApiResponse(
        400,
        errors.array(),
        "Validation failed"
      )
    );
  }

  next();
};

export default validationMiddleware;