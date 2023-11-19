require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoString = process.env.NETFLIX_MONGODB_URL;

let PROD_ENV = process.env.PORT ? "production" : "development";
const PORT = process.env.PORT || 3001;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);
app.use("/api", movieRoutes);
app.use("/api/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
