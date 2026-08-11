import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outputPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "Postman Collection",
  "RestroFlow.postman_collection.json"
);

const noAuth = { type: "noauth" };
const bearerAuth = {
  type: "bearer",
  bearer: [
    {
      key: "token",
      value: "{{accessToken}}",
      type: "string",
    },
  ],
};

const jsonHeaders = [
  {
    key: "Content-Type",
    value: "application/json",
  },
];

function request({ name, method, url, body, auth, testScript }) {
  const item = {
    name,
    request: {
      method,
      url,
    },
  };

  if (body) {
    item.request.header = jsonHeaders;
    item.request.body = {
      mode: "raw",
      raw: JSON.stringify(body, null, 2),
    };
  }

  if (auth) {
    item.request.auth = auth;
  }

  if (testScript) {
    item.event = [
      {
        listen: "test",
        script: {
          type: "text/javascript",
          exec: testScript,
        },
      },
    ];
  }

  return item;
}

function folder(name, items) {
  return { name, item: items };
}

const authItems = [
  request({
    name: "Register",
    method: "POST",
    url: "{{baseUrl}}/auth/register",
    auth: noAuth,
    body: {
      name: "Hrushikesh Kapse",
      email: "hrushikesh@example.com",
      phone: "9876543210",
      password: "Password@123!",
    },
  }),
  request({
    name: "Login",
    method: "POST",
    url: "{{baseUrl}}/auth/login",
    auth: noAuth,
    body: {
      email: "hrushikesh@example.com",
      password: "Password@123!",
    },
    testScript: [
      "try {",
      "  var json = pm.response.json();",
      "  if (json && json.data && json.data.accessToken) {",
      "    pm.collectionVariables.set('accessToken', json.data.accessToken);",
      "  }",
      "} catch (error) {}",
    ],
  }),
  request({
    name: "Logout",
    method: "POST",
    url: "{{baseUrl}}/auth/logout",
  }),
  request({
    name: "Me",
    method: "GET",
    url: "{{baseUrl}}/auth/me",
  }),
];

const restaurantItems = [
  request({
    name: "Create Restaurant",
    method: "POST",
    url: "{{baseUrl}}/restaurants",
    body: {
      name: "RestroFlow Downtown",
      email: "owner@restroflow.com",
      phone: "9876543210",
      address: {
        street: "MG Road",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        pincode: "411001",
      },
      gstNumber: "27AAAAA0000A1Z5",
      fssaiNumber: "12345678901234",
      timezone: "Asia/Kolkata",
      currency: "INR",
    },
  }),
  request({
    name: "Get My Restaurant",
    method: "GET",
    url: "{{baseUrl}}/restaurants/me",
  }),
  request({
    name: "Get All Restaurants",
    method: "GET",
    url: "{{baseUrl}}/restaurants",
  }),
  request({
    name: "Get Restaurant By Id",
    method: "GET",
    url: "{{baseUrl}}/restaurants/{{restaurantId}}",
  }),
  request({
    name: "Update Restaurant",
    method: "PUT",
    url: "{{baseUrl}}/restaurants/{{restaurantId}}",
    body: {
      name: "RestroFlow Downtown Updated",
      phone: "9876543211",
      isActive: true,
    },
  }),
  request({
    name: "Delete Restaurant",
    method: "DELETE",
    url: "{{baseUrl}}/restaurants/{{restaurantId}}",
  }),
];

const staffItems = [
  request({
    name: "Create Staff",
    method: "POST",
    url: "{{baseUrl}}/staff",
    body: {
      name: "Aman Sharma",
      email: "aman@example.com",
      phone: "9876543211",
      role: "CHEF",
      salary: 25000,
      joiningDate: "2026-08-01",
      shift: "FULL_DAY",
      status: "ACTIVE",
    },
  }),
  request({
    name: "Get All Staff",
    method: "GET",
    url: "{{baseUrl}}/staff",
  }),
  request({
    name: "Get Staff By Id",
    method: "GET",
    url: "{{baseUrl}}/staff/{{staffId}}",
  }),
  request({
    name: "Update Staff",
    method: "PUT",
    url: "{{baseUrl}}/staff/{{staffId}}",
    body: {
      name: "Aman Sharma Updated",
      role: "MANAGER",
      salary: 28000,
      status: "ACTIVE",
    },
  }),
  request({
    name: "Update Staff Status",
    method: "PATCH",
    url: "{{baseUrl}}/staff/{{staffId}}/status",
    body: {
      status: "INACTIVE",
    },
  }),
  request({
    name: "Delete Staff",
    method: "DELETE",
    url: "{{baseUrl}}/staff/{{staffId}}",
  }),
];

