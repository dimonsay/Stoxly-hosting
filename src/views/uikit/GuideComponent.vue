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
        // Используем новый API метод для получения конкретного гайда
        const guideData = await apiClient.getGuideById(guideId);
        guide.value = guideData;
    } catch (err) {
        console.error('Error loading guide:', err);
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
                <div class="guide-title text-2xl font-semibold">{{ guide.title }}</div>

                <div class="flex gap-2 justify-between w-full">
                    <div class="guide-author text-gray-400">By {{ guide.author }}</div>
                    <div class="guide-date text-white">{{ formatDate(guide.created_at) }}</div>
                </div>

                <div class="guide-description text-gray-300 mt-3">
                    {{ guide.description }}
                </div>

                <div v-if="guide.categories?.length" class="guide-categories flex gap-2 mt-3">
                    <span v-for="category in guide.categories" :key="category.id"
                        class="category px-3 py-1 bg-gray-700 rounded text-sm">
                        {{ category.name }}
                    </span>
                </div>
            </div>

            <div class="guide-content-wrapper page-tile p-5">
                <div class="guide-text text-lg text-gray-300 mb-6" v-html="guide.content">
                </div>

                <div v-if="guide.steps?.length" class="guide-steps mt-8">
                    <h3 class="text-xl font-semibold mb-4">Step-by-step guide:</h3>
                    <div class="space-y-4">
                        <div v-for="(step, index) in guide.steps" :key="step.id"
                            class="step-item p-4 bg-gray-700 rounded">
                            <div class="step-number text-blue-400 font-bold mb-2">
                                Step {{ index + 1 }}
                            </div>
                            <div class="step-title font-semibold mb-2">{{ step.title }}</div>
                            <div class="step-content text-gray-300">{{ step.content }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="guide.tips?.length" class="guide-tips mt-8">
                    <h3 class="text-xl font-semibold mb-4">Pro Tips:</h3>
                    <div class="space-y-2">
                        <div v-for="tip in guide.tips" :key="tip.id"
                            class="tip-item p-3 bg-yellow-900/20 border border-yellow-600/30 rounded">
                            <div class="flex items-start gap-2">
                                <i class="pi pi-lightbulb text-yellow-400 mt-1"></i>
                                <span class="text-gray-300">{{ tip.content }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="guide.resources?.length" class="guide-resources mt-8">
                    <h3 class="text-xl font-semibold mb-4">Additional Resources:</h3>
                    <div class="space-y-2">
                        <div v-for="resource in guide.resources" :key="resource.id"
                            class="resource-item p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                            <div class="flex items-center gap-2">
                                <i class="pi pi-external-link text-blue-400"></i>
                                <a :href="resource.url" target="_blank" class="text-blue-400 hover:text-blue-300">
                                    {{ resource.title }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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

.guide-author {
    font-size: 0.9rem;
}

.guide-date {
    color: #6c757d;
    font-size: 0.9rem;
}

.category {
    background-color: #1d283a;
    color: #d1d5db;
    font-size: 0.8rem;
}

.guide-content-wrapper {
    line-height: 1.6;
}

.guide-text {
    white-space: pre-line;
}

.guide-text :deep(h1),
.guide-text :deep(h2),
.guide-text :deep(h3) {
    margin: 1.5rem 0 1rem 0;
    color: #f3f4f6;
}

.guide-text :deep(p) {
    margin-bottom: 1rem;
}

.guide-text :deep(ul),
.guide-text :deep(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
}

.guide-text :deep(li) {
    margin-bottom: 0.5rem;
}

.guide-text :deep(blockquote) {
    border-left: 4px solid #33c3f0;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #9ca3af;
}

.guide-text :deep(code) {
    background-color: #374151;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
}

.guide-text :deep(pre) {
    background-color: #1f2937;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1rem 0;
}

.guide-text :deep(pre code) {
    background: none;
    padding: 0;
}

.step-item {
    border-left: 4px solid #33c3f0;
}

.tip-item {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
}

.resource-item a {
    text-decoration: none;
}

.resource-item a:hover {
    text-decoration: underline;
}
</style>
