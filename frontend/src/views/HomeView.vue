<script>
import Articles from "@/components/Articles.vue";

export default {
    name: 'HomeView',
    components: {
        Articles
    }
}
</script>

<template>
    <div class="container mt-5 text-center">
        <h1 class="fw-bold mt-2"> Lista degli articoli</h1>
        <hr />
        <div class="w-100 text-end">
            <button class="btn btn-outline-primary "> Aggiungi nuovo articolo</button>
        </div>
        <Articles />
    </div>
</template>

<style scoped>
.container {
    background-color: #fff;
    border-radius: 20px;
    padding: 1rem;
    min-height: 80%;
}
</style>