const categoryItems = [
  request({
    name: "Create Category",
    method: "POST",
    url: "{{baseUrl}}/categories/create",
    body: {
      name: "Starters",
      description: "Appetizers and small plates",
      image: "https://example.com/category/starters.png",
      displayOrder: 1,
      isActive: true,
    },
  }),
  request({
    name: "Get All Categories",
    method: "GET",
    url: "{{baseUrl}}/categories/list",
  }),
  request({
    name: "Get Category By Id",
    method: "GET",
    url: "{{baseUrl}}/categories/details/{{categoryId}}",
  }),
  request({
    name: "Update Category",
    method: "PUT",
    url: "{{baseUrl}}/categories/update/{{categoryId}}",
    body: {
      name: "Main Course",
      description: "Updated category description",
      displayOrder: 2,
    },
  }),
  request({
    name: "Update Category Status",
    method: "PATCH",
    url: "{{baseUrl}}/categories/status/{{categoryId}}",
    body: {
      isActive: false,
    },
  }),
  request({
    name: "Delete Category",
    method: "DELETE",
    url: "{{baseUrl}}/categories/delete/{{categoryId}}",
  }),
];

const menuItems = [
  request({
    name: "Create Menu Item",
    method: "POST",
    url: "{{baseUrl}}/menu/create",
    body: {
      categoryId: "{{categoryId}}",
      name: "Paneer Tikka",
      description: "Smoky paneer cubes with spices",
      sku: "MENU-PANEER-TIKKA",
      price: 220,
      discountPrice: 199,
      preparationTime: 15,
      foodType: "VEG",
      taxPercentage: 5,
      displayOrder: 1,
      isAvailable: true,
      isFeatured: true,
    },
  }),
  request({
    name: "Get All Menu Items",
    method: "GET",
    url: "{{baseUrl}}/menu/list",
  }),
  request({
    name: "Get Menu Item By Id",
    method: "GET",
    url: "{{baseUrl}}/menu/details/{{menuId}}",
  }),
  request({
    name: "Update Menu Item",
    method: "PUT",
    url: "{{baseUrl}}/menu/update/{{menuId}}",
    body: {
      categoryId: "{{categoryId}}",
      name: "Paneer Tikka Updated",
      price: 240,
      discountPrice: 210,
      isFeatured: false,
    },
  }),
  request({
    name: "Update Menu Availability",
    method: "PATCH",
    url: "{{baseUrl}}/menu/availability/{{menuId}}",
    body: {
      isAvailable: false,
    },
  }),
  request({
    name: "Delete Menu Item",
    method: "DELETE",
    url: "{{baseUrl}}/menu/delete/{{menuId}}",
  }),
];

const orderItems = [
  request({
    name: "Create Order",
    method: "POST",
    url: "{{baseUrl}}/orders/create",
    body: {
      customerName: "Rahul Mehta",
      customerPhone: "9876543210",
      orderType: "DINE_IN",
      items: [
        {
          menuId: "{{menuId}}",
          quantity: 2,
        },
      ],
      discount: 20,
      paymentMethod: "UPI",
      notes: "Less spicy",
    },
  }),
  request({
    name: "Get All Orders",
    method: "GET",
    url: "{{baseUrl}}/orders/list",
  }),
  request({
    name: "Get Order By Id",
    method: "GET",
    url: "{{baseUrl}}/orders/details/{{orderId}}",
  }),
  request({
    name: "Update Order",
    method: "PUT",
    url: "{{baseUrl}}/orders/update/{{orderId}}",
    body: {
      customerName: "Rahul Mehta Updated",
      items: [
        {
          menuId: "{{menuId}}",
          quantity: 1,
        },
      ],
      notes: "Please pack separately",
    },
  }),
  request({
    name: "Update Order Status",
    method: "PATCH",
    url: "{{baseUrl}}/orders/status/{{orderId}}",
    body: {
      orderStatus: "PREPARING",
    },
  }),
  request({
    name: "Update Payment Status",
    method: "PATCH",
    url: "{{baseUrl}}/orders/payment/{{orderId}}",
    body: {
      paymentStatus: "PAID",
    },
  }),
  request({
    name: "Delete Order",
    method: "DELETE",
    url: "{{baseUrl}}/orders/delete/{{orderId}}",
  }),
];

