<script setup>
import apiClient from '@/api/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const news = ref(null);
const loading = ref(true);
const error = ref(null);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

onMounted(async () => {
    const newsId = parseInt(route.params.id);

    try {
        loading.value = true;
        // Используем новый API метод для получения конкретной новости
        const newsData = await apiClient.getNewsById(newsId);
        news.value = newsData;
    } catch (err) {
        console.error('Error loading news:', err);
        error.value = 'Failed to load news';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="news-details">
        <div v-if="loading" class="loading">
            <p>Loading news...</p>
        </div>

        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="news" class="news-content">
            <div class="news-header flex flex-col gap-2 mb-10 page-tile p-5">
                <div class="news-title text-2xl font-semibold">{{ news.title }}</div>

                <div class="flex gap-2 justify-between w-full">
                    <div class="news-category">{{ capitalize(news.category.name) }}</div>
                    <div class="news-date text-white">{{ formatDate(news.created_at) }}</div>
                </div>


            </div>

            <div class="news-text page-tile p-5 text-lg text-gray-300">
                {{ news.text }}
            </div>

            <div v-if="news.tags?.length">
                <h3>Tags:</h3>
                <ul>
                    <li v-for="tag in news.tags" :key="tag.name">{{ tag.name }}</li>
                </ul>
            </div>
        </div>

        <div v-else class="not-found">
            <p>News not found</p>
        </div>
    </div>
</template>

<style scoped>
.news-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.loading,
.error,
.not-found {
    text-align: center;
    padding: 2rem;
}

.error {
    color: #dc3545;
}

.not-found {
    color: #6c757d;
}

.news-content h1 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2rem;
}

.news-content p {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #555;
}

.news-content h3 {
    color: #333;
    margin: 1.5rem 0 0.5rem 0;
}

.news-content ul {
    list-style: none;
    padding: 0;
}

.news-content li {
    display: inline-block;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    font-size: 0.875rem;
    color: #495057;
}

.news-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.news-category {
    padding: 3px 15px;
    background-color: #1d283a;
    border-radius: 6px;
}

.news-date {
    color: #6c757d;
    font-size: 0.9rem;
}

.bc-green {
    background-color: #10b981;
}

.bc-violet {
    background-color: #8b5cf6;
}

.bc-dark-blue {
    background-color: #1d4ed8;
}
</style>
