<script>
// import dello store, della funzione mapActions per utilizzare lo store e le actions dello store
import { mapActions } from 'pinia';
import { useArticleStore } from '@/store/articles';

export default {
    name: "ArticleView",
    data() {
        return {
            article: null,
            errorMessage: null
        };
    },
    methods: {
        ...mapActions(useArticleStore, ['fetchArticleById']),
    },
    async created() {
        // Ottenimento dell'id dell'articolo dall'url
        try {
            this.article = await this.fetchArticleById(this.$route.params.id);
        } catch (error) {
            console.error(error);
            this.errorMessage = error;
        }
    }
}
</script>

<template>
    <div v-if="article && !errorMessage" class="container mt-5">
        <h1 class="text-center">{{ article.name }}</h1>
        <p><span class="fw-bold">Id articolo:</span> {{ article.id }}</p>
        <p><span class="fw-bold">Prezzo articolo:</span> €{{ article.price }}</p>
        <p><span class="fw-bold">Descrizione articolo:</span> {{ article.description }}</p>
    </div>

    <div v-else>
        <p>{{ errorMessage }}</p>
    </div>
</template>