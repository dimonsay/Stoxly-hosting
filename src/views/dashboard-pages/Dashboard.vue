<template>
    <div class="recommended-wrapper pt-10 align-center flex flex-col" v-for="(items, category) in groupedRecommended"
        :key="'recommended-' + category">
        <div class="recommended-title text-2xl mb-5 mt-5 font-semibold">
            Recommended {{ formatCategory(category) }}
        </div>

        <div class="popular-items-wrapper grid grid-cols-3 gap-4 w-full">
            <div class="recommended-item flex items-center justify-between page-tile dashboard-tile"
                v-for="(item, index) in items.slice(0, visibleItemsCount[category] || 3)"
                :key="`recommended-${category}-${index}`">
                <div class="name-wrapper">
                    <div class="recommended-item-title text-xl font-semibold">{{ item.name }}</div>
                    <div class="recommended-item-symbol grey">{{ item.symbol }}</div>
                </div>
                <div class="price-wrapper">
                    <div class="recommended-item-price">${{ item.price }}</div>
                    <div class="recommended-item-trend text-right flex justify-end"
                        :class="{ red: item.trend < 0, green: item.trend > 0 }">
                        <span v-if="item.trend >= 0">+</span>
                        <span v-else>-</span>
                        {{ Math.abs(item.trend) }} %
                    </div>
                </div>
            </div>
        </div>

        <div class="load-more-btn invest-btn pointer mt-5" @click="loadMore(category)"
            v-if="items.length > (visibleItemsCount[category] || 3)">
            Load more
        </div>

        <div class="dashboard-page-wrapper">
            <!-- POPULAR section -->
            <div class="recommended-wrapper pt-10 align-center flex flex-col"
                v-for="(items, category) in groupedPopular" :key="'popular-' + category">
                <div class="recommended-title text-2xl mb-5 mt-5 font-semibold">
                    Popular {{ formatCategory(category) }}
                </div>

                <div class="popular-items-wrapper grid grid-cols-3 gap-4 w-full">
                    <div class="recommended-item flex items-center justify-between page-tile dashboard-tile"
                        v-for="(item, index) in items.slice(0, visibleItemsCount[category] || 3)"
                        :key="`popular-${category}-${index}`">
                        <div class="name-wrapper">
                            <div class="recommended-item-title text-xl font-semibold">{{ item.name }}</div>
                            <div class="recommended-item-symbol grey">{{ item.symbol }}</div>
                        </div>
                        <div class="price-wrapper">
                            <div class="recommended-item-price">${{ item.price }}</div>
                            <div class="recommended-item-trend text-right flex justify-end"
                                :class="{ red: item.trend < 0, green: item.trend > 0 }">
                                <span v-if="item.trend >= 0">+</span>
                                <span v-else>-</span>
                                {{ Math.abs(item.trend) }} %
                            </div>
                        </div>
                    </div>
                </div>

                <div class="load-more-btn invest-btn pointer mt-5" @click="loadMore(category)"
                    v-if="items.length > (visibleItemsCount[category] || 3)">
                    Load more
                </div>
            </div>

            <!-- RECOMMENDED section -->

        </div>
    </div>
</template>


<script setup>
import apiClient from '@/api/axios';
import { computed, onMounted, reactive, ref } from 'vue';

const categories = ref([]);
const popular = reactive([]);
const recommended = reactive([]);
const visibleItemsCount = reactive({});

onMounted(async () => {
    await getCategory();
    await getPopular();
    await getRecommendedAll();
});

function formatCategory(category) {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const loadMore = category => {
    if (!visibleItemsCount[category]) visibleItemsCount[category] = 3;
    visibleItemsCount[category] += 3;
};

async function getCategory() {
    const response = await apiClient.getCategory();
    if (response && Array.isArray(response.categories)) {
        categories.value = response.categories.map(c => c.value);
    }
}

async function getPopular() {
    const response = await apiClient.getPopularAssets();
    popular.splice(0, popular.length, ...response);
}

async function getRecommendedAll() {
    const promises = categories.value.map(async (category) => {
        try {
            const response = await apiClient.getRecommended(category);
            const items = response?.results || [];
            return items.map(item => ({ ...item, category }));
        } catch (err) {
            console.warn(`Failed to load recommended for ${category}`, err);
            return [];
        }
    });

    const allResults = await Promise.all(promises);
    const flat = allResults.flat();
    recommended.splice(0, recommended.length, ...flat);
}

const groupedRecommended = computed(() => {
    const map = {};
    for (const item of recommended) {
        const cat = item.category || 'other';
        if (!map[cat]) map[cat] = [];
        map[cat].push({
            name: item.name,
            symbol: item.symbol,
            price: parseFloat(item.price),
            trend: parseFloat(item.change_percent),
        });
    }
    return map;
});

const groupedPopular = computed(() => {
    const map = {};
    for (const item of popular) {
        const cat = item.category || 'other';
        if (!map[cat]) map[cat] = [];
        map[cat].push({
            name: item.name,
            symbol: item.symbol,
            price: parseFloat(item.price),
            trend: parseFloat(item.change_percent),
        });
    }
    return map;
});

</script>

<style scoped>
.dashboard-page-wrapper {
    min-height: 100vh;
}
</style>