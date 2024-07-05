<script>
import logo from '@/assets/img/logo.webp';

export default {
    name: 'Header',
    data() {
        return {
            logo: logo,
        }
    }
}
</script>

<template>
    <nav class="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
            <RouterLink class="navbar-brand ms-5 p-0" to="/">
                <img class="logo" :src=logo alt="Gymnasium Wear Logo" />
                <span class="logo-text">Gymnasium Wear</span>
            </RouterLink>
            <button class="navbar-toggler me-5" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse me-0" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/" exactActiveClass="fw-bold text-white">
                            Homepage</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-brand {
    display: flex;
    align-items: center;
}

.logo {
    width: 70px;
    height: 70px;
}

.logo-text {
    margin-left: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
}

.nav-link {
    font-size: 1.2rem;
}

.nav-link:hover {
    color: #fff;
    font-weight: bold;
}
</style>