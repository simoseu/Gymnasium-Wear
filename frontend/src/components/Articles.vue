<script>
import ArticlePreview from '@/components/ArticlePreview.vue';
import DeletePopup from '@/components/DeletePopup.vue';
import AlertMessage from '@/components/AlertMessage.vue';

// import dello store, delle funzioni mapState e mapActions per utilizzare lo store e le actions dello store
import { mapState, mapActions } from 'pinia';
import { useArticleStore } from '@/store/articles';

export default {
    name: 'Articles',
    components: {
        ArticlePreview,
        DeletePopup,
        AlertMessage
    },
    data() {
        return {
            showPopup: false,
            articleToDelete: null,
            showAlert: false,
            success: false,
            message: null,
        }
    },
    computed: {
        ...mapState(useArticleStore, ['articles']),
    },
    methods: {
        ...mapActions(useArticleStore, ['fetchArticles', 'deleteArticle']),

        viewArticle(articleId) {
            this.$router.push(`/articles/${articleId}`);
        },
        // Metodo per mostrare il popup di conferma elimnazione di un articolo
        showDeletePopup(articleId) {
            this.showPopup = true;
            // Viene salvato l'id dell'articolo da eliminare
            this.articleToDelete = articleId;
        },
        // Metodo per chiudere il popup di conferma eliminazione di un articolo
        closeDeletePopup() {
            this.showPopup = false;
            // Viene posto a null l'id dell'articolo da eliminare
            this.articleToDelete = null;
        },
        // Chiamata al metodo che effettua al DELETE sul server
        async confirmDelete() {
            // In caso di successo viene mmostrato un  messaggio di successo, altrimenti un messaggio di errore per 3 secondi
            try {
                this.message = await this.deleteArticle(this.articleToDelete);
                this.success = true;
            } catch (error) {
                console.error(error);
                this.message = error;
            }
            finally {
                this.closeDeletePopup();    // Viene chiuso il popup
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                    this.success = false;
                }, 3000);

            }
        }
    },
    async created() {
        try {
            await this.fetchArticles();
        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<template>
    <AlertMessage v-if="showAlert" :success="success" :message="message" />
    <DeletePopup v-if="showPopup" :articleId="articleToDelete" @close-popup="closeDeletePopup"
        @delete-article="confirmDelete" />
    <div class="container mt-3">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th class="text-start" scope="col">Nome Articolo</th>
                    <th class="text-start d-none d-md-table-cell" scope="col">Prezzo</th>
                    <th class="text-start d-none d-lg-table-cell" scope="col">Descrizione</th>
                    <th class="text-center" scope="col">Azione</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <ArticlePreview v-if="articles.length > 0" :key="article.id" v-for="article in articles"
                    :article="article" @view-article="viewArticle" @delete="showDeletePopup" />
                <td v-else colspan="5" class="text-center">
                    <h2 class="mt-5">Nessun Articolo Presente nel Database </h2>
                </td>
            </tbody>
        </table>
    </div>
</template>