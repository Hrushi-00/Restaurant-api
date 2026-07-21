<div align="center">

# 🍽️ RestroFlow Backend

### Enterprise Restaurant Management System API

A scalable, secure, and production-ready Restaurant Management Backend built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

# 📖 Overview

RestroFlow is a complete Restaurant Management Backend designed for restaurants, cafes, cloud kitchens, and food businesses.

It provides secure authentication, role-based access, multi-tenant architecture, menu management, staff management, categories, orders, customers, analytics, and much more.

Designed using scalable architecture and clean coding principles.

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token
- Logout
- Password Encryption
- Role Based Authorization

---

## Restaurant

- Create Restaurant
- Update Restaurant
- Restaurant Settings
- Restaurant Profile

---

## Category

- Create Category
- Update Category
- Delete Category
- Category Status
- Category Listing

---

## Menu

- Create Menu
- Update Menu
- Delete Menu
- Menu Images
- Food Types
- Price & Discount
- Availability

---

## Staff

- Add Staff
- Update Staff
- Delete Staff
- Role Assignment
- Active/Inactive Status

---

## Customer

- Customer Management
- Customer Profile
- Order History

---

## Orders

- Place Orders
- Order Status
- Order History
- Cancel Orders

---

## Dashboard

- Total Sales
- Revenue
- Orders
- Staff Count
- Customers
- Analytics

---

## Security

- JWT Authentication
- Password Hashing
- Role Based Access
- Protected Routes
- Input Validation

---

# 🏗️ Project Structure

```bash
src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── dto/
├── utils/
├── validations/
├── uploads/
├── app.js
└── server.js
```

---

# 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Encryption |
| dotenv | Environment Variables |
| Multer | File Upload |
| Nodemon | Development |
| Express Validator | Validation |

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/restroflow-backend.git
```

## Navigate

```bash
cd restroflow-backend
```

## Install Packages

```bash
npm install
```

## Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_EXPIRY=7d
```

## Start Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |
| POST | /api/auth/refresh |

---

## Category

| Method | Endpoint |
|---------|----------|
| GET | /api/categories |
| POST | /api/categories |
| PUT | /api/categories/:id |
| DELETE | /api/categories/:id |

---

## Menu

| Method | Endpoint |
|---------|----------|
| GET | /api/menu |
| POST | /api/menu |
| PUT | /api/menu/:id |
| DELETE | /api/menu/:id |

---

## Restaurant

| Method | Endpoint |
|---------|----------|
| GET | /api/restaurants |
| POST | /api/restaurants |
| PUT | /api/restaurants/:id |

---

## Staff

| Method | Endpoint |
|---------|----------|
| GET | /api/staff |
| POST | /api/staff |
| PUT | /api/staff/:id |
| DELETE | /api/staff/:id |

---

# 🔐 Authentication

Use JWT Bearer Token.

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 📷 Screenshots

Add screenshots here.

```
docs/images/dashboard.png
docs/images/login.png
docs/images/menu.png
```

---

# 📈 Future Enhancements

- Payment Gateway
- QR Ordering
- Kitchen Display System
- Inventory Management
- POS Integration
- Table Booking
- Coupons
- Loyalty Program
- Notifications
- Reports

---

# 🧪 Testing

```bash
npm test
```

---

# 📦 Deployment

- Docker
- AWS EC2
- Nginx
- PM2
- MongoDB Atlas
- GitHub Actions CI/CD

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub.

---

# 👨‍💻 Author

**Hrushikesh Kapse**

MERN Stack Developer

- GitHub: [https://github.com/Hrushi-00](https://github.com/Hrushi-00)
- LinkedIn: [https://www.linkedin.com/in/hrushikesh-kapse](https://www.linkedin.com/in/hrushikesh-kapse)
- Portfolio: [https://www.hrushikeshkapse.site/](https://www.hrushikeshkapse.site/)

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by Hrushikesh Kapse

</div>
