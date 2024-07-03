<script>
import ArticlePreview from '@/components/ArticlePreview.vue';

export default {
    name: 'Articles',
    components: {
        ArticlePreview
    },
    data() {
        return {
            articles: [],
        }
    },
    methods: {
        async fetchArticles() {
            try {
                const res = await fetch('http://localhost:5000/articoli', {
                    method: 'GET'
                });
                console.log(res)
                const data = await res.json();
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    },
    async created() {
        this.articles = await this.fetchArticles();
    }

}
</script>

<template>
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome Articolo</th>
                    <th scope="col">Prezzo</th>
                    <th scope="col">Descrizione</th>
                    <th scope="col">Azione</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <ArticlePreview :key="article.id" v-for="article in articles" :article="article" />
            </tbody>
        </table>
    </div>
</template>