const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const fs = require('fs');
const path = require('path');

const cors = require('cors');

// path del db
const dbPath = path.join(__dirname, 'db', 'db.json');

// middleware per il CORS
app.use(cors());
// middleware per i json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('HOMEPAGE');
});

app.get('/articoli', (req, res) => {
    console.log(dbPath)
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return console.log("errore");
        }
        res.json(JSON.parse(data));
    })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));