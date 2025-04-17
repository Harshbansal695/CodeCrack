const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");

const userRoute = require("./Routers/User_routes.js");
const quizRoute = require("./Routers/Quiz_routes.js");
const dsaRoute = require("./Routers/Dsa_routes.js");

const connectDB = require("./Database/db.js");
connectDB();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "https://codeecrack.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Logging middleware
app.use((req, res, next) => {
  next();
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/v1/dsa", dsaRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
