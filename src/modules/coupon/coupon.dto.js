class CouponDTO {
  couponResponse(coupon) {
    if (!coupon) {
      return null;
    }

    return {
      id: coupon._id,
      tenantId: coupon.tenantId,

      code: coupon.code,
      description: coupon.description || "",

      discountType: coupon.discountType,
      discountValue: coupon.discountValue,

      buyQuantity: coupon.buyQuantity,
      getQuantity: coupon.getQuantity,

      minimumOrderAmount:
        coupon.minimumOrderAmount,

      maximumDiscountAmount:
        coupon.maximumDiscountAmount,

      startDate: coupon.startDate,
      endDate: coupon.endDate,

      usageLimit: coupon.usageLimit,
      usedCount: coupon.usedCount,

      remainingUsage:
        coupon.usageLimit !== null
          ? Math.max(
              coupon.usageLimit -
                coupon.usedCount,
              0
            )
          : null,

      isActive: coupon.isActive,

      createdAt: coupon.createdAt,
      updatedAt: coupon.updatedAt,
    };
  }

  couponListResponse(coupons) {
    return coupons.map((coupon) =>
      this.couponResponse(coupon)
    );
  }

  validationResponse(coupon, discountAmount) {
    return {
      coupon: this.couponResponse(coupon),
      discountAmount,
      finalAmount: Math.max(
        0,
        discountAmount
      ),
    };
  }
}

export default new CouponDTO();