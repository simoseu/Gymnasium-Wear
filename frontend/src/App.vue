<template>

	<Header />
	<div class="container mt-5 text-center">
		<h2>Lista degli articoli</h2>
	</div>
	<Articles />

</template>

<script>
import Header from "@/components/Header.vue";
import Articles from "@/components/Articles.vue";

export default {
	name: 'App',
	components: {
		Header,
		Articles,
	},
}

</script>