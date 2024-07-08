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
        ...mapActions(useArticleStore, ['addArticle']),
        changeImage(e) {
            // Se il file è più grande di 2MB viene mostrato un alert di errore
            if (e.target.files[0].size > 2 * 1024 * 1024) {
                alert('Immagine troppo grande, dimensione massima consentita 2MB');
                this.$refs.imageInput.value = null; // Reimposto il valore dell'input file a null

            } else {
                this.article.image = e.target.files[0];
            }
        },
        cancel() {
            this.$router.push('/');
        },
        /* Metodo per effettuare la chiamata al server e mostrare il messaggio di successo/errore
           se l'aggiunta avviene con successo viene reindirizzarto alla pagina dell'articolo appena aggiunto */
        async onSubmit(e) {

            e.preventDefault();

            // Se non sono stati inseriti il nome e il prezzo dell'articolo
            if (!this.article.name || !this.article.price) {
                alert('Per favore, inserisci il nome e il prezzo dell\'articolo');
                return;
            }
            // Creazione di un oggetto FormData per inviare i dati al server
            const formData = new FormData();
            formData.append('image', this.article.image);
            formData.append('name', this.article.name);
            formData.append('price', this.article.price);
            formData.append('description', this.article.description);
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
    }
}
</script>

<template>
    <AlertMessage v-if="show" :success="success" :message="message" />
    <div class="container mt-5">
        <h1 class="text-center fw-bold primary-color">Aggiungi un nuovo articolo</h1>
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
                <input type="file" name="image" accept="image/*" class="form-control" id="image" @change="changeImage"
                    ref="imageInput">
            </div>
            <div class=" text-center mt-5">
                <button type="submit" class="btn-custom btn-custom-primary">Aggiungi Articolo</button>
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