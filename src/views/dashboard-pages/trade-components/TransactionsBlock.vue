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
                    v-for="transaction in visibleTransactions" :key="transaction.id">
                    <div class="basis-1/6 min-w-[80px]">{{ capitalize(transaction.type) }}</div>
                    <div class="basis-1/6 min-w-[80px] text-blue-400">{{ transaction.asset.symbol }}</div>
                    <div class="basis-1/6 min-w-[80px] text-center">{{ Math.floor(transaction.quantity) }}</div>
                    <div class="basis-1/6 min-w-[80px] text-center">${{ transaction.price_buy }}</div>
                    <div class="basis-1/6 min-w-[80px] text-center">${{ transaction.total }}</div>
                    <div class="basis-1/6 min-w-[100px] text-center">{{ formatDate(transaction.created_at) }}</div>
                </div>
            </div>
            <div class="w-full flex justify-center mt-4" v-if="visibleCount < transactions.length">
                <div class="flex justify-center">
                    <button @click="loadMore"
                        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">Load more</button>
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

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
    .trading-transactions-wrapper {
        padding: 15px;
    }

    .trade-block-title {
        font-size: 1.2rem !important;
        margin-bottom: 15px !important;
    }

    .stocks-filters-wrapper {
        font-size: 0.8rem !important;
        padding: 8px 12px !important;
    }

    .stock-item {
        font-size: 0.8rem !important;
        padding: 8px 12px !important;
        flex-wrap: wrap;
        gap: 6px;
    }

    .stock-item>div {
        min-width: auto !important;
        flex: 1;
        text-align: center;
    }

    .stock-item>div:first-child,
    .stock-item>div:nth-child(2) {
        flex-basis: 50%;
        text-align: left;
    }

    .stock-item>div:first-child {
        font-weight: bold;
    }
}

@media screen and (max-width: 480px) {
    .trading-transactions-wrapper {
        padding: 10px;
    }

    .trade-block-title {
        font-size: 1.1rem !important;
        margin-bottom: 12px !important;
    }

    .stocks-filters-wrapper {
        font-size: 0.7rem !important;
        padding: 6px 8px !important;
    }

    .stock-item {
        font-size: 0.7rem !important;
        padding: 6px 8px !important;
    }
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { computed, onMounted, reactive, ref } from 'vue';

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
const visibleCount = ref(5);

const visibleTransactions = computed(() => transactions.slice(0, visibleCount.value));

function loadMore() {
    visibleCount.value += 5;
}

onMounted(async () => {
    try {
        const response = await apiClient.getUserTransactions()
        transactions.splice(0, transactions.length, ...response)
    } catch (err) {
        console.warn(err)
    }

    console.log(transactions)
})

</script>