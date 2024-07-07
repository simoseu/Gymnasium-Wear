<script>
import check from "@/assets/img/check-circle.svg";
import error from "@/assets/img/exclamation-circle.svg";

export default {
    name: "AlertMessage",
    props: {
        success: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            check: check,
            error: error
        }
    }
}
</script>

<template>
    <div class="message-container">
        <div v-if="success" class="message">
            <img :src="check" />
            <span class="success">
                {{ message }}
            </span>
        </div>
        <div v-else class="message">
            <img :src="error" />
            <span class="error">
                {{ message }}
            </span>
        </div>
    </div>
</template>

<style>
.message-container {
    position: fixed;
    top: 3rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    animation: slideDown 500ms ease-in;
}

.message {
    display: flex;
    align-items: center;

    padding: 1rem 2rem 1rem 1rem;

    background-color: #fff;
    border-radius: 20px;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.message img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
}

.message span {
    font-weight: bold;
}

.success {
    color: #198754;
}

.error {
    color: #dc3545;
}


@keyframes slideDown {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>