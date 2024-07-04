const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');


// middleware per il CORS
app.use(cors());
// middleware per i json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('HOMEPAGE');
});
// Routes API per gli articoli
app.use('/api/articles', require('./routes/api/articles'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));