<script>

// import dello store, delle funzioni mapState e mapActions per utilizzare lo store e le actions dello store
import { mapActions } from 'pinia';
import { useArticleStore } from '@/store/articles';
import ArticleForm from '@/components/ArticleForm.vue';

export default {
    name: 'AddArticleView',
    components: {
        ArticleForm
    },
    data() {
        return {
            articleId: null, // id dell'articolo modificato
            editing: false,
            show: false,    // show del messaggio di successo/errore
            success: false, // true se l'operazione è andata a buon fine
            message: null,  // messaggio da mostrare
        }
    },
    methods: {
        ...mapActions(useArticleStore, ['addArticle']),

        /* Metodo per effettuare la chiamata al server e mostrare il messaggio di successo/errore
           se l'aggiunta avviene con successo viene reindirizzarto alla pagina dell'articolo appena aggiunto */
        async onSubmit(article) {
            // Creazione di un oggetto FormData per inviare i dati al server
            const formData = new FormData();
            formData.append('image', article.image);
            formData.append('name', article.name);
            formData.append('price', article.price);
            formData.append('description', article.description);
            /* Chiamata al metodo che effettua la POST al server 
                Se avviene con successo: viene mostrato un messaggio di successo e viene reindirizzato alla pagina dell'articolo
                Altrimenti viene mostrato un messaggio di errore e rimane nella pagina*/
            try {
                await this.addArticle(formData).then(data => {
                    this.success = true;
                    this.message = data.msg;
                    this.articleId = data.id;
                });

            } catch (error) {
                this.message = error;
            } finally {
                // Viene mostrato il messaggio di successo/errrore per 3 secondi e in caso di successo viene riindirizzato alla pagina dell'articolo
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                    this.success = false;
                    if (this.articleId) this.$router.push(`/articles/${this.articleId}`);
                }, 3000);
            }
        }
    }
}
</script>

<template>
    <ArticleForm :editing="editing" :show="show" :success="success" :message="message" @add-article="onSubmit" />
</template>