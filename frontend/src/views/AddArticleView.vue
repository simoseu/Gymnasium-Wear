<script>
</script>

<template>
    <div class="container mt-5">
        <h1 class="text-center">Aggiungi un nuovo articolo</h1>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Nome Articolo</label>
                <input type="text" class="form-control" id="name" placeholder="Inserire il nome dell'articolo" required>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Prezzo Articolo</label>
                <input type="number" step="any" class="form-control" id="price"
                    placeholder="Inserire il prezzo dell'articolo in €" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descrizione Articolo (opzionale)</label>
                <textarea class="form-control" id="description" rows="5"></textarea>
            </div>

            <div class="mb-3">
                <label for="image" class="form-label">Immagine Articolo (opzionale)</label>
                <input type="file" class="form-control" id="image">
            </div>
            <div class="text-center mt-5">
                <button type="submit" class="btn btn-primary">Aggiungi Articolo</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    background-color: #fff;
    border-radius: 20px;
    padding: 1rem;
    max-width: 75%;
}

@media screen and (min-width: 1224px) {
    .container {
        max-width: 50%;
    }
}
</style>
