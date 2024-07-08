const express = require('express');
const router = express.Router();

const fs = require('fs');
const multer = require('multer');
const path = require('path');

// path della route
const rootPath = path.join(__dirname, '..', '..');
// path immagini
const imagesPath = path.join(rootPath, 'uploads');
// path del db
const dbPath = path.join(rootPath, 'db', 'db.json');
// nome immagine default
const defaultImage = 'no-img.avif';

// Configurazione di Multer per salvare le immagini nella cartella /uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Nome del file salvato come "timestamp-nomefileoriginale"
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Restituisce tutti gli articoli senza le immagini
router.get('/', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, articles) => {
        // Salvo tutti gli articoli senza le immagini
        articlesWithoutImages = JSON.parse(articles).map(({ image, ...articleInfo }) => articleInfo)
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }
        res.json(articlesWithoutImages);
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

// POST per l'aggiunta di un articolo  
router.post('/', upload.single('image'), (req, res) => {
    try {
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
                image: req.file ? req.file.filename : 'no-img.avif'       // Se l'utente non inserisce un'immagine viene settata l'immagine di default
            };

            // Aggiungo il nuovo articolo all'array
            articles.push(newArticle);
            // Salvo nel db
            fs.writeFile(dbPath, JSON.stringify(articles, null, 4), err => {
                if (err) {
                    res.status(500).json({ msg: "Errore nell'aggiunta dell'articolo..." });
                }
                res.json({ msg: "Articolo aggiunto con successo!", id: newArticle.id });
            });
        });
    } catch (err) {
        res.status(500).json({ msg: "Errore nell'upload dell'immagine" });
    }
});

// Modifica di un articolo
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
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
                // Se l'utente ha inserito un'immagine la salvo e rimuovo la vecchia immagine se diversa da quella di default
                if (req.file) {
                    deleteImage(articles[index].image);
                }
                // Aggiorno i campi dell'articolo
                articles[index] = {
                    ...articles[index],
                    name: req.body.name ? req.body.name : articles[index].name,
                    price: req.body.price ? req.body.price : articles[index].price,
                    description: req.body.description ? req.body.description : articles[index].description,
                    image: req.file ? req.file.filename : articles[index].image
                };
                // Salvo le modifiche nel db
                fs.writeFile(dbPath, JSON.stringify(articles, null, 4), err => {
                    if (err) {
                        res.status(500).json({ msg: "Errore nella modifica dell'articolo dal db" });
                    }
                    res.json({ msg: 'Articolo modificato con successo!', id: articles[index].id });
                });
            } else {
                res.status(400).json({ msg: `Nessun articolo trovato con id ${articleId}` });
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Errore nell'upload dell'immagine" });
    }
});

// Eliminazione di un articolo
router.delete('/:id', (req, res) => {
    // Conversione in int dell'id
    const articleId = parseInt(req.params.id);

    fs.readFile(dbPath, 'utf8', (err, articles) => {
        if (err) {
            res.status(500).json({ msg: "Errore nella lettura del db" });
        }

        articles = JSON.parse(articles);

        // Controllo se esiste l'articolo con l'id richiesto e salvi l'indice
        const index = articles.findIndex(article => article.id === articleId);

        // Se esiste lo elimino, altrimenti restituisco un messaggio di errore
        if (index !== -1) {
            // Elimino l'immagine se diversa da quella di default
            deleteImage(articles[index].image);
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

// Funzione per eliminare l'immagine di un articolo se diversa da quella di default
const deleteImage = (filename) => {
    if (filename !== defaultImage) {
        fs.unlink(path.join(imagesPath, filename), (err) => {
            if (err) console.log(err);
            console.log('Immagine eliminata con successo!');
        });
    }
}

module.exports = router;