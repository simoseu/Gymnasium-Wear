import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import ArticleView from '@/views/ArticleView.vue';
import AddArticleView from '@/views/AddArticleView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/articles/:id',
            name: 'Article',
            component: ArticleView
        },
        {
            path: '/articles/add',
            name: 'AddArticle',
            component: AddArticleView
        }
    ]
})

export default router;