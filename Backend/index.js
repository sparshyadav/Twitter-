const express = require("express");
const connectDatabase = require("./config/Database");
const userRoutes=require("./routes/User");
const cookieParser=require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4445;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes)

app.listen(PORT, () => {
    connectDatabase();
    console.log(`Server started at PORT: ${PORT}`);
})