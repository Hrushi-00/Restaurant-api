export const reservationResponse = (reservation) => {
  if (!reservation) return null;

  return {
    id: reservation._id,

    tenantId: reservation.tenantId,

    reservationNumber: reservation.reservationNumber,

    table: reservation.tableId
      ? {
          id: reservation.tableId._id,
          tableNumber: reservation.tableId.tableNumber,
          tableName: reservation.tableId.tableName,
          capacity: reservation.tableId.capacity,
        }
      : null,

    customer: reservation.customerId
      ? {
          id: reservation.customerId._id,
          name: reservation.customerId.name,
          mobile: reservation.customerId.mobile,
          email: reservation.customerId.email,
        }
      : null,

    guestName: reservation.guestName,

    mobile: reservation.mobile,

    email: reservation.email,

    reservationDate: reservation.reservationDate,

    timeSlot: reservation.timeSlot,

    guestCount: reservation.guestCount,

    specialRequest: reservation.specialRequest,

    status: reservation.status,

    checkedInAt: reservation.checkedInAt,

    checkedOutAt: reservation.checkedOutAt,

    createdAt: reservation.createdAt,

    updatedAt: reservation.updatedAt,
  };
};

export const reservationListResponse = (reservations) => {
  return reservations.map((reservation) =>
    reservationResponse(reservation)
  );
};