const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const app =express();
const connectDB = require('./config/mongodb.config')

// *Import Routes
const authRoutes = require("./routes/authentication.routes")
const cloudinaryRoutes = require("./routes/cloudinary.routes")
const weddingRoutes = require("./routes/wedding.routes")
const houseWarmingRoutes = require("./routes/houseWarming.routes");
const homePageRoutes = require("./routes/homePage.routes")

connectDB();
app.use(express.json());
app.use(cors());

// *Connect to Routes
app.use("/api/authentication",authRoutes);
app.use("/api/cloudinary",cloudinaryRoutes);
app.use("/api/wedding",weddingRoutes)
app.use("/api/houseWarming",houseWarmingRoutes);
app.use("/api/homepage",homePageRoutes)

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