const tableItems = [
  request({
    name: "Create Table",
    method: "POST",
    url: "{{baseUrl}}/tables/create",
    body: {
      tableNumber: "T-01",
      tableName: "Window Table",
      capacity: 4,
      section: "Ground Floor",
      qrCode: "{{qrCode}}",
      isActive: true,
    },
  }),
  request({
    name: "Get All Tables",
    method: "GET",
    url: "{{baseUrl}}/tables/list",
  }),
  request({
    name: "Get Table By Id",
    method: "GET",
    url: "{{baseUrl}}/tables/details/{{tableId}}",
  }),
  request({
    name: "Get Tables By Status",
    method: "GET",
    url: "{{baseUrl}}/tables/status/{{tableStatus}}",
  }),
  request({
    name: "Update Table",
    method: "PUT",
    url: "{{baseUrl}}/tables/update/{{tableId}}",
    body: {
      tableName: "Corner Table",
      capacity: 6,
      section: "First Floor",
    },
  }),
  request({
    name: "Update Table Status",
    method: "PATCH",
    url: "{{baseUrl}}/tables/status/{{tableId}}",
    body: {
      status: "RESERVED",
    },
  }),
  request({
    name: "Delete Table",
    method: "DELETE",
    url: "{{baseUrl}}/tables/delete/{{tableId}}",
  }),
];

const customerItems = [
  request({
    name: "Create Customer",
    method: "POST",
    url: "{{baseUrl}}/customers/create",
    body: {
      name: "Rahul Mehta",
      phone: "9876543210",
      email: "rahul@example.com",
      gender: "MALE",
      dateOfBirth: "1995-05-10",
      address: "Pune, Maharashtra",
      notes: "VIP guest",
      isActive: true,
    },
  }),
  request({
    name: "Get All Customers",
    method: "GET",
    url: "{{baseUrl}}/customers/list",
  }),
  request({
    name: "Search Customers",
    method: "GET",
    url: "{{baseUrl}}/customers/search?keyword={{searchKeyword}}",
  }),
  request({
    name: "Top Customers",
    method: "GET",
    url: "{{baseUrl}}/customers/top",
  }),
  request({
    name: "Recent Customers",
    method: "GET",
    url: "{{baseUrl}}/customers/recent",
  }),
  request({
    name: "Get Customer By Id",
    method: "GET",
    url: "{{baseUrl}}/customers/details/{{customerId}}",
  }),
  request({
    name: "Update Customer",
    method: "PUT",
    url: "{{baseUrl}}/customers/update/{{customerId}}",
    body: {
      name: "Rahul Mehta Updated",
      phone: "9876543212",
      address: "Updated address",
      notes: "Loyal customer",
    },
  }),
  request({
    name: "Delete Customer",
    method: "DELETE",
    url: "{{baseUrl}}/customers/delete/{{customerId}}",
  }),
];

const kotItems = [
  request({
    name: "Create KOT",
    method: "POST",
    url: "{{baseUrl}}/kot/create",
    body: {
      orderId: "{{orderId}}",
      tableId: "{{tableId}}",
      tokenNumber: 12,
      priority: "NORMAL",
      estimatedTime: 20,
      notes: "Serve hot",
      items: [
        {
          menuItemId: "{{menuId}}",
          name: "Paneer Tikka",
          quantity: 2,
          station: "KITCHEN",
          notes: "No onion",
        },
      ],
    },
  }),
  request({
    name: "Get All KOT",
    method: "GET",
    url: "{{baseUrl}}/kot/list",
  }),
  request({
    name: "Get KOT By Id",
    method: "GET",
    url: "{{baseUrl}}/kot/details/{{kotId}}",
  }),
  request({
    name: "Get Kitchen Queue",
    method: "GET",
    url: "{{baseUrl}}/kot/kitchen-queue",
  }),
  request({
    name: "Get Ready Orders",
    method: "GET",
    url: "{{baseUrl}}/kot/ready-orders",
  }),
  request({
    name: "Update KOT Status",
    method: "PATCH",
    url: "{{baseUrl}}/kot/update-status/{{kotId}}",
    body: {
      status: "PREPARING",
    },
  }),
  request({
    name: "Assign Chef",
    method: "PATCH",
    url: "{{baseUrl}}/kot/assign-chef/{{kotId}}",
    body: {
      chefId: "{{chefId}}",
    },
  }),
  request({
    name: "Delete KOT",
    method: "DELETE",
    url: "{{baseUrl}}/kot/delete/{{kotId}}",
  }),
];

