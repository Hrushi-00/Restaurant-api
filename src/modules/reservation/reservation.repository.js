import Reservation from "./reservation.model.js";

class ReservationRepository {
  async create(data) {
    return await Reservation.create(data);
  }

  async findById(id) {
    return await Reservation.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("tableId")
      .populate("customerId");
  }

  async findByReservationNumber(reservationNumber) {
    return await Reservation.findOne({
      reservationNumber,
      isDeleted: false,
    });
  }

  async findAllByTenant(tenantId) {
    return await Reservation.find({
      tenantId,
      isDeleted: false,
    })
      .populate("tableId")
      .populate("customerId")
      .sort({
        reservationDate: 1,
        timeSlot: 1,
      });
  }

  async findByTableAndDate(
    tenantId,
    tableId,
    reservationDate,
    timeSlot
  ) {
    return await Reservation.findOne({
      tenantId,
      tableId,
      reservationDate,
      timeSlot,
      status: {
        $in: [
          "PENDING",
          "CONFIRMED",
          "SEATED",
        ],
      },
      isDeleted: false,
    });
  }

  async update(id, data) {
    return await Reservation.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateStatus(id, status) {
    return await Reservation.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
  }

  async checkIn(id) {
    return await Reservation.findByIdAndUpdate(
      id,
      {
        status: "SEATED",
        checkedInAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async checkOut(id) {
    return await Reservation.findByIdAndUpdate(
      id,
      {
        status: "COMPLETED",
        checkedOutAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async cancel(id) {
    return await Reservation.findByIdAndUpdate(
      id,
      {
        status: "CANCELLED",
      },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return await Reservation.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async countByTenant(tenantId) {
    return await Reservation.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }
}

export default new ReservationRepository();