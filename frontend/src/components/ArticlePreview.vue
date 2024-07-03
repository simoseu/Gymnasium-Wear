<script>
export default {
    name: "ArticlePreview",
    props: {
        article: {
            type: Object,
            required: true
        }
    }
};
</script>

<template>
    <tr>
        <td>{{ article.id }}</td>
        <td>{{ article.name }}</td>
        <td>{{ article.price }}</td>
        <td>{{ article.description.slice(0, 50) }}...</td>
        <td>
            <button class="btn btn-secondary">Dettagli</button>
            <button class="btn btn-primary">Modifica</button>
            <button class="btn btn-danger">Elimina</button>
        </td>
    </tr>
</template>