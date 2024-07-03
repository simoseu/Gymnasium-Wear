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
        <h2>Lista degli articoli</h2>
    </div>
    <Articles />
</template>