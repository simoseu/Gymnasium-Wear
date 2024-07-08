import { defineStore } from 'pinia';

export const useArticleStore = defineStore({
    id: 'articles',
    state: () => ({
        articles: [],
        imagesBaseUrl: 'http://localhost:5000/uploads/'
    }),
    actions: {
        // Get di tutti gli articoli
        async fetchArticles() {
            try {
                const res = await fetch('http://localhost:5000/api/articles', {
                    method: 'GET'
                });
                // Se lo status della risposta è 500 lancuo un errore altrimento restituisco la lista di articoli
                if (res.status === 500) {
                    const error = await res.json();
                    throw (error.msg);
                } else {
                    const articles = await res.json();
                    this.articles = articles;
                }
            } catch (error) {
                //console.log(error);
                throw (`Errore - ${error}`);
            }
        },
        // Get dell'articolo con id = "articleId"
        async fetchArticleById(articleId) {
            // Richiesta GET all'API per ottenere l'articolo con l'id specificato
            try {
                const res = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
                    method: 'GET'
                });
                // Se lo status della risposta è 400 o 500 lancio un errore altrimenti restituisco l'articolo
                if (res.status === 400 || res.status === 500) {
                    const error = await res.json();
                    //console.log(error.msg)
                    throw (error.msg)
                } else {
                    const article = await res.json();
                    //console.log(article)
                    return article;
                }
            }
            catch (error) {
                throw (`Errore - ${error}`);
            }
        },
        // POST per l'aggiunta di un nuovo articolo
        async addArticle(article) {
            try {
                // Richiesta POST all'API per aggiungere un nuovo articolo
                const res = await fetch('http://localhost:5000/api/articles', {
                    method: 'POST',
                    body: article
                });

                const data = await res.json();
                // Se lo status della risposta è 400 o 500 lancio un errore altrimenti restituisco il messaggio di successo e l'id dell'articolo aggiunto
                if (res.status === 400 || res.status === 500) {
                    console.log("ERRORE")
                    throw (data.msg);
                } else {
                    return data;
                }
            }
            catch (error) {
                console.log(error);
                throw (`Errore di comunicazione con il server...`);
            }
        },
        // DELETE per l'elimnazione di un articolo con id passato
        async deleteArticle(articleId) {
            try {
                // Richiesta DELETE all'API per eliminare l'articolo con l'id specificato
                const res = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
                    method: 'DELETE'
                });

                const data = await res.json();
                // Se lo status della risposta è 400 o 500 lancio un errore altrimenti restituisco il messaggio di successo
                if (res.status === 400 || res.status === 500) {
                    throw (data.msg);
                } else {
                    this.articles = data.articles;
                    return data.msg;
                }
            }
            catch (error) {
                throw (`Errore di comunicazione con il server...`);
            }
        },
        // PUT per la modifica di un articolo
        async editArticle(articleId, article) {
            try {
                console.log("EDIT: ", ...article)
                // Richiesta PUT all'API per modificare l'articolo con l'id specificato
                const res = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
                    method: 'PUT',
                    body: article
                });

                const data = await res.json();
                console.log(data);
                // Se lo status della risposta è 400 o 500 lancio un errore altrimenti restituisco il messaggio di successo
                if (res.status === 400 || res.status === 500) {
                    throw (data.msg);
                } else {
                    return data;
                }
            }
            catch (error) {
                throw (`Errore di comunicazione con il server...`);
            }
        }
    },
    getters: {
        getImagesBaseUrl() {
            return this.imagesBaseUrl;
        }
    }

});