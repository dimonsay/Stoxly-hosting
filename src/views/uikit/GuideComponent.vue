<script setup>
import apiClient from '@/api/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const guide = ref(null);
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
    const guideId = parseInt(route.params.id);

    try {
        loading.value = true;
        // Получаем все гайды
        const allGuides = await apiClient.getGuides();

        // Ищем гайд с нужным ID
        const foundGuide = allGuides.find(g => g.id === guideId);

        if (foundGuide) {
            guide.value = foundGuide;
        } else {
            error.value = 'Guide not found';
        }
    } catch (err) {
        console.error('Error loading guides:', err);
        error.value = 'Failed to load guide';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="guide-details">
        <div v-if="loading" class="loading">
            <p>Loading guide...</p>
        </div>

        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="guide" class="guide-content">
            <div class="guide-header flex flex-col gap-2 mb-10 page-tile p-5">

                <div class="flex gap-2 justify-between w-full">
                    <div class="guide-category" :class="{
                        'bc-green': capitalize(guide.category) === 'Beginner',
                        'bc-violet': capitalize(guide.category) === 'Advanced',
                        'bc-dark-blue': capitalize(guide.category) === 'Intermediate',
                    }">{{ capitalize(guide.category) }}</div>
                    <div class="guide-date text-white">{{ formatDate(guide.created_at) }}</div>
                </div>

                <div class="guide-title text-2xl font-semibold">{{ guide.title }}</div>

                <div v-if="guide.tags?.length" class="guide-tags mt-4">
                    <ul class="flex flex-wrap gap-2">
                        <li v-for="tag in guide.tags" :key="tag.name" class="tag-item">{{ tag.name }}</li>
                    </ul>
                </div>
            </div>

            <div class="guide-text page-tile p-5 text-lg text-gray-300">
                {{ guide.text }}
            </div>
        </div>

        <div v-else class="not-found">
            <p>Guide not found</p>
        </div>
    </div>
</template>

<style scoped>
.guide-details {
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

.guide-category {
    padding: 3px 15px;
    border-radius: 6px;
    color: white;
}

.guide-date {
    color: #6c757d;
    font-size: 0.9rem;
}

.tag-item {
    display: inline-block;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    color: #495057;
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
