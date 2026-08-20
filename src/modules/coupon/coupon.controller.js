import CouponService from "./coupon.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

class CouponController {
  createCoupon = asyncHandler(async (req, res) => {
    const coupon = await CouponService.createCoupon(
      req.user,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        coupon,
        "Coupon created successfully."
      )
    );
  });

  getCouponById = asyncHandler(async (req, res) => {
    const coupon = await CouponService.getCouponById(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        coupon,
        "Coupon fetched successfully."
      )
    );
  });

  getCoupons = asyncHandler(async (req, res) => {
    const result = await CouponService.getCoupons(
      req.user,
      req.query
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result.data,
        "Coupons fetched successfully.",
        result.pagination
      )
    );
  });

  updateCoupon = asyncHandler(async (req, res) => {
    const coupon = await CouponService.updateCoupon(
      req.user,
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        coupon,
        "Coupon updated successfully."
      )
    );
  });

  deleteCoupon = asyncHandler(async (req, res) => {
    const result = await CouponService.deleteCoupon(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Coupon deleted successfully."
      )
    );
  });

  updateStatus = asyncHandler(async (req, res) => {
    const coupon = await CouponService.updateStatus(
      req.user,
      req.params.id,
      req.body.isActive
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        coupon,
        "Coupon status updated successfully."
      )
    );
  });

  validateCoupon = asyncHandler(async (req, res) => {
    const result = await CouponService.validateCoupon(
      req.user,
      req.body.code,
      req.body.orderAmount
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Coupon is valid."
      )
    );
  });
}

export default new CouponController();