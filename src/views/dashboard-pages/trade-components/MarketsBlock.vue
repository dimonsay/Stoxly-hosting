<template>
    <div class="trading-markets-wrapper page-tile dashboard-tile flex flex-col gap-5">
        <div class="trading-markets-categories-wrapper flex gap-3">
            <div class="trading-market-categorie pointer" v-for="(item, category) in instruments"
                :class="{ 'active-categorie': selectedCategory === category }" :key="category"
                @click="selectedCategory = category">{{ category.toUpperCase() }}</div>
        </div>

        <div class="trade-block-title text-xl font-semibold">{{ selectedCategory.charAt(0).toUpperCase() +
            selectedCategory.slice(1) }} Market Overview</div>

        <div class="filtered-items flex flex-col  gap-5">
            <div class="filtered-item flex align-center justify-between p-5 bg-gray-700 pointer rounded-xl"
                v-for="(item, category) in instruments[selectedCategory].slice(0, instrumentsLoad[selectedCategory])"
                :key="item">
                <div class="flex flex-col gap-3">
                    <div class="filtered-item-name font-">{{ item.name.toUpperCase() }}</div>
                    <div class="filtered-item-symbol grey">{{ item.symbol.toUpperCase() }}</div>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="filtered-item-toBuy green" @click="buyAsset(2, 1)">Price to buy: ${{ item.toBuy }}</div>
                    <div class="filtered-item-toSell red" @click="sellAsset(2, 1)">Price to sell: ${{ item.toSell }}
                    </div>
                </div>
            </div>
        </div>

        <div class="load-more-btn invest-btn text-xl p-2 w-full pointer"
            v-if="instruments[selectedCategory].length > instrumentsLoad[selectedCategory]" @click="loadMore()">Load
            more</div>
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
import { reactive, ref } from 'vue';

const selectedCategory = ref(null);

const instrumentsLoad = reactive({
    stock: 3,
    etfs: 3,
    crypto: 3,
    bonds: 3,
})

async function buyAsset(id, quantity = 1) {
    try {
        const result = await apiClient.buyAsset(id, quantity);
        console.log('Buy success:', result);
        return result;
    } catch (error) {
        console.error('Buy failed:', error);
        throw error;
    }
}

async function sellAsset(id, quantity = 1) {
    try {
        const result = await apiClient.sellAsset(id, quantity);
        console.log('Sell success:', result);
        return result;
    } catch (error) {
        console.error('Sell failed:', error);
        throw error;
    }
}

const instruments = reactive({
    stock: [
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
    ],
    etfs: [
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
    ],
    crypto: [
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
    ],
    bonds: [
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
        { name: 'Apple', symbol: 'AAPL', toSell: 123, toBuy: 124 },
    ],
})

if (Object.keys(instruments).length > 0) {
    selectedCategory.value = Object.keys(instruments)[0];
}

const loadMore = () => {
    const category = selectedCategory.value;
    instrumentsLoad[category] += 3;
};

</script>