const qrMenuItems = [
  request({
    name: "Scan QR Menu",
    method: "GET",
    url: "{{baseUrl}}/qr-menu/scan/{{qrCode}}",
    auth: noAuth,
  }),
  request({
    name: "Create QR Menu",
    method: "POST",
    url: "{{baseUrl}}/qr-menu/create",
    body: {
      tableId: "{{tableId}}",
    },
  }),
  request({
    name: "Get All QR Menus",
    method: "GET",
    url: "{{baseUrl}}/qr-menu/list",
  }),
  request({
    name: "Get QR Menu By Id",
    method: "GET",
    url: "{{baseUrl}}/qr-menu/details/{{qrMenuId}}",
  }),
  request({
    name: "Update QR Menu Status",
    method: "PATCH",
    url: "{{baseUrl}}/qr-menu/update-status/{{qrMenuId}}",
    body: {
      status: "ACTIVE",
    },
  }),
  request({
    name: "Regenerate QR Menu",
    method: "PATCH",
    url: "{{baseUrl}}/qr-menu/regenerate/{{qrMenuId}}",
  }),
  request({
    name: "Delete QR Menu",
    method: "DELETE",
    url: "{{baseUrl}}/qr-menu/delete/{{qrMenuId}}",
  }),
];

const reservationItems = [
  request({
    name: "Create Reservation",
    method: "POST",
    url: "{{baseUrl}}/reservation/create",
    body: {
      tableId: "{{tableId}}",
      customerId: "{{customerId}}",
      guestName: "Rahul Mehta",
      mobile: "9876543210",
      email: "rahul@example.com",
      reservationDate: "2026-08-10",
      timeSlot: "19:30",
      guestCount: 4,
      specialRequest: "Window seat preferred",
    },
  }),
  request({
    name: "Get All Reservations",
    method: "GET",
    url: "{{baseUrl}}/reservation/list",
  }),
  request({
    name: "Get Reservation By Id",
    method: "GET",
    url: "{{baseUrl}}/reservation/details/{{reservationId}}",
  }),
  request({
    name: "Update Reservation Status",
    method: "PATCH",
    url: "{{baseUrl}}/reservation/update-status/{{reservationId}}",
    body: {
      status: "CONFIRMED",
    },
  }),
  request({
    name: "Check In Reservation",
    method: "PATCH",
    url: "{{baseUrl}}/reservation/check-in/{{reservationId}}",
  }),
  request({
    name: "Check Out Reservation",
    method: "PATCH",
    url: "{{baseUrl}}/reservation/check-out/{{reservationId}}",
  }),
  request({
    name: "Cancel Reservation",
    method: "PATCH",
    url: "{{baseUrl}}/reservation/cancel/{{reservationId}}",
  }),
  request({
    name: "Delete Reservation",
    method: "DELETE",
    url: "{{baseUrl}}/reservation/delete/{{reservationId}}",
  }),
];

const paymentItems = [
  request({
    name: "Create Payment Order",
    method: "POST",
    url: "{{baseUrl}}/payment/create-order",
    body: {
      orderId: "{{orderId}}",
      customerId: "{{customerId}}",
      amount: 500,
      discount: 20,
      tax: 25,
      tip: 0,
      notes: "Payment for dine-in order",
    },
  }),
  request({
    name: "Verify Payment",
    method: "POST",
    url: "{{baseUrl}}/payment/verify-payment",
    body: {
      paymentId: "{{paymentId}}",
      razorpayOrderId: "order_TEST123",
      razorpayPaymentId: "pay_TEST123",
      razorpaySignature: "signature_test_value",
    },
  }),
  request({
    name: "Refund Payment",
    method: "POST",
    url: "{{baseUrl}}/payment/refund/{{paymentId}}",
    body: {
      refundAmount: 100,
      refundReason: "Customer requested partial refund",
    },
  }),
  request({
    name: "Get All Payments",
    method: "GET",
    url: "{{baseUrl}}/payment/list",
  }),
  request({
    name: "Get Payment By Id",
    method: "GET",
    url: "{{baseUrl}}/payment/details/{{paymentId}}",
  }),
  request({
    name: "Delete Payment",
    method: "DELETE",
    url: "{{baseUrl}}/payment/delete/{{paymentId}}",
  }),
];

