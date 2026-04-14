const express = require('express');
const cors = require("cors");
const connectDb = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./routes/test");
const lostFoundRoutes = require("./routes/lostFoundRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoute = require("./routes/notificationRoute")

require("dotenv").config();

const app = express();
connectDb();
app.use(cors());
app.use(express.json());

app.get("/" ,(req , res)=>{
    res.send('API Chal gye....')
});

app.use("/api/auth" , authRoutes);

app.use("/api/test" , verifyToken);

app.use("/api/lostfound", lostFoundRoutes);

app.use("/api/complaint", complaintRoutes);

app.use("/api/volunteer", volunteerRoutes);

app.use("/api", adminRoutes);

app.use("/api/notification", notificationRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server Chal gya ${PORT}`);
});


