<script setup>
import apiClient from '@/api/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const lesson = ref(null);
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
    const lessonId = parseInt(route.params.id);

    try {
        loading.value = true;
        // Используем новый API метод для получения конкретного урока
        const lessonData = await apiClient.getLessonById(lessonId);
        lesson.value = lessonData;
    } catch (err) {
        console.error('Error loading lesson:', err);
        error.value = 'Failed to load lesson';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="lesson-details">
        <div v-if="loading" class="loading">
            <p>Loading lesson...</p>
        </div>

        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="lesson" class="lesson-content">
            <div class="lesson-header flex flex-col gap-2 mb-10 page-tile p-5">
                <div class="lesson-title text-2xl font-semibold">{{ lesson.title }}</div>

                <div class="flex gap-2 justify-between w-full">
                    <div class="lesson-category" :class="{
                        'bc-green': capitalize(lesson.category) === 'Beginner',
                        'bc-violet': capitalize(lesson.category) === 'Advanced',
                        'bc-dark-blue': capitalize(lesson.category) === 'Intermediate',
                    }">{{ capitalize(lesson.category) }}</div>
                    <div class="lesson-date text-white">{{ formatDate(lesson.created_at) }}</div>
                </div>

                <div v-if="lesson.tags?.length" class="lesson-tags mt-4">
                    <h3 class="text-lg font-semibold mb-2">Tags:</h3>
                    <ul class="flex flex-wrap gap-2">
                        <li v-for="tag in lesson.tags" :key="tag.name" class="tag-item">{{ tag.name }}</li>
                    </ul>
                </div>
            </div>

            <div class="lesson-text page-tile p-5 text-lg text-gray-300">
                {{ lesson.text }}
            </div>
        </div>

        <div v-else class="not-found">
            <p>Lesson not found</p>
        </div>
    </div>
</template>

<style scoped>
.lesson-details {
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

.lesson-category {
    padding: 3px 15px;
    border-radius: 6px;
    color: white;
}

.lesson-date {
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