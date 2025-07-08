<template>
    <div class="trading-markets-wrapper page-tile dashboard-tile flex flex-col gap-5">
        <div class="flex">
            <div class="trading-market-categorie pointer text-xl" v-for="item in categories" :key="item.value"
                :class="{ 'active-categorie': selectedCategory === item.value }" @click="selectedCategory = item.value">
                {{ item.label }}
            </div>
        </div>


        <div class="trade-block-title flex justify-between items-center">
            <div class="category-title text-xl font-semibold">
                {{categories.find(cat => cat.value === selectedCategory)?.label || ''}} Market Overview
            </div>

            <IconField style="display: flex; align-items: center; position: relative;">
                <InputIcon class="pi pi-search"
                    style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);" />
                <InputText v-model="search" type="text" autocomplete="off" placeholder="Search..." class="block mb-5"
                    style="max-width: 320px; min-width: 270px; padding-left: 40px;" />
            </IconField>

        </div>

        <div class="filtered-items flex flex-col gap-5 ">
            <div class="filtered-item flex align-center justify-between p-5 bg-gray-700 pointer rounded-xl select-none"
                v-for="item in instruments" :key="item.symbol">
                <div class="flex flex-col gap-3">
                    <div class="filtered-item-name text-xl font-semibold">{{ item.name.toUpperCase() }}</div>
                    <div class="filtered-item-symbol grey">{{ item.symbol.toUpperCase() }}</div>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="filtered-item-toBuy text-green-500" @click="buyAsset(item.id, 1)">
                        Price to buy: ${{ Number(item.price).toFixed(2) }}
                    </div>
                    <div class="filtered-item-toSell text-red-500" @click="sellAsset(item.id, 1)">
                        Price to sell: ${{ Number(item.price).toFixed(2) }}
                    </div>
                </div>
            </div>
        </div>


        <div class="load-more-btn invest-btn text-xl p-2 w-full pointer text-center"
            v-if="instruments.length > instrumentsLoad" @click="loadMore">Load more</div>
    </div>
</template>


<style scoped>
.trading-market-categorie {
    padding: 5px 10px;
    border-radius: 4px;
}

.active-categorie {
    background-color: #33c3f0;
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { InputText } from 'primevue';
import { onMounted, ref, watch } from 'vue';

const categories = ref([]);
const selectedCategory = ref('');
const search = ref('');
const instruments = ref([]);
const instrumentsLoad = ref(8);

const emit = defineEmits(['update-balance']);

const fetchCategories = async () => {
    try {
        const data = await apiClient.getCategory();
        categories.value = data.categories;
        if (categories.value.length > 0) {
            selectedCategory.value = categories.value[0].value; // 👈 not label!
        }
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
    }
};

const fetchInstruments = async () => {
    try {
        const result = await apiClient.searchAssets(search.value, selectedCategory.value, instrumentsLoad.value);
        instruments.value = result;
    } catch (error) {
        console.error('Ошибка при получении инструментов:', error);
    }
};

onMounted(async () => {
    await fetchCategories();
    await fetchInstruments();
});

watch([selectedCategory, search], () => {
    fetchInstruments();
});

const loadMore = async () => {
    instrumentsLoad.value += 4;
    await fetchInstruments();
};

const buyAsset = async (id, quantity = 1) => {
    try {
        await apiClient.buyAsset(id, quantity);
        emit('update-balance');
    } catch (error) {
        console.error('Ошибка при покупке:', error);
    }
};

const sellAsset = async (id, quantity = 1) => {
    try {
        await apiClient.sellAsset(id, quantity);
        emit('update-balance');
    } catch (error) {
        console.error('Ошибка при продаже:', error);
    }
};
</script>
