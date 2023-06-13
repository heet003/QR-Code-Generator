const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const qr = require('qr-image');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "\\index.html");
});

app.post("/", function (req, res) {
    console.log(req.body.URL);
    var ourQR = qr.image(req.body.URL);
    ourQR.pipe(fs.createWriteStream("ourQR.png"));
    res.download(__dirname + "\\ourQR.png");
    fs.writeFile('URL.txt', req.body.URL, err => {
        if (err) {
            console.error(err);
        }
    })
});


app.listen(2000, function () {
    console.log("2000");
});