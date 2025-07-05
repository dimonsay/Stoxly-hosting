<template>
    <div class="trading-transactions-wrapper page-tile dashboard-tile">
        <div class="trade-block-title text-xl font-semibold mb-10">Transactions</div>

        <!-- <div class="transactions-wrapper">
            <div class="transaction-item grid grid-cols-5 p-2 gap-2">
                <div class="transaction-type">Type</div>
                <div class="transaction-quantity">Quantity</div>
                <div class="transaction-price">Price</div>
                <div class="transaction-total">Total</div>
                <div class="transaction-time">Time</div>
            </div>
            <div class="transaction-item grid grid-cols-5 p-2 text-center" v-for="transaction in transactions">
                <div class="transaction-type text-left">{{ transaction.type }}</div>
                <div class="transaction-quantity">{{ Math.floor(transaction.quantity) }}</div>
                <div class="transaction-price">{{ transaction.price }}</div>
                <div class="transaction-total">{{ transaction.total }}</div>
                <div class="transaction-time">{{ formatDate(transaction.created_at) }}</div>
            </div>
        </div> -->

        <table class="border w-full">
            <thead class="text-xl">
                <tr class=" ">
                    <th class="border border-gray-500 transaction-type p-2">Type</th>
                    <th class="border border-gray-500 transaction-asset">Symbol</th>
                    <th class="border border-gray-500 transaction-quantity">Quantity</th>
                    <th class="border border-gray-500 transaction-price">Price</th>
                    <th class="border border-gray-500 transaction-total">Total</th>
                    <th class="border border-gray-500 transaction-time">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" class="pointer hover:bg-sky-600  text-center text-semibold">
                    <td class="border border-gray-500 transaction-type p-3">{{
                        capitalize(transaction.type) }}</td>
                    <td class="border border-gray-500  transaction-quantity">{{ transaction.asset.symbol }}</td>
                    <td class="border border-gray-500  transaction-quantity">{{ Math.floor(transaction.quantity) }}</td>
                    <td class="border border-gray-500 transaction-price">${{ transaction.price }}</td>
                    <td class="border border-gray-500  transaction-total">${{ transaction.total }}</td>
                    <td class="border border-gray-500  transaction-time">{{ formatDate(transaction.created_at) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

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

        console.log(transactions)
    } catch (err) {
        console.warn(err)
    }
})

</script>