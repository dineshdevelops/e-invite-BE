const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const app =express();
const connectDB = require('./config/mongodb.config')

// *Import Routes
const authRoutes = require("./routes/authentication.routes")

connectDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

// *Connect to Routes
app.use("/api/authentication",authRoutes);

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
