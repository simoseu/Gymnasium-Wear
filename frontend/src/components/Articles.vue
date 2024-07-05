<script>
import ArticlePreview from '@/components/ArticlePreview.vue';

// import dello store, delle funzioni mapState e mapActions per utilizzare lo store e le actions dello store
import { mapState, mapActions } from 'pinia';
import { useArticleStore } from '@/store/articles';

export default {
    name: 'Articles',
    components: {
        ArticlePreview
    },
    computed: {
        ...mapState(useArticleStore, ['articles']),
    },
    methods: {
        ...mapActions(useArticleStore, ['fetchArticles']),
    },
    created() {
        this.fetchArticles();
    }
}
</script>

<template>
    <div class="container mt-3">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome Articolo</th>
                    <th class="d-none d-md-table-cell" scope="col">Prezzo</th>
                    <th class="d-none d-lg-table-cell" scope="col">Descrizione</th>
                    <th class="text-center" scope="col">Azione</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <ArticlePreview v-if="articles.length > 0" :key="article.id" v-for="article in articles"
                    :article="article" />
                <td v-else colspan="5" class="text-center">
                    <h2 class="mt-5">Nessun Articolo Presente nel Database </h2>
                </td>
            </tbody>
        </table>
    </div>
</template>