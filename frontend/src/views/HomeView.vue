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
        <h1 class="fw-bold mt-2 primary-color"> Lista degli articoli</h1>
        <div class="w-100">
            <hr class="w-50 mx-auto primary-color" />
        </div>
        <div class="w-100 text-end">
            <RouterLink to="/articles/add">
                <button class="btn-custom btn-custom-primary"> Aggiungi nuovo articolo</button>
            </RouterLink>
        </div>
        <Articles />
    </div>
</template>

<style scoped>
.container {
    min-height: 80%;
}
</style>