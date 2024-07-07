<script>
export default {
    name: "DeletePopup",
    props: {
        articleId: {
            required: true
        }
    },
    methods: {
        closePopup() {
            this.$emit('close-popup');
        },
        deleteArticle() {
            this.$emit('delete-article');
        }
    }
}
</script>

<template>
    <div class="popup-container">
        <div class="popup">
            <h2 class="mb-2 delete-color">Conferma Eliminazione Articolo</h2>
            <div class="w-100">
                <hr class="w-50 mx-auto delete-color" />
            </div>
            <p class="fw-bold mt-4 mb-0">Vuoi eliminare definitivamente l'articolo con id: <span
                    class="primary-color">#{{ articleId }}</span> ?</p>
            <p class="mb-4">L'operazione non è reversibile!</p>
            <div class="buttons">
                <button class="btn-custom btn-custom-primary" @click="closePopup">Annulla</button>
                <button class="btn-custom btn-custom-delete" @click="deleteArticle">Conferma</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup-container {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.5);
}

.popup {
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;

    text-align: center;
}

.buttons {
    display: flex;
    justify-content: center;
}

button {
    margin: 0 0.5rem;
}
</style>