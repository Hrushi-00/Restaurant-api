export const paymentResponse = (payment) => {
  if (!payment) return null;

  return {
    id: payment._id,

    tenantId: payment.tenantId,

    invoiceNumber: payment.invoiceNumber,

    order: payment.orderId
      ? {
          id: payment.orderId._id,
          orderNumber: payment.orderId.orderNumber,
          orderType: payment.orderId.orderType,
          orderStatus: payment.orderId.status,
        }
      : null,

    customer: payment.customerId
      ? {
          id: payment.customerId._id,
          name: payment.customerId.name,
          mobile: payment.customerId.mobile,
          email: payment.customerId.email,
        }
      : null,

    amount: payment.amount,

    discount: payment.discount,

    tax: payment.tax,

    tip: payment.tip,

    totalAmount: payment.totalAmount,

    paidAmount: payment.paidAmount,

    remainingAmount: payment.remainingAmount,

    paymentMethod: payment.paymentMethod,

    paymentStatus: payment.paymentStatus,

    transactionId: payment.transactionId,

    razorpayOrderId: payment.razorpayOrderId,

    razorpayPaymentId: payment.razorpayPaymentId,

    paidAt: payment.paidAt,

    refundAmount: payment.refundAmount,

    refundReason: payment.refundReason,

    notes: payment.notes,

    createdAt: payment.createdAt,

    updatedAt: payment.updatedAt,
  };
};

export const paymentListResponse = (payments) => {
  return payments.map((payment) =>
    paymentResponse(payment)
  );
};