<template>
    <div class="recommended-wrapper align-center flex flex-col">

        <div class="profile-title dashboard-title">Dashboard</div>

        <div class="recommended-title text-2xl mb-5 mt-5 font-semibold">
            Recommended
        </div>

        <div class="popular-items-wrapper grid grid-cols-3 gap-4 w-full">
            <div class="recommended-item page-tile dashboard-tile"
                v-for="(item, index) in flatRecommended.slice(0, visibleItemsCount['recommended'] || 3)"
                :key="`recommended-${index}`" @click="goToTrade(item.symbol, item.category)">
                <!-- Desktop Layout -->
                <div class="hidden md:flex justify-between items-center w-full">
                    <div class="flex flex-col">
                        <div class="recommended-item-title font-semibold">{{ item.name }}</div>
                        <div class="recommended-item-symbol text-gray-500">{{ item.symbol }}</div>
                    </div>
                    <div class="flex flex-col items-end">
                        <div class="recommended-item-price font-semibold">${{ item.price && !isNaN(item.price) ?
                            Number(item.price).toFixed(2) : '0.00' }}</div>
                        <div class="recommended-item-trend" :class="{ red: item.trend < 0, green: item.trend > 0 }">
                            <span v-if="item.trend >= 0">+</span><span v-else>-</span>{{ Math.abs(item.trend) }} %
                        </div>
                    </div>
                </div>
                <!-- Mobile Layout -->
                <div class="md:hidden">
                    <div class="recommended-item-header">
                        <div class="recommended-item-title">{{ item.name }}</div>
                        <div class="recommended-item-symbol">{{ item.symbol }}</div>
                    </div>
                    <div class="recommended-item-footer">
                        <div class="recommended-item-price">${{ item.price && !isNaN(item.price) ?
                            Number(item.price).toFixed(2) : '0.00' }}</div>
                        <div class="recommended-item-trend" :class="{ red: item.trend < 0, green: item.trend > 0 }">
                            <span v-if="item.trend >= 0">+</span><span v-else>-</span>{{ Math.abs(item.trend) }} %
                        </div>
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
                <div class="recommended-item page-tile dashboard-tile"
                    v-for="(item, index) in items.slice(0, visibleItemsCount[category] || 3)"
                    :key="`popular-${category}-${index}`" @click="goToTrade(item.symbol, item.category)">
                    <!-- Desktop Layout -->
                    <div class="hidden md:flex justify-between items-center w-full">
                        <div class="flex flex-col">
                            <div class="recommended-item-title font-semibold">{{ truncateTitle(item.name, 16) }}</div>
                            <div class="recommended-item-symbol text-gray-500">{{ item.symbol }}</div>
                        </div>
                        <div class="flex flex-col items-end">
                            <div class="recommended-item-price font-semibold">${{ item.price && !isNaN(item.price) ?
                                Number(item.price).toFixed(2) : '0.00' }}</div>
                            <div class="recommended-item-trend" :class="{ red: item.trend < 0, green: item.trend > 0 }">
                                <span v-if="item.trend >= 0">+</span><span v-else>-</span>{{ Math.abs(item.trend) }} %
                            </div>
                        </div>
                    </div>
                    <!-- Mobile Layout -->
                    <div class="md:hidden">
                        <div class="recommended-item-header">
                            <div class="recommended-item-title">{{ truncateTitle(item.name, 16) }}</div>
                            <div class="recommended-item-symbol">{{ item.symbol }}</div>
                        </div>
                        <div class="recommended-item-footer">
                            <div class="recommended-item-price">${{ item.price && !isNaN(item.price) ?
                                Number(item.price).toFixed(2) : '0.00' }}</div>
                            <div class="recommended-item-trend" :class="{ red: item.trend < 0, green: item.trend > 0 }">
                                <span v-if="item.trend >= 0">+</span><span v-else>-</span>{{ Math.abs(item.trend) }} %
                            </div>
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

// Определяем мобильное устройство
const isMobile = window.innerWidth <= 768;

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
        // Устанавливаем начальное количество видимых для recommended
        visibleItemsCount['recommended'] = isMobile ? 4 : 3;
    } catch (err) {
        console.warn('Failed to load recommended assets', err);
    }
}

function formatCategory(category) {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const loadMore = category => {
    if (!visibleItemsCount[category]) visibleItemsCount[category] = isMobile ? 4 : 3;
    visibleItemsCount[category] += isMobile ? 4 : 3;
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
    // Для каждой категории устанавливаем начальное количество видимых
    const cats = response.map(item => item.category || 'other');
    cats.forEach(cat => {
        if (!visibleItemsCount[cat]) visibleItemsCount[cat] = isMobile ? 4 : 3;
    });
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

// Функция для обрезки названия на мобильной версии
function truncateTitle(title, maxLength = 16) {
    if (!title) return '';
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
}

</script>

<style scoped>
/* Desktop styles */
.recommended-item {
    padding: 16px;
    min-height: 80px;
}

.recommended-item-title {
    font-size: 1rem;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

.recommended-item-symbol {
    font-size: 0.875rem;
    font-weight: 500;
}

.recommended-item-price {
    font-size: 1rem;
}

.recommended-item-trend {
    font-size: 0.875rem;
    font-weight: 600;
}

.recommended-item-trend.green {
    color: #22c55e;
}

.recommended-item-trend.red {
    color: #ef4444;
}

/* Mobile styles */
@media (max-width: 768px) {
    .popular-items-wrapper {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
        justify-content: center;
    }

    .recommended-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 70px;
        font-size: 0.98rem;
        padding: 12px 8px !important;
        align-items: flex-start;
        width: 180px;
        max-width: 180px;
    }

    .recommended-item-header {
        width: 100%;
        text-align: left;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 2px;
    }

    .recommended-item-title {
        font-size: 0.98rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        max-width: 100%;
    }

    .recommended-item-symbol {
        font-size: 0.92rem;
        color: #33c3f0;
        font-weight: 500;
    }

    .recommended-item-footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.95rem;
        margin-top: 2px;
    }

    .recommended-item-price {
        font-weight: 500;
        flex: 1;
        min-width: 0;
    }

    .recommended-item-trend {
        font-weight: 600;
        margin-left: 8px;
        white-space: nowrap;
    }
}
</style>