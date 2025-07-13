<template>
    <div class="dashboard-wrapper">
        <!-- Мобильный header -->
        <div class="mobile-dashboard-header">
            <button class="mobile-header-btn" @click="showSidebar = true">
                <i class="fa fa-bars"></i> Menu
            </button>

            <button class="mobile-header-btn" @click="showWallet = true">
                <i class="fa fa-wallet"></i> Wallet
            </button>
        </div>

        <!-- Мобильный Sidebar Overlay -->
        <div v-if="showSidebar" class="mobile-sidebar-overlay">
            <button class="close-btn" @click="showSidebar = false">×</button>
            <div class="mobile-sidebar-center">
                <SideBar class="mobile-sidebar-content" @click="showSidebar = false" />
            </div>
        </div>

        <!-- Мобильный Wallet Overlay -->
        <div v-if="showWallet" class="mobile-wallet-overlay">
            <button class="close-btn" @click="showWallet = false">×</button>
            <Wallet class="mobile-wallet-content" :user="user" />
        </div>

        <!-- Мобильный контент -->
        <div class="mobile-dashboard-content p-5" v-if="!showSidebar && !showWallet">
            <router-view @update-balance="refreshUserData" :user="user"></router-view>
        </div>

        <div class="dashboard flex justify-around items-start desktop-dashboard">
            <SideBar class="pt-10 p-5" />
            <div class="container borders dashboard-container">
                <router-view @update-balance="refreshUserData" :user="user"></router-view>
            </div>
            <Wallet class="px-10 wallet-sticky" :user="user" />
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import SideBar from '@/views/uikit/SideBar.vue';
import Wallet from '@/views/uikit/Wallet.vue';
import { onMounted, reactive, ref } from 'vue';

const user = reactive({});
const showSidebar = ref(false);
const showWallet = ref(false);

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

/* Мобильный header и overlay */
.mobile-dashboard-header {
    display: none;
    background: rgba(22, 26, 35, 0.85);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 12px 0 rgba(51, 195, 240, 0.08);
    border-bottom: 1px solid #232b3a;
    padding: 14px 10px 10px 10px;
    min-height: 56px;
}

.mobile-header-btn {
    background: transparent;
    border: 1.5px solid #33c3f0;
    color: #fff;
    border-radius: 12px;
    font-size: 1.1rem;
    padding: 7px 18px;
    margin: 0 2px;
    transition: background 0.2s, color 0.2s, border 0.2s;
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: 600;
    box-shadow: 0 2px 8px 0 rgba(51, 195, 240, 0.04);
}

.mobile-header-btn:hover {
    background: #33c3f0;
    color: #161a23;
    border-color: #33c3f0;
}

.mobile-header-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.5px;
}

.mobile-sidebar-overlay,
.mobile-wallet-overlay {
    display: none;
}

.mobile-sidebar-overlay.active,
.mobile-wallet-overlay.active {
    display: flex;
}

.mobile-sidebar-overlay,
.mobile-wallet-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 20, 40, 0.98);
    z-index: 9999;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
}

.mobile-sidebar-content,
.mobile-wallet-content {
    width: 100vw;
    min-height: 100vh;
    background: none;
    padding: 30px 10px 10px 10px;
}

.close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 2rem;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    z-index: 10000;
}

.mobile-dashboard-content {
    display: none;
}

.mobile-sidebar-center {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 768px) {
    .desktop-dashboard {
        display: none !important;
    }

    .mobile-dashboard-header {
        display: flex !important;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .mobile-sidebar-overlay,
    .mobile-wallet-overlay {
        display: flex;
    }

    .mobile-dashboard-content {
        display: block !important;
        padding: 16px 0;
    }
}

@media (min-width: 769px) {

    .mobile-dashboard-header,
    .mobile-sidebar-overlay,
    .mobile-wallet-overlay,
    .mobile-dashboard-content {
        display: none !important;
    }
}
</style>
