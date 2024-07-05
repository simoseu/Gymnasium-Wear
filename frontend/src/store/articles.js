import { defineStore } from 'pinia';

export const useArticleStore = defineStore({
    id: 'articles',
    state: () => ({
        articles: []
    }),
    actions: {
        async fetchArticles() {
            try {
                const res = await fetch('http://localhost:5000/api/articles', {
                    method: 'GET'
                });
                //console.log(res)
                this.articles = await res.json();
                console.log(this.articles);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchArticleById(articleId) {
            // Richiesta GET all'API per ottenere l'articolo con l'id specificato
            try {
                const article = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
                    method: 'GET'
                }).then(res => res.json());
                console.log(article)
                return article;
            }
            catch (error) {
                console.log(`Errore - ${error}`);
            }
        }

    }
})