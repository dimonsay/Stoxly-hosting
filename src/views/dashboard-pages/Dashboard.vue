<template>
    <div class="dashboard-page-wrapper">
        <div class="dashboard-title">Dashboard</div>

        <div class="recommended-wrapper pt-10 align-center flex flex-col" v-for="(items, category) in dashboard.popular"
            :key="category">

            <div class="recommended-title text-2xl mb-5 mt-5 font-semibold">
               Popular {{ category.charAt(0).toUpperCase() + category.slice(1) }}
            </div>

            <div class="popular-items-wrapper grid grid-cols-3 gap-4 w-full">
                <div class="recommended-item flex items-center justify-between page-tile dashboard-tile"
                    v-for="(item, index) in items.slice(0, visibleItemsCount[category])" :key="index">
                    <div class="name-wrapper">
                        <div class="recommended-item-title text-xl font-semibold">{{ item.name }}</div>
                        <div class="recommended-item-symbol grey">{{ item.symbol }}</div>
                    </div>

                    <div class="price-wrapper">
                        <div class="recommended-item-price">${{ item.price }}</div>
                        <div class="recommended-item-trend text-right flex justify-end"
                            :class="{ 'red': item.trend < 0, 'green': item.trend > 0 }">
                            <div class="plus" :class="{ 'hidden': item.trend < 0 }">+</div>
                            <div class="minus" :class="{ 'hidden': item.trend > 0 }">-</div>
                            {{ item.trend }} %
                        </div>
                    </div>
                </div>


            </div>
            <div class="load-more-btn invest-btn pointer" style="margin: 0 auto; margin-top: 20px;"
                @click="loadMore(category)" v-if="items.length > visibleItemsCount[category]">Load more</div>
        </div>


    </div>
</template>

<script setup>
import { reactive } from 'vue';

const visibleItemsCount = reactive({
    recommended: 3,
    stocks: 3,
    etfs: 3,
    crypto: 3,
});

const loadMore = (category) => {
    visibleItemsCount[category] += 3;
};

const dashboard = reactive({
    popular: {
        recommended: [
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
        ],
        stocks: [
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
        ],
        etfs: [
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
        ],
        crypto: [
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
            { name: 'Apple', symbol: 'AAPL', price: 123, trend: 1 },
        ],
    }
})

</script>

<style scoped></style>