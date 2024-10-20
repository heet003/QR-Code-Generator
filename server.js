require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qr = require("qr-image");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generateQR", function (req, res) {
  const url = req.body.URL;

  const qrSVG = qr.imageSync(url, { type: "png" });
  const qrBase64 = Buffer.from(qrSVG).toString("base64");

  res.json({ qrCode: `data:image/png;base64,${qrBase64}` });
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
