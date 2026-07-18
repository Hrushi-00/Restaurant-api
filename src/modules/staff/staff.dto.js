// src/modules/staff/staff.dto.js

export const staffResponse = (staff) => ({
  id: staff._id,

  tenantId: staff.tenantId,

  employeeId: staff.employeeId,

  name: staff.name,

  email: staff.email,

  phone: staff.phone,

  role: staff.role,

  salary: staff.salary,

  joiningDate: staff.joiningDate,

  shift: staff.shift,

  status: staff.status,

  createdAt: staff.createdAt,

  updatedAt: staff.updatedAt,
});