<template>
    <div class="trading-wallet-wrapper page-tile dashboard-tile">
        <div class="trade-block-title text-xl font-semibold mb-10">Deposit History</div>
        <div class="wallet-wrapper">
            <!-- Desktop Table -->
            <div class="hidden md:block">
                <DataTable :value="visibleDeposits" :rows="visibleDeposits.length" class="wallet-table"
                    responsiveLayout="scroll" tableStyle="table-layout: fixed; width: 100%;">
                    <Column field="masked_card_number" header="Card" style="width: 160px"
                        bodyStyle="padding: 10px 16px; text-align:left;"
                        headerStyle="text-align:left; padding: 10px 16px;">
                        <template #body="{ data }">
                            {{ formatCardNumber(data.masked_card_number) }}
                        </template>
                    </Column>
                    <Column field="amount" header="Amount" style="width: 120px"
                        bodyStyle="padding: 10px 16px; text-align:left;"
                        headerStyle="text-align:left; padding: 10px 16px;">
                        <template #body="{ data }">
                            ${{ formatAmount(data.amount) }}
                        </template>
                    </Column>
                    <Column field="status" header="Status" style="width: 120px"
                        bodyStyle="padding: 10px 16px; text-align:left;"
                        headerStyle="text-align:left; padding: 10px 16px;">
                        <template #body="{ data }">
                            <span :class="getStatusClass(data.status)">{{ capitalize(data.status) }}</span>
                        </template>
                    </Column>
                    <Column field="created_at" header="Date" style="width: 160px"
                        bodyStyle="padding: 10px 16px; text-align:left;"
                        headerStyle="text-align:left; padding: 10px 16px;">
                        <template #body="{ data }">
                            {{ formatDate(data.created_at) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <!-- Mobile Cards -->
            <div class="block md:hidden">
                <div v-for="deposit in visibleDeposits" :key="deposit.id"
                    class="mobile-wallet-card mb-4 p-3 rounded bg-[#161a23] border border-blue-500 text-white">
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Card:</span>
                        <span>{{ formatCardNumber(deposit.masked_card_number) }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Amount:</span>
                        <span>${{ formatAmount(deposit.amount) }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Status:</span>
                        <span :class="getStatusClass(deposit.status)">{{ capitalize(deposit.status) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Date:</span>
                        <span>{{ formatDate(deposit.created_at) }}</span>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center mt-4" v-if="visibleCount < deposits.length">
                <div class="flex justify-center">
                    <button @click="loadMore"
                        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">Load
                        more</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
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

<style scoped>
.wallet-table ::v-deep(.p-datatable-thead > tr > th) {
    background: #161a23;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    border-bottom: 2px solid #3b82f6;
    text-align: left;
    padding: 10px 16px !important;
}

.wallet-table ::v-deep(.p-datatable-tbody > tr > td) {
    padding: 10px 16px !important;
}

.wallet-table ::v-deep(.p-datatable-tbody > tr) {
    transition: ease-in-out 0.15s;
    background: transparent;
    border-bottom: 1px solid #3b82f6;
    color: #fff;
    font-size: 1.125rem;
}

.wallet-table ::v-deep(.p-datatable-tbody > tr:hover) {
    background: #0284c7 !important;
}

.wallet-table ::v-deep(.p-datatable) {
    background: transparent;
}

.mobile-wallet-card {
    box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.08);
    font-size: 1rem;
}

@media screen and (max-width: 768px) {
    .trading-wallet-wrapper {
        padding: 15px;
    }

    .trade-block-title {
        font-size: 1.2rem !important;
        margin-bottom: 15px !important;
    }

    .wallet-table ::v-deep(.p-datatable-thead > tr > th) {
        font-size: 0.9rem !important;
        padding: 8px 12px !important;
    }

    .wallet-table ::v-deep(.p-datatable-tbody > tr) {
        font-size: 0.9rem !important;
        padding: 8px 12px !important;
        flex-wrap: wrap;
        gap: 8px;
    }

    .wallet-table ::v-deep(.p-datatable-tbody > tr > td) {
        min-width: auto !important;
        flex: 1;
        text-align: left;
    }

    .mobile-wallet-card {
        font-size: 0.9rem;
        padding: 10px 8px;
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

    .wallet-table ::v-deep(.p-datatable-thead > tr > th) {
        font-size: 0.8rem !important;
        padding: 6px 8px !important;
    }

    .wallet-table ::v-deep(.p-datatable-tbody > tr) {
        font-size: 0.8rem !important;
        padding: 6px 8px !important;
    }

    .mobile-wallet-card {
        font-size: 0.8rem;
        padding: 8px 4px;
    }
}
</style>