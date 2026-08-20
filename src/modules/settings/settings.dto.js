class SettingsDTO {
  settingsResponse(settings) {
    if (!settings) {
      return null;
    }

    return {
      id: settings._id,

      tenantId: settings.tenantId,

      restaurantName:
        settings.restaurantName,

      logo: settings.logo,

      phone: settings.phone,

      email: settings.email,

      address: {
        street:
          settings.address?.street || "",
        city:
          settings.address?.city || "",
        state:
          settings.address?.state || "",
        pincode:
          settings.address?.pincode || "",
        country:
          settings.address?.country ||
          "India",
      },

      tax: {
        enabled:
          settings.tax?.enabled ?? true,

        gstEnabled:
          settings.tax?.gstEnabled ??
          false,

        gstNumber:
          settings.tax?.gstNumber || "",

        taxPercentage:
          settings.tax?.taxPercentage || 0,
      },

      currency:
        settings.currency || "INR",

      orderSettings: {
        dineInEnabled:
          settings.orderSettings
            ?.dineInEnabled ?? true,

        takeawayEnabled:
          settings.orderSettings
            ?.takeawayEnabled ?? true,

        deliveryEnabled:
          settings.orderSettings
            ?.deliveryEnabled ?? false,

        onlineOrderEnabled:
          settings.orderSettings
            ?.onlineOrderEnabled ?? true,
      },

      paymentSettings: {
        cashEnabled:
          settings.paymentSettings
            ?.cashEnabled ?? true,

        upiEnabled:
          settings.paymentSettings
            ?.upiEnabled ?? true,

        cardEnabled:
          settings.paymentSettings
            ?.cardEnabled ?? true,

        razorpayEnabled:
          settings.paymentSettings
            ?.razorpayEnabled ?? false,
      },

      invoiceSettings: {
        invoicePrefix:
          settings.invoiceSettings
            ?.invoicePrefix || "INV",

        showTax:
          settings.invoiceSettings
            ?.showTax ?? true,

        showRestaurantAddress:
          settings.invoiceSettings
            ?.showRestaurantAddress ?? true,

        footerText:
          settings.invoiceSettings
            ?.footerText ||
          "Thank you for visiting!",
      },

      notificationSettings: {
        lowStockEnabled:
          settings.notificationSettings
            ?.lowStockEnabled ?? true,

        newOrderEnabled:
          settings.notificationSettings
            ?.newOrderEnabled ?? true,

        paymentEnabled:
          settings.notificationSettings
            ?.paymentEnabled ?? true,
      },

      businessHours:
        settings.businessHours,

      createdAt:
        settings.createdAt,

      updatedAt:
        settings.updatedAt,
    };
  }
}

export default new SettingsDTO();