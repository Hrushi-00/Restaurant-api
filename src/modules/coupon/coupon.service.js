import CouponRepository from "./coupon.repository.js";
import CouponDTO from "./coupon.dto.js";

import ApiError from "../../utils/ApiError.js";

class CouponService {
  resolveTenantId(user) {
    if (user?.tenantId) {
      return user.tenantId;
    }

    if (user?.restaurantId) {
      return user.restaurantId;
    }

    throw new ApiError(
      400,
      "Tenant ID not found."
    );
  }

  async createCoupon(user, payload) {
    const tenantId =
      this.resolveTenantId(user);

    const existingCoupon =
      await CouponRepository.findByCode(
        payload.code,
        tenantId
      );

    if (existingCoupon) {
      throw new ApiError(
        409,
        "Coupon code already exists."
      );
    }

    const startDate =
      new Date(payload.startDate);

    const endDate =
      new Date(payload.endDate);

    if (endDate <= startDate) {
      throw new ApiError(
        400,
        "End date must be greater than start date."
      );
    }

    this.validateDiscountPayload(payload);

    const coupon =
      await CouponRepository.create({
        ...payload,
        tenantId,
        code: payload.code.toUpperCase(),
      });

    return CouponDTO.couponResponse(coupon);
  }

  async getCouponById(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const coupon =
      await CouponRepository.findById(
        id,
        tenantId
      );

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found."
      );
    }

    return CouponDTO.couponResponse(coupon);
  }

  async getCoupons(user, queryParams) {
    const tenantId =
      this.resolveTenantId(user);

    const page = Number(
      queryParams.page || 1
    );

    const limit = Number(
      queryParams.limit || 20
    );

    const skip = (page - 1) * limit;

    const filters = {};

    if (queryParams.code) {
      filters.code =
        queryParams.code.toUpperCase();
    }

    if (queryParams.discountType) {
      filters.discountType =
        queryParams.discountType;
    }

    if (
      queryParams.isActive !== undefined
    ) {
      filters.isActive =
        queryParams.isActive === "true";
    }

    if (queryParams.fromDate) {
      filters.startDate = {
        $gte: new Date(
          queryParams.fromDate
        ),
      };
    }

    if (queryParams.toDate) {
      filters.endDate = {
        ...(filters.endDate || {}),
        $lte: new Date(
          queryParams.toDate
        ),
      };
    }

    const [coupons, total] =
      await Promise.all([
        CouponRepository.findAll(
          tenantId,
          filters,
          skip,
          limit
        ),

        CouponRepository.count(
          tenantId,
          filters
        ),
      ]);

    return {
      data:
        CouponDTO.couponListResponse(
          coupons
        ),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    };
  }

  async updateCoupon(
    user,
    id,
    payload
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const coupon =
      await CouponRepository.findById(
        id,
        tenantId
      );

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found."
      );
    }

    if (payload.code) {
      const existingCoupon =
        await CouponRepository.findByCode(
          payload.code,
          tenantId
        );

      if (
        existingCoupon &&
        existingCoupon._id.toString() !==
          id.toString()
      ) {
        throw new ApiError(
          409,
          "Coupon code already exists."
        );
      }

      payload.code =
        payload.code.toUpperCase();
    }

    const startDate = new Date(
      payload.startDate ||
        coupon.startDate
    );

    const endDate = new Date(
      payload.endDate ||
        coupon.endDate
    );

    if (endDate <= startDate) {
      throw new ApiError(
        400,
        "End date must be greater than start date."
      );
    }

    const mergedPayload = {
      ...coupon.toObject(),
      ...payload,
    };

    this.validateDiscountPayload(
      mergedPayload
    );

    const updatedCoupon =
      await CouponRepository.updateById(
        id,
        tenantId,
        payload
      );

    return CouponDTO.couponResponse(
      updatedCoupon
    );
  }

  async deleteCoupon(user, id) {
    const tenantId =
      this.resolveTenantId(user);

    const coupon =
      await CouponRepository.findById(
        id,
        tenantId
      );

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found."
      );
    }

    if (coupon.usedCount > 0) {
      throw new ApiError(
        400,
        "Used coupons cannot be deleted. Deactivate the coupon instead."
      );
    }

    await CouponRepository.deleteById(
      id,
      tenantId
    );

    return {
      id,
      deleted: true,
    };
  }

  async updateStatus(
    user,
    id,
    isActive
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const coupon =
      await CouponRepository.findById(
        id,
        tenantId
      );

    if (!coupon) {
      throw new ApiError(
        404,
        "Coupon not found."
      );
    }

    const updatedCoupon =
      await CouponRepository.updateStatus(
        id,
        tenantId,
        isActive
      );

    return CouponDTO.couponResponse(
      updatedCoupon
    );
  }

  async validateCoupon(
    user,
    code,
    orderAmount
  ) {
    const tenantId =
      this.resolveTenantId(user);

    const coupon =
      await CouponRepository.findByCode(
        code,
        tenantId
      );

    if (!coupon) {
      throw new ApiError(
        404,
        "Invalid coupon code."
      );
    }

    const now = new Date();

    if (!coupon.isActive) {
      throw new ApiError(
        400,
        "Coupon is inactive."
      );
    }

    if (
      now < coupon.startDate ||
      now > coupon.endDate
    ) {
      throw new ApiError(
        400,
        "Coupon has expired or is not active yet."
      );
    }

    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >=
        coupon.usageLimit
    ) {
      throw new ApiError(
        400,
        "Coupon usage limit has been reached."
      );
    }

    if (
      orderAmount <
      coupon.minimumOrderAmount
    ) {
      throw new ApiError(
        400,
        `Minimum order amount is ${coupon.minimumOrderAmount}.`
      );
    }

    const discountAmount =
      this.calculateDiscount(
        coupon,
        orderAmount
      );

    return {
      coupon:
        CouponDTO.couponResponse(coupon),

      discountAmount,

      finalAmount: Math.max(
        orderAmount - discountAmount,
        0
      ),
    };
  }

  calculateDiscount(
    coupon,
    orderAmount
  ) {
    let discount = 0;

    switch (coupon.discountType) {
      case "FLAT":
        discount =
          coupon.discountValue;
        break;

      case "PERCENTAGE":
        discount =
          (orderAmount *
            coupon.discountValue) /
          100;
        break;

      case "FESTIVAL":
        discount =
          (orderAmount *
            coupon.discountValue) /
          100;
        break;

      case "BOGO":
        // BOGO discount is finalized
        // using order item quantities.
        discount = 0;
        break;

      default:
        discount = 0;
    }

    if (
      coupon.maximumDiscountAmount !==
        null &&
      discount >
        coupon.maximumDiscountAmount
    ) {
      discount =
        coupon.maximumDiscountAmount;
    }

    return Math.min(
      discount,
      orderAmount
    );
  }

  validateDiscountPayload(
    payload
  ) {
    if (
      payload.discountType ===
        "PERCENTAGE" ||
      payload.discountType ===
        "FESTIVAL"
    ) {
      if (
        payload.discountValue <= 0 ||
        payload.discountValue > 100
      ) {
        throw new ApiError(
          400,
          "Percentage discount must be between 0 and 100."
        );
      }
    }

    if (
      payload.discountType === "FLAT" &&
      payload.discountValue <= 0
    ) {
      throw new ApiError(
        400,
        "Flat discount must be greater than 0."
      );
    }

    if (
      payload.discountType ===
      "BOGO"
    ) {
      if (
        !payload.buyQuantity ||
        !payload.getQuantity
      ) {
        throw new ApiError(
          400,
          "BOGO requires buyQuantity and getQuantity."
        );
      }
    }
  }
}

export default new CouponService();