const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/connectDB");
const bodyParser = require("body-parser");
const stripeRouter = require("./routes/PaymentRoute");
const { errorHandler } = require("./middlewares/errorMiddlewares");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.json());

//connect mongoDB
connectDB();

//cors Config
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
//!Routes
app.use("/api/v1/stripe", stripeRouter);
app.use("/", (req, res) => res.json({ success: true }));
//Error handler middlewate
app.use(errorHandler);

app.listen(PORT, console.log(`The server is running ${PORT}`));
