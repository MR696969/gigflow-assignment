const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/gigs", require("./routes/gigs"));
app.use("/api/bids", require("./routes/bids"));

app.get("/", (req, res) => {
  res.send("GigFlow Backend Running");
});

module.exports = app;
