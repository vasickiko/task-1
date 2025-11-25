const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

const facultyRoutes = require("./routes/facultyRoutes");

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/faculties", facultyRoutes);

app.get("/", (req, res) => res.redirect("/faculties"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
