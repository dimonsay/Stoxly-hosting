<template>
    <div class="trading-transactions-wrapper page-tile dashboard-tile">
        <div class="trade-block-title text-xl font-semibold mb-10">Transactions</div>
        <div class="stocks-wrapper">
            <div
                class="stocks-filters-wrapper flex justify-between border-b border-b-blue-500 px-4 py-2 bg-[#161a23] font-semibold text-lg text-white">
                <div class="basis-1/6 min-w-[80px]">Type</div>
                <div class="basis-1/6 min-w-[80px]">Symbol</div>
                <div class="basis-1/6 min-w-[80px] text-center">Quantity</div>
                <div class="basis-1/6 min-w-[80px] text-center">Price</div>
                <div class="basis-1/6 min-w-[80px] text-center">Total</div>
                <div class="basis-1/6 min-w-[100px] text-center">Date</div>
            </div>

            <div class="stocks-data-wrapper">
                <div class="stock-item flex justify-between items-center border-b border-b-blue-500 hover:bg-sky-600 px-4 py-2 text-lg text-white pointer"
                    v-for="transaction in transactions" :key="transaction.id">
                    <div class="basis-1/6 min-w-[80px]">{{ capitalize(transaction.type) }}</div>
                    <div class="basis-1/6 min-w-[80px] text-blue-400">{{ transaction.asset.symbol }}</div>
                    <div class="basis-1/6 min-w-[80px] text-center">{{ Math.floor(transaction.quantity) }}</div>
                    <div class="basis-1/6 min-w-[80px] text-center">${{ transaction.price }}</div>
                    <div class="basis-1/6 min-w-[80px] text-center">${{ transaction.total }}</div>
                    <div class="basis-1/6 min-w-[100px] text-center">{{ formatDate(transaction.created_at) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.stocks-filters-wrapper {
    margin-top: 20px;
    background-color: #161a23;
}

.stock-item {
    transition: ease-in-out 0.15s;
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { onMounted, reactive } from 'vue';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const transactions = reactive([])

onMounted(async () => {
    try {
        const response = await apiClient.getUserTransactions()

        transactions.splice(0, transactions.length, ...response)
    } catch (err) {
        console.warn(err)
    }
})

</script>