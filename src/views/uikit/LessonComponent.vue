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
                    <div class="lesson-level" :class="{
                        'bc-green': lesson.level === 'beginner',
                        'bc-violet': lesson.level === 'intermediate',
                        'bc-dark-blue': lesson.level === 'advanced'
                    }">
                        {{ capitalize(lesson.level) }}
                    </div>
                    <div class="lesson-duration text-white">{{ lesson.duration }} min</div>
                </div>

                <div class="lesson-description text-gray-300 mt-3">
                    {{ lesson.description }}
                </div>
            </div>

            <div class="lesson-content-wrapper page-tile p-5">
                <div class="lesson-text text-lg text-gray-300 mb-6" v-html="lesson.content">
                </div>

                <div v-if="lesson.materials?.length" class="lesson-materials mt-8">
                    <h3 class="text-xl font-semibold mb-3">Materials:</h3>
                    <ul class="space-y-2">
                        <li v-for="material in lesson.materials" :key="material.id"
                            class="flex items-center gap-2 p-3 bg-gray-700 rounded">
                            <i class="pi pi-file"></i>
                            <span>{{ material.name }}</span>
                        </li>
                    </ul>
                </div>

                <div v-if="lesson.quiz?.length" class="lesson-quiz mt-8">
                    <h3 class="text-xl font-semibold mb-3">Quiz:</h3>
                    <div class="space-y-4">
                        <div v-for="question in lesson.quiz" :key="question.id" class="p-4 bg-gray-700 rounded">
                            <div class="question-text font-semibold mb-2">{{ question.question }}</div>
                            <div class="answers space-y-1">
                                <div v-for="answer in question.answers" :key="answer.id"
                                    class="flex items-center gap-2">
                                    <input type="radio" :name="'question-' + question.id" :value="answer.id"
                                        :id="'answer-' + answer.id">
                                    <label :for="'answer-' + answer.id">{{ answer.text }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

.lesson-level {
    padding: 3px 15px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
}

.lesson-duration {
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

.lesson-content-wrapper {
    line-height: 1.6;
}

.lesson-text {
    white-space: pre-line;
}

.lesson-text :deep(h1),
.lesson-text :deep(h2),
.lesson-text :deep(h3) {
    margin: 1.5rem 0 1rem 0;
    color: #f3f4f6;
}

.lesson-text :deep(p) {
    margin-bottom: 1rem;
}

.lesson-text :deep(ul),
.lesson-text :deep(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
}

.lesson-text :deep(li) {
    margin-bottom: 0.5rem;
}

.lesson-text :deep(blockquote) {
    border-left: 4px solid #33c3f0;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #9ca3af;
}

.lesson-text :deep(code) {
    background-color: #374151;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
}

.lesson-text :deep(pre) {
    background-color: #1f2937;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1rem 0;
}

.lesson-text :deep(pre code) {
    background: none;
    padding: 0;
}

.lesson-materials ul,
.lesson-quiz {
    list-style: none;
    padding: 0;
}

.lesson-materials li {
    border: 1px solid #374151;
    border-radius: 6px;
    transition: all 0.2s;
}

.lesson-materials li:hover {
    border-color: #33c3f0;
    background-color: #374151;
}

.lesson-quiz input[type="radio"] {
    accent-color: #33c3f0;
}

.lesson-quiz label {
    cursor: pointer;
    color: #d1d5db;
}

.lesson-quiz label:hover {
    color: #33c3f0;
}
</style>