import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Connect Database
await connectDB();

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`
========================================
 RestroFlow Server Started
 URL   : http://localhost:${PORT}
 ENV   : ${process.env.NODE_ENV}
========================================
`);
});
