const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

// path del db
const dbPath = path.join(__dirname, '..', '..', 'db', 'db.json');

// Restituisce tutti gli articoli
router.get('/', (req, res) => {

    //console.log(dbPath)
    fs.readFile(dbPath, 'utf8', (err, articles) => {
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }
        res.json(JSON.parse(articles));
    })
});

// Restituisce un articolo con un id specifico
router.get('/:id', (req, res) => {
    // conversione in int dell'id
    const articleId = parseInt(req.params.id);

    fs.readFile(dbPath, 'utf8', (err, articles) => {
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }
        // console.log(articles)
        articles = JSON.parse(articles);
        // Assegno alla costante article l'articolo, se esiste l'articolo con l'id richiesto
        const article = articles.find(article => article.id === articleId);
        // Se esiste lo restituisco, altrimenti restituisco un messaggio di errore
        if (article) {
            res.json(article);
        } else {
            res.status(400).json({ msg: `Nessun articolo trovato con id ${articleId}` });
        }
    });
});

// Aggiunta di un articolo
router.post('/', (req, res) => {
    // Se l'utente non ha inserito il nome o il prezzo dell'articolo viene restituito un messaggio di errore
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ msg: 'Inserire il nome e il prezzo dell\'articolo' });
    }

    fs.readFile(dbPath, 'utf8', (err, articles) => {
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }
        articles = JSON.parse(articles);
        // Ultimo id presente nell'array O 1 se l'array è vuoto
        const lastId = articles.length > 0 ? articles[articles.length - 1].id : 0;

        // Creazione del nuovo articolo
        const newArticle = {
            id: lastId + 1, // id sucessivo all'ultimo id presente nell'array
            name: req.body.name,
            price: req.body.price,
            description: req.body.description || '', // Se l'utente non inserisce una descrizione viene inserita una stringa vuota
            image: req.body.image || ''       // Se l'utente non inserisce un'immagine viene inserita una stringa vuota
        };

        // Aggiungo il nuovo articolo all'array
        articles.push(newArticle);

        fs.writeFile(dbPath, JSON.stringify(articles, null, 4), err => {
            if (err) {
                res.status(500).json({ msg: "Errore nell'aggiunta dell'articolo..." });
            }
            res.json({ msg: "Articolo aggiunto con successo!", id: newArticle.id });
        });
    });
});

// Modifica di un articolo
router.put('/:id', (req, res) => {
    // Conversione in int dell'id
    const articleId = parseInt(req.params.id);

    fs.readFile(dbPath, 'utf8', (err, articles) => {
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }
        // console.log(articles)
        articles = JSON.parse(articles);

        // Controllo se esiste l'articolo con l'id richiesto
        const index = articles.findIndex(article => article.id === articleId);

        // Se esiste lo modifico, altrimenti restituisco un messaggio di errore
        if (index !== -1) {

            articles[index] = {
                ...articles[index],
                name: req.body.name ? req.body.name : articles[index].name,
                price: req.body.price ? req.body.price : articles[index].price,
                description: req.body.description ? req.body.description : articles[index].description,
                image: req.body.image ? req.body.image : articles[index].image
            };

            fs.writeFile(dbPath, JSON.stringify(articles), err => {
                if (err) {
                    res.status(500).json({ msg: "Errore nella modifica dell'articolo dal db" });
                }
                res.json(articles);
            });
            res.json({ msg: 'Articolo modificato con successo!', id: articles[index].id });
        } else {
            res.status(400).json({ msg: `Nessun articolo trovato con id ${articleId}` });
        }
    });
});

// Eliminazione di un articolo
router.delete('/:id', (req, res) => {
    // Conversione in int dell'id
    const articleId = parseInt(req.params.id);

    fs.readFile(dbPath, 'utf8', (err, articles) => {
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }
        // console.log(articles)
        articles = JSON.parse(articles);

        // Controllo se esiste l'articolo con l'id richiesto
        const index = articles.findIndex(article => article.id === articleId);

        // Se esiste lo elimino, altrimenti restituisco un messaggio di errore
        if (index !== -1) {
            // Rimuovo l'articolo dall'array utilizzando il metodo splice
            articles.splice(index, 1);
            fs.writeFile(dbPath, JSON.stringify(articles), err => {
                if (err) {
                    res.status(500).json({ msg: "Errore nella cancellazione dell'articolo dal db" });
                }
                res.json({ msg: "Articolo eliminato con successo!", articles });
            });
        } else {
            res.status(400).json({ msg: `Nessun articolo trovato con id ${articleId}` });
        }
    });
});
module.exports = router;