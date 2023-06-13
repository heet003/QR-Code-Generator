import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";
inquirer
    .prompt([
        {
            message: "Type in the URL",
            name: "URL",
        }
    ])
    .then((answers) => {
        console.log(answers.URL);
        var ourQR = qr.image(answers.URL);
        ourQR.pipe(fs.createWriteStream("ourQR.png"));
        fs.writeFile('URL.txt', answers.URL, err => {
            if (err) {
                console.error(err);
            }
        })
        fs.open();
    }).catch((error) => {
        if (error.isTtyError) {
        } else {
        }
    });