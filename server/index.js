const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const path = require('path');

const app = express();

const pdfTemplate = require('./template');
const { GenerateReceiptDate } = require('./helpers');

const PORT = process.env.PORT || 5003;

let last;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// создание файла пдф
app.post('/create-pdf', (req, res) => {
    const dateString = new GenerateReceiptDate().createReceiptDate();
    last = dateString;
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/results/doc-${dateString}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

// получить пдф
app.get('/get-pdf', (req, res) => {
    // TODO сделать чтобы файл отправлялся с именем
    const fileName = req.params.name;
    res.sendFile(path.join(__dirname, `results/doc-${last}.pdf`), fileName, (err) => {
        if (err) {
            next(err);
        } else {
            console.log('sent:', fileName);
        }
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));