<template>
    <div class="trading-wallet-wrapper page-tile dashboard-tile">
        <div class="trade-block-title text-xl font-semibold mb-10">Deposit History</div>
        <div class="wallet-wrapper">
            <div
                class="wallet-filters-wrapper flex justify-between border-b border-b-blue-500 px-4 py-2 bg-[#161a23] font-semibold text-lg text-white">
                <div class="basis-1/4 min-w-[120px]">Card</div>
                <div class="basis-1/4 min-w-[120px] text-center">Amount</div>
                <div class="basis-1/4 min-w-[120px] text-center">Status</div>
                <div class="basis-1/4 min-w-[120px] text-center">Date</div>
            </div>
            <div class="wallet-data-wrapper">
                <div class="wallet-item flex justify-between items-center border-b border-b-blue-500 hover:bg-sky-600 px-4 py-2 text-lg text-white pointer"
                    v-for="deposit in visibleDeposits" :key="deposit.id">
                    <div class="basis-1/4 min-w-[120px]">
                        <span class="wallet-label mobile-only">Card:</span>
                        {{ formatCardNumber(deposit.masked_card_number) }}
                    </div>
                    <div class="basis-1/4 min-w-[120px] text-center">
                        <span class="wallet-label mobile-only">Amount:</span>
                        ${{ formatAmount(deposit.amount) }}
                    </div>
                    <div class="basis-1/4 min-w-[120px] text-center">
                        <span class="wallet-label mobile-only">Status:</span>
                        <span :class="getStatusClass(deposit.status)">
                            {{ capitalize(deposit.status) }}
                        </span>
                    </div>
                    <div class="basis-1/4 min-w-[120px] text-center">
                        <span class="wallet-label mobile-only">Date:</span>
                        {{ formatDate(deposit.created_at) }}
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center mt-4" v-if="visibleCount < deposits.length">
                <div class="flex justify-center">
                    <button @click="loadMore"
                        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">Load more</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wallet-filters-wrapper {
    margin-top: 20px;
    background-color: #161a23;
}

.wallet-item {
    transition: ease-in-out 0.15s;
}

.wallet-label {
    display: none;
    font-size: 0.85em;
    color: #8ca0b3;
    font-weight: 500;
    margin-right: 4px;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
    .trading-wallet-wrapper {
        padding: 15px;
    }

    .trade-block-title {
        font-size: 1.2rem !important;
        margin-bottom: 15px !important;
    }

    .wallet-filters-wrapper {
        font-size: 0.9rem !important;
        padding: 8px 12px !important;
        display: none !important;
    }

    .wallet-item {
        font-size: 0.9rem !important;
        padding: 8px 12px !important;
        flex-wrap: wrap;
        gap: 8px;
    }

    .wallet-item>div {
        min-width: 50% !important;
        flex: 1 1 50%;
        text-align: left;
        margin-bottom: 2px;
    }

    .wallet-item>div:first-child {
        flex-basis: 100%;
        text-align: left;
        font-weight: bold;
        margin-bottom: 4px;
    }
}

@media screen and (max-width: 480px) {
    .trading-wallet-wrapper {
        padding: 10px;
    }

    .trade-block-title {
        font-size: 1.1rem !important;
        margin-bottom: 12px !important;
    }

    .wallet-filters-wrapper {
        font-size: 0.8rem !important;
        padding: 6px 8px !important;
    }

    .wallet-item {
        font-size: 0.8rem !important;
        padding: 6px 8px !important;
    }
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { computed, onMounted, reactive, ref } from 'vue';

const deposits = reactive([]);
const visibleCount = ref(5);

const visibleDeposits = computed(() => deposits.slice(0, visibleCount.value));

function loadMore() {
    visibleCount.value += 5;
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatAmount = (amount) => {
    return Number(amount).toFixed(2);
};

function getStatusClass(status) {
    switch (status) {
        case 'pending':
            return 'text-orange-400';
        case 'confirmed':
            return 'text-green-400';
        case 'cancelled':
            return 'text-red-400';
        default:
            return '';
    }
}

function formatCardNumber(masked) {
    if (!masked) return '';
    const last4 = masked.slice(-4);
    return `**** ${last4}`;
}

onMounted(async () => {
    try {
        const response = await apiClient.getDepositWithdrawalHistory();
        if (response && response.deposits) {
            deposits.splice(0, deposits.length, ...response.deposits);
        }
    } catch (err) {
        console.warn(err);
    }
});
</script>