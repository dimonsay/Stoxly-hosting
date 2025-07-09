<template>
    <div class="dashboard-wrapper">
        <div class="dashboard flex justify-around items-start">
            <SideBar class="pt-10 p-5" />
            <div class="container borders dashboard-container">
                <router-view @update-balance="refreshUserData"></router-view>
            </div>
            <Wallet class="p-10 wallet-sticky" :user="user" />
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import SideBar from '@/views/uikit/SideBar.vue';
import Wallet from '@/views/uikit/Wallet.vue';
import { onMounted, reactive } from 'vue';

const user = reactive({});

onMounted(async () => {
    try {
        const userData = await apiClient.getUser();
        Object.assign(user, userData);
    } catch (err) {
        console.error(err);
    }
});

async function refreshUserData() {
    try {
        const userData = await apiClient.getUser();
        Object.assign(user, userData);
    } catch (err) {
        console.error('Ошибка обновления данных пользователя', err);
    }
}
</script>

<style>
.dashboard-container {
    min-height: 100vh;
}

.bc-dark-grey {
    background-color: #374151;
}

.borders {
    border-right: 1px solid black;
    border-left: 1px solid black;
}

.container {
    padding: 30px;
}

.dashboard-wrapper {
    background-color: #161a23;
    min-height: 100vh;
}

.dashboard-title {
    font-size: 2rem;
    font-weight: bold;
}

.dashboard-tile {
    background-color: #1d283a !important;
}

.wallet-sticky {
    position: sticky;
    top: 20px;
    align-self: flex-start;
    z-index: 5;
}
</style>
