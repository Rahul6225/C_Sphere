const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();
const cookieParser = require("cookie-parser");

const {router:authRoutes,verifyToken} = require("./routes/auth");




// Connecting Express with MongoDB ->
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Allowing cross-origin requests for your React client ->
// Enable CORS with specific origin and credentials
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  credentials: true, // Allow cookies and other credentials
}));
app.use(cookieParser());

const userRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");
const quizRoutes = require("./routes/quizRoutes");
const razorpayRoutes = require("./routes/razorpayRoutes");

app.use(express.json()); // to parse the input data body coming from client
app.use(express.urlencoded( {extended : true} ));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use("/api/payment", razorpayRoutes); // Razorpay payment routes



app.listen(port, () => {
  console.log(`Server starting at http://localhost:${port}`);
});