const inventoryItems = [
  request({
    name: "Create Inventory",
    method: "POST",
    url: "{{baseUrl}}/inventory/create",
    body: {
      itemCode: "ING-0001",
      itemName: "Basmati Rice",
      category: "Grains",
      supplierId: "{{supplierId}}",
      unit: "KG",
      openingStock: 50,
      minimumStock: 10,
      maximumStock: 100,
      purchasePrice: 70,
      sellingPrice: 90,
      expiryDate: "2026-12-31",
      notes: "Primary kitchen stock",
    },
  }),
  request({
    name: "Get All Inventories",
    method: "GET",
    url: "{{baseUrl}}/inventory/list?page=1&limit=10&search={{searchKeyword}}&category=Grains&status=ACTIVE&lowStock=true",
  }),
  request({
    name: "Get Inventory By Id",
    method: "GET",
    url: "{{baseUrl}}/inventory/details/{{inventoryId}}",
  }),
  request({
    name: "Update Inventory",
    method: "PATCH",
    url: "{{baseUrl}}/inventory/update/{{inventoryId}}",
    body: {
      itemName: "Basmati Rice Premium",
      category: "Grains",
      unit: "KG",
      minimumStock: 12,
      maximumStock: 120,
      purchasePrice: 75,
      sellingPrice: 95,
      status: "ACTIVE",
      notes: "Updated stock master",
    },
  }),
  request({
    name: "Delete Inventory",
    method: "DELETE",
    url: "{{baseUrl}}/inventory/delete/{{inventoryId}}",
  }),
  request({
    name: "Stock In",
    method: "PATCH",
    url: "{{baseUrl}}/inventory/stock-in/{{inventoryId}}",
    body: {
      quantity: 25,
    },
  }),
  request({
    name: "Stock Out",
    method: "PATCH",
    url: "{{baseUrl}}/inventory/stock-out/{{inventoryId}}",
    body: {
      quantity: 5,
    },
  }),
  request({
    name: "Adjust Stock",
    method: "PATCH",
    url: "{{baseUrl}}/inventory/adjust-stock/{{inventoryId}}",
    body: {
      quantity: -2,
      reason: "Damaged items",
    },
  }),
  request({
    name: "Low Stock Items",
    method: "GET",
    url: "{{baseUrl}}/inventory/low-stock",
  }),
  request({
    name: "Expiring Items",
    method: "GET",
    url: "{{baseUrl}}/inventory/expiring-items?days={{expiringDays}}",
  }),
];

const collection = {
  info: {
    name: "RestroFlow API",
    _postman_id: "f2d3f1e4-7cc0-4b31-9cfd-6c9ec2b8a001",
    description: "Full Postman collection for the RestroFlow backend API.",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  auth: bearerAuth,
  variable: [
    { key: "appUrl", value: "http://localhost:5000" },
    { key: "baseUrl", value: "http://localhost:5000/api/v1" },
    { key: "accessToken", value: "" },
    { key: "restaurantId", value: "64b7c0f8d7f4c3a1e2f9a001" },
    { key: "staffId", value: "64b7c0f8d7f4c3a1e2f9a002" },
    { key: "categoryId", value: "64b7c0f8d7f4c3a1e2f9a003" },
    { key: "menuId", value: "64b7c0f8d7f4c3a1e2f9a004" },
    { key: "orderId", value: "64b7c0f8d7f4c3a1e2f9a005" },
    { key: "tableId", value: "64b7c0f8d7f4c3a1e2f9a006" },
    { key: "customerId", value: "64b7c0f8d7f4c3a1e2f9a007" },
    { key: "kotId", value: "64b7c0f8d7f4c3a1e2f9a008" },
    { key: "qrMenuId", value: "64b7c0f8d7f4c3a1e2f9a009" },
    { key: "reservationId", value: "64b7c0f8d7f4c3a1e2f9a00a" },
    { key: "paymentId", value: "64b7c0f8d7f4c3a1e2f9a00b" },
    { key: "inventoryId", value: "64b7c0f8d7f4c3a1e2f9a00c" },
    { key: "supplierId", value: "64b7c0f8d7f4c3a1e2f9a00d" },
    { key: "chefId", value: "64b7c0f8d7f4c3a1e2f9a00e" },
    { key: "qrCode", value: "TABLE-001" },
    { key: "searchKeyword", value: "pizza" },
    { key: "expiringDays", value: "7" },
    { key: "tableStatus", value: "AVAILABLE" },
  ],
  item: [
    request({
      name: "Health Check",
      method: "GET",
      url: "{{appUrl}}/",
      auth: noAuth,
    }),
    folder("Auth", authItems),
    folder("Restaurants", restaurantItems),
    folder("Staff", staffItems),
    folder("Categories", categoryItems),
    folder("Menu", menuItems),
    folder("Orders", orderItems),
    folder("Tables", tableItems),
    folder("Customers", customerItems),
    folder("KOT", kotItems),
    folder("QR Menu", qrMenuItems),
    folder("Reservations", reservationItems),
    folder("Payments", paymentItems),
    folder("Inventory", inventoryItems),
  ],
};

fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2), "utf8");

console.log(`Wrote Postman collection to ${outputPath}`);
