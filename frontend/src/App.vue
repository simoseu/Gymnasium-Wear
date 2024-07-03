<script>
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router";

export default {
	name: 'App',
	components: {
		Header,
		RouterView
	},
}

</script>
<template>

	<Header />
	<RouterView />

</template>
