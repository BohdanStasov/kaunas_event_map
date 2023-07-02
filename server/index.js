const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const pinRoute = require("./routes/pins");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose 
.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,  
})   
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

app.use(cookieParser())
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

app.listen(8800, () => {
  console.log("Backend server is running");
});