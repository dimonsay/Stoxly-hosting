<template>
    <div class="recommended-wrapper align-center flex flex-col">

        <div class="profile-title dashboard-title">Dashboard</div>

        <div class="recommended-title text-2xl mb-5 mt-5 font-semibold">
            Recommended
        </div>

        <div class="popular-items-wrapper grid grid-cols-3 gap-4 w-full">
            <div class="recommended-item flex items-center justify-between page-tile dashboard-tile"
                v-for="(item, index) in flatRecommended.slice(0, visibleItemsCount['recommended'] || 3)"
                :key="`recommended-${index}`" @click="goToTrade(item.symbol, item.category)">
                <div class="name-wrapper">
                    <div class="recommended-item-title text-lg font-semibold">{{ item.name }}</div>
                    <div class="recommended-item-symbol grey">{{ item.symbol }}</div>
                </div>
                <div class="price-wrapper text-right">
                    <div class="recommended-item-price">${{ item.price && !isNaN(item.price) ?
                        Number(item.price).toFixed(2) : '0.00' }}</div>
                    <div class="recommended-item-trend text-right flex justify-end"
                        :class="{ red: item.trend < 0, green: item.trend > 0 }">
                        <span v-if="item.trend >= 0">+</span>
                        <span v-else>-</span>
                        {{ Math.abs(item.trend) }} %
                    </div>
                </div>
            </div>
        </div>

        <div class="load-more-btn invest-btn pointer mt-5 mx-auto" @click="loadMore('recommended')"
            v-if="flatRecommended.length > (visibleItemsCount['recommended'] || 3)">
            Load more
        </div>
    </div>

    <!-- Popular -->
    <div class="dashboard-page-wrapper">
        <div class="recommended-wrapper pt-10 align-center flex flex-col" v-for="(items, category) in groupedPopular"
            :key="'popular-' + category">
            <div class="recommended-title text-2xl mb-5 mt-5 font-semibold">
                Popular {{ formatCategory(category) }}
            </div>

            <div class="popular-items-wrapper grid grid-cols-3 gap-4 w-full">
                <div class="recommended-item flex items-center justify-between page-tile dashboard-tile"
                    v-for="(item, index) in items.slice(0, visibleItemsCount[category] || 3)"
                    :key="`popular-${category}-${index}`" @click="goToTrade(item.symbol, item.category)">
                    <div class="name-wrapper">
                        <div class="recommended-item-title text-lg font-semibold">{{ item.name }}</div>
                        <div class="recommended-item-symbol grey">{{ item.symbol }}</div>
                    </div>
                    <div class="price-wrapper text-right">
                        <div class="recommended-item-price">${{ item.price && !isNaN(item.price) ?
                            Number(item.price).toFixed(2) : '0.00' }}</div>
                        <div class="recommended-item-trend text-right flex justify-end"
                            :class="{ red: item.trend < 0, green: item.trend > 0 }">
                            <span v-if="item.trend >= 0">+</span>
                            <span v-else>-</span>
                            {{ Math.abs(item.trend) }} %
                        </div>
                    </div>
                </div>
            </div>

            <div class="load-more-btn invest-btn pointer mt-5 mx-auto" @click="loadMore(category)"
                v-if="items.length > (visibleItemsCount[category] || 3)">
                Load more
            </div>
        </div>
    </div>
</template>



<script setup>
import apiClient from '@/api/axios';
import { generateTradeLink } from '@/utils/tradeLinks';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = ref([]);
const popular = reactive([]);
const recommended = reactive([]);
const visibleItemsCount = reactive({});

onMounted(async () => {
    await getCategory();
    await getPopular();
    await getRecommended();
});

async function getRecommended() {
    try {
        const response = await apiClient.getRecommended(); // без категории
        console.log('Recommended assets response:', response);
        recommended.splice(0, recommended.length, ...response?.results || []);
    } catch (err) {
        console.warn('Failed to load recommended assets', err);
    }
}

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
    console.log('Popular assets response:', response);
    popular.splice(0, popular.length, ...response);
}

const flatRecommended = computed(() => {
    console.log('Processing recommended items:', recommended);
    return recommended.map(item => {
        const processedItem = {
            name: item.name,
            symbol: item.symbol,
            price: parseFloat(item.price_buy || item.price || 0),
            trend: parseFloat(item.change_percent),
            category: item.category || null, // добавлено
        };
        console.log('Processed item:', processedItem);
        return processedItem;
    });
});



const groupedPopular = computed(() => {
    const map = {};
    for (const item of popular) {
        const cat = item.category || 'other';
        if (!map[cat]) map[cat] = [];
        map[cat].push({
            name: item.name,
            symbol: item.symbol,
            price: parseFloat(item.price_buy || item.price || 0),
            trend: parseFloat(item.change_percent),
            category: item.category || null, // добавлено
        });
    }
    return map;
});

const goToTrade = (symbol, category = null) => {
    const tradeLink = generateTradeLink(symbol, null, category);
    router.push(tradeLink);
};

</script>

<style scoped></style>