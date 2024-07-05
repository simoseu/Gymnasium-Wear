<script>
import search from "@/assets/img/search.svg";
import pencil from "@/assets/img/pencil.svg";
import trash from "@/assets/img/trash3.svg";

export default {
    name: "ArticlePreview",
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            search: search,
            pencil: pencil,
            trash: trash
        }
    },
    methods: {
        viewArticle() {
            this.$router.push(`/articles/${this.article.id}`);
        }
    }
};
</script>

<template>
    <tr>
        <td>{{ article.id }}</td>
        <td>{{ article.name }}</td>
        <td class="d-none d-md-table-cell">€ {{ article.price }}</td>
        <td class="d-none d-lg-table-cell">{{ article.description.slice(0, 50) }}...</td>
        <td class="text-center">
            <button @click="viewArticle()" class="custom-btn detail">
                <img :src="search" alt="Vedi Dettagli Articolo" title="Vedi Dettagli Articolo" />
            </button>
            <button @click="onClick()" class="custom-btn edit">
                <img :src="pencil" alt="Modifica Articolo" title="Modifica Articolo" />
            </button>
            <button @click="onClick()" class="custom-btn delete">
                <img :src="trash" alt="Elimina Articolo" title="Elimina Articolo" />
            </button>
        </td>
    </tr>
</template>

<style>
.custom-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
}
</style>