<script>

// import dello store, delle funzioni mapState e mapActions per utilizzare lo store e le actions dello store
import { mapActions } from 'pinia';
import { useArticleStore } from '@/store/articles';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'AddArticleView',
    components: {
        AlertMessage
    },
    data() {
        return {
            article: {
                id: null,
                name: "",
                price: "",
                description: "",
                image: ""
            },
            show: false,    // show del messaggio di successo/errore
            success: false, // true se l'operazione è andata a buon fine
            message: null,  // messaggio da mostrare
            articleId: null // id dell'articolo aggiunto
        }
    },
    methods: {
        ...mapActions(useArticleStore, ['fetchArticleById', 'editArticle']),
        /* Metodo per effettuare la chiamata al server e mostrare il messaggio di successo/errore
           se l'aggiunta avviene con successo viene reindirizzarto alla pagina dell'articolo appena aggiunto */
        cancel() {
            this.$router.push('/');
        },
        async onSubmit(e) {

            e.preventDefault();
            console.log("ECOMI")
            // Se non sono stati inseriti il nome e il prezzo dell'articolo
            if (!this.article.name || !this.article.price) {
                alert('Per favore, inserisci il nome e il prezzo dell\'articolo');
                return;
            }
            /* Chiamata al metodo che effettua la PUT al server per modificare l'articolo
                Se avviene con successo: viene mostrato un messaggio di successo e viene reindirizzato alla pagina dell'articolo
                Altrimenti viene mostrato un messaggio di errore e rimane nella pagina*/
            try {
                console.log(this.article)
                const data = await this.editArticle(this.article);

                console.log("ID ARTICOLO: ", data.id);
                this.success = true;
                this.message = data.msg;
                this.articleId = data.id;

            } catch (error) {
                console.log("ERRORE: ", error)
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
    },
    async mounted() {
        console.log("ID ARTICOLO: ", this.$route.params.id);
        try {
            this.article = await this.fetchArticleById(this.$route.params.id);
            console.log(this.article)
        } catch (error) {
            console.log("ERRORE: ", error)
        }

    }
}
</script>

<template>
    <AlertMessage v-if="show" :success="success" :message="message" />
    <div class="container mt-5">
        <h1 class="text-center fw-bold primary-color">Modifica Articolo</h1>
        <div class="w-100 primary-color">
            <hr class="w-50 mx-auto" />
        </div>
        <form class="mt-4" @submit="onSubmit">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">Nome Articolo</label>
                <input type="text" class="form-control " id="name" placeholder="Inserire il nome dell'articolo"
                    v-model="article.name">
            </div>
            <div class="mb-3">
                <label for="price" class="form-label fw-bold">Prezzo Articolo</label>
                <input type="number" step="any" class="form-control" id="price"
                    placeholder="Inserire il prezzo dell'articolo in €" v-model="article.price">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label fw-bold">Descrizione Articolo (opzionale)</label>
                <textarea class="form-control" id="description" rows="5" v-model="article.description"
                    placeholder="Inserisci una descrizione dell'articolo"></textarea>
            </div>

            <div class="mb-3">
                <label for="image" class="form-label fw-bold">Immagine Articolo (opzionale)</label>
                <input type="file" class="form-control" id="image">
            </div>
            <div class=" text-center mt-5">
                <button class="btn-custom btn-custom-delete mx-2" @click="cancel">
                    Annulla
                </button>
                <button type="submit" class="btn-custom btn-custom-primary mx-2">Modifica Articolo</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: 75%;
}

@media screen and (min-width: 1224px) {
    .container {
        max-width: 50%;
    }
}
</style>