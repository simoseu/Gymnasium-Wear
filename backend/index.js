const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');


// middleware per il CORS
app.use(cors());
// middleware per i json
app.use(express.json());

// for parsing application/json
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send('HOMEPAGE');
});
// Routes API per gli articoli
app.use('/api/articles', require('./routes/api/articles'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));