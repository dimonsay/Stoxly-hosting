<template>
    <div class="trading-transactions-wrapper page-tile dashboard-tile">
        <div class="trade-block-title text-xl font-semibold mb-10">Transactions</div>
        <div class="stocks-wrapper">
            <!-- Desktop Table -->
            <div class="hidden md:block">
                <DataTable :value="visibleTransactions" :rows="visibleTransactions.length" class="transactions-table"
                    responsiveLayout="scroll" tableStyle="table-layout: fixed; width: 100%;">
                    <Column field="type" header="Type" style="width: 120px"
                        bodyStyle="padding: 10px 0; text-align:left;" headerStyle="text-align:left;">
                        <template #body="{ data }">
                            {{ capitalize(data.type) }}
                        </template>
                    </Column>
                    <Column field="asset.symbol" header="Symbol" style="width: 120px"
                        bodyStyle="padding: 10px 0; text-align:left;" headerStyle="text-align:left;">
                        <template #body="{ data }">
                            <span>{{ data.asset.symbol }}</span>
                        </template>
                    </Column>
                    <Column field="quantity" header="Quantity" style="width: 120px"
                        bodyStyle="padding: 10px 0; text-align:left;" headerStyle="text-align:left;">
                        <template #body="{ data }">
                            {{ Math.floor(data.quantity) }}
                        </template>
                    </Column>
                    <Column field="price" header="Price" style="width: 120px"
                        bodyStyle="padding: 10px 0; text-align:left;" headerStyle="text-align:left;">
                        <template #body="{ data }">
                            ${{ data.price }}
                        </template>
                    </Column>
                    <Column field="total" header="Total" style="width: 120px"
                        bodyStyle="padding: 10px 0; text-align:left;" headerStyle="text-align:left;">
                        <template #body="{ data }">
                            ${{ data.total }}
                        </template>
                    </Column>
                    <Column field="created_at" header="Date" style="width: 160px"
                        bodyStyle="padding: 10px 0; text-align:left;" headerStyle="text-align:left;">
                        <template #body="{ data }">
                            {{ formatDate(data.created_at) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <!-- Mobile Cards -->
            <div class="block md:hidden">
                <div v-for="transaction in visibleTransactions" :key="transaction.id"
                    class="mobile-transaction-card mb-4 p-3 rounded bg-[#161a23] border border-blue-500 text-white">
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Type:</span>
                        <span>{{ capitalize(transaction.type) }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Symbol:</span>
                        <span class="text-blue-400">{{ transaction.asset.symbol }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Quantity:</span>
                        <span>{{ Math.floor(transaction.quantity) }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Price:</span>
                        <span>${{ transaction.price }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Total:</span>
                        <span>${{ transaction.total }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Date:</span>
                        <span>{{ formatDate(transaction.created_at) }}</span>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center mt-4" v-if="visibleCount < transactions.length">
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
})
</script>

<style scoped>
.stocks-filters-wrapper {
    margin-top: 20px;
    background-color: #161a23;
}

.transactions-table ::v-deep(.p-datatable-thead > tr > th) {
    background: #161a23;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    border-bottom: 2px solid #3b82f6;
    text-align: left;
    padding: 10px 16px !important;
}

.transactions-table ::v-deep(.p-datatable-tbody > tr > td) {
    padding: 10px 16px !important;
}

.transactions-table ::v-deep(.p-datatable-tbody > tr) {
    transition: ease-in-out 0.15s;
    background: transparent;
    border-bottom: 1px solid #3b82f6;
    color: #fff;
    font-size: 1.125rem;
}

.transactions-table ::v-deep(.p-datatable-tbody > tr:hover) {
    background: #0284c7 !important;
}

.transactions-table ::v-deep(.p-datatable) {
    background: transparent;
}

.mobile-transaction-card {
    box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.08);
    font-size: 1rem;
}

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

    .transactions-table ::v-deep(.p-datatable-tbody > tr) {
        font-size: 0.8rem !important;
        padding: 8px 12px !important;
        flex-wrap: wrap;
        gap: 6px;
    }

    .transactions-table ::v-deep(.p-datatable-tbody > tr > td) {
        min-width: auto !important;
        flex: 1;
        text-align: center;
    }

    .mobile-transaction-card {
        font-size: 0.9rem;
        padding: 10px 8px;
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

    .transactions-table ::v-deep(.p-datatable-tbody > tr) {
        font-size: 0.7rem !important;
        padding: 6px 8px !important;
    }

    .mobile-transaction-card {
        font-size: 0.8rem;
        padding: 8px 4px;
    }
}
</style>