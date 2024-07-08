<script>
// import dello store, della funzione mapActions per utilizzare lo store e le actions dello store
import { mapState, mapActions } from 'pinia';
import { useArticleStore } from '@/store/articles';

export default {
    name: "ArticleView",
    data() {
        return {
            article: null,
            errorMessage: null,
            imageUrl: null
        };
    },
    methods: {
        ...mapActions(useArticleStore, ['fetchArticleById']),
    },
    async created() {
        // Ottenimento dell'id dell'articolo dall'url e chiamata alla funzione fetchArticleById per ottenere l'articolo
        try {
            this.article = await this.fetchArticleById(this.$route.params.id);
            this.imageUrl = `${this.getImagesBaseUrl}${this.article.image}`;
        } catch (error) {
            console.error(error);
            this.errorMessage = error;
        }
    },
    computed: {
        ...mapState(useArticleStore, ['getImagesBaseUrl']),
    },
}
</script>

<template>
    <div class="container mt-5">
        <div v-if="article && !errorMessage" class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="title-container mb-4">
                        <h1 class="text-center text-md-start primary-color fw-bold my-2 text-break">{{ article.name }}
                        </h1>
                        <p><span class="fw-bold">ID ARTICOLO:</span> {{ article.id }}</p>
                    </div>
                    <p><span class="fw-bold my-4">Prezzo articolo: € </span> {{ article.price }}</p>
                    <p class="text-break"><span class="fw-bold my-4">Descrizione articolo:</span> {{ article.description
                        ? article.description : "Nessuna descrizione disponibile"
                        }}</p>
                </div>
                <div class="col-md-6">
                    <img class="m-0 article-img" :src="imageUrl" />
                </div>
            </div>
        </div>

        <div v-else>
            <h1 class="delete-color text-center my-5">{{ errorMessage }}</h1>
            <div class="text-center">
                <RouterLink to="/" class="primary-color fw-bold fs-3"> Torna alla Homepage </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
    .title-container {
        flex-direction: column;
    }
}

.article-img {
    width: 100%;
    border-radius: 20px;
    object-fit: contain;
}
</style>