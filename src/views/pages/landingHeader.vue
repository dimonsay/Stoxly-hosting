<template>
    <div class="header-content-wrapper">
        <header class="header">
            <!-- Desktop header -->
            <div class="header-nav flex align-items-center justify-between items-center container desktop-header">
                <div class="logo-wrapper">
                    <div class="flex logo-container align-items-center items-center" @click="toHome">
                        <img :src="`/layout/images/logo/logo-${logo()}.png`" class="login-logo" style="width: 45px" />
                        <div class="login-appname ml-4  font-bold">
                            <div class="name text-xl" style="text-align: left;">Stoxly</div>
                        </div>
                    </div>
                </div>
                <div class="nav-wrapper" style="width: 60%;">
                    <div class="nav-container flex align-items-center justify-around"
                        style="align-items: center !important;">
                        <div class="nav-item title" @click="toMarket">Markets</div>
                        <div class="nav-item title" @click="toHelp">Help Center</div>
                        <div class="nav-item title" @click="toAbout">About Us</div>
                        <div class="nav-item invest-btn" @click="toAuth">Invest</div>
                    </div>
                </div>
            </div>
            <!-- Mobile header -->
            <div class="mobile-header container">
                <div class="mobile-header-top flex justify-between align-items-center">
                    <div class="flex logo-container align-items-center items-center" @click="toHome">
                        <img :src="`/layout/images/logo/logo-${logo()}.png`" class="login-logo" style="width: 35px" />
                        <div class="login-appname ml-3 font-bold">
                            <div class="name" style="text-align: left; font-size: 18px;">Stoxly</div>
                        </div>
                    </div>
                    <div class="nav-item invest-btn" @click="toAuth" style="margin-left: 12px;">Invest</div>
                </div>
                <div class="mobile-header-nav flex justify-between align-items-center">
                    <div class="nav-item title" @click="toMarket">Markets</div>
                    <div class="nav-item title" @click="toHelp">Help Center</div>
                    <div class="nav-item title" @click="toAbout">About Us</div>
                </div>
            </div>
            <div class="stocks-animation-wrapper" @mouseenter="pauseAnimation" @mouseleave="resumeAnimation">
                <div class="stocks-animation flex" :style="{
                    'animation-duration': animationDuration + 's',
                    'animation-play-state': animationState
                }">
                    <div class="stocks-item flex" v-for="(stock, index) in stocks" :key="index">
                        <div class="stock-title text-semibold">{{ stock.symbol }} ${{ Number(stock.price_buy).toFixed(2)
                        }}
                        </div>
                        <div class="arrow green" :class="{ 'hidden': stock.change_percent < 0 }">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div class="arrow red" :class="{ 'hidden': stock.change_percent > 0 }">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div class="price"
                            :class="{ 'red': stock.change_percent < 0, 'green': stock.change_percent > 0 }">
                            {{ stock.change_percent > 0 ? '+' : '' }}{{ stock.change_percent }}%
                        </div>
                    </div>
                    <div class="stocks-item flex" v-for="(stock, index) in stocks" :key="'dup-' + index">
                        <div class="stock-title text-semibold">{{ stock.symbol }} ${{ Number(stock.price_buy).toFixed(2)
                            }}
                        </div>
                        <div class="arrow green" :class="{ 'hidden': stock.change_percent < 0 }">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div class="arrow red" :class="{ 'hidden': stock.change_percent > 0 }">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div class="price"
                            :class="{ 'red': stock.change_percent < 0, 'green': stock.change_percent > 0 }">
                            {{ stock.change_percent > 0 ? '+' : '' }}{{ stock.change_percent }}%
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>


<script setup>
import apiClient from '@/api/axios';
import { useLayout } from '@/layout/composables/layout';
import router from '@/router';
import { computed, onMounted, reactive, ref } from 'vue';

const { isDarkTheme } = useLayout();

const baseAnimationDuration = 30
const animationDuration = computed(() => {
    return stocks.length * (baseAnimationDuration / 16)
})

const animationState = ref('running')

const pauseAnimation = () => {
    animationState.value = 'paused'
}

const resumeAnimation = () => {
    animationState.value = 'running'
}

const stocks = reactive([])

onMounted(async () => {
    try {
        const response = await apiClient.searchAssets('', 'stocks', 20)

        stocks.splice(0, stocks.length, ...response)
    } catch (err) {
        console.warn(err)
    }
})



function toMarket() {
    router.push({
        name: 'markets',
    })
}

function toHome() {
    router.push({
        path: '/',
    })
}

function toAuth() {
    router.push({
        name: 'register',
    })
}

function toAbout() {
    router.push({
        name: 'about',
    })
}

function toHelp() {
    router.push({
        name: 'help',
    })
}

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}

</script>

<style>
header {
    position: sticky;
    top: 0;
    z-index: 999;
    border-bottom: 1px solid #1d283a;
    backdrop-filter: blur(5px);
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.stocks-animation-wrapper {
    border-top: 1px solid #1d283a;
    padding: 5px 0;
    font-size: 2vh;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.stocks-animation {
    display: inline-flex;
    white-space: nowrap;
    animation: scrollStocks linear infinite;
    animation-play-state: var(--animation-state);
}

@keyframes scrollStocks {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.stocks-item * {
    margin-right: 8px;
}

.arrow {
    margin-right: 3px !important;
    font-size: 1rem;
    align-items: center;
}

.fa-arrow {
    margin-right: 0 !important;
}

.stocks-item {
    align-items: center;
    letter-spacing: normal;
    font-weight: 300;
    margin-right: 10px;
    user-select: none;
}

.header-nav {
    padding: 10px 5px;
}

.nav-item {
    font-size: 16px;
    font-weight: bold;
}

.title:hover {
    color: #33c3f0;
}

.nav-item:hover,
.logo-container:hover {
    cursor: pointer;
}

.invest-btn {
    border-radius: 8px;
    background-color: #33c3f0;
    width: 200px;
    padding: 10px 20px;
    text-align: center;
    transition: all 0.3s ease;
}

.invest-btn:hover {
    color: #33c3f0;
    background-color: transparent;
    outline: 1px solid #33c3f0;
    box-shadow: 0em 0 0.6em #33c3f0;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
    .header-nav {
        padding: 8px 5px;
    }

    .nav-wrapper {
        width: 70% !important;
    }

    .nav-item {
        font-size: 14px;
    }

    .invest-btn {
        width: 120px;
        padding: 8px 12px;
        font-size: 14px;
    }

    .login-logo {
        width: 35px !important;
    }

    .login-appname .name {
        font-size: 18px !important;
    }

    .stocks-animation-wrapper {
        font-size: 2.5vh;
        min-height: 40px;
        height: 40px;
    }

    .stocks-item {
        margin-right: 8px;
    }

    .stocks-item * {
        margin-right: 6px;
    }
}

@media (max-width: 480px) {
    .header-nav {
        padding: 6px 5px;
    }

    .nav-wrapper {
        width: 80% !important;
    }

    .nav-item {
        font-size: 12px;
    }

    .invest-btn {
        width: 100px;
        padding: 6px 10px;
        font-size: 12px;
    }

    .login-logo {
        width: 30px !important;
    }

    .login-appname .name {
        font-size: 16px !important;
    }

    .stocks-animation-wrapper {
        font-size: 2.2vh;
        min-height: 36px;
        height: 36px;
    }

    .stocks-item {
        margin-right: 6px;
    }

    .stocks-item * {
        margin-right: 4px;
    }
}

/* Increase top padding for landing page */
.header-content-wrapper {
    padding-top: 20px;
}

@media (max-width: 768px) {
    .header-content-wrapper {
        padding-top: 15px;
    }
}

@media (max-width: 480px) {
    .header-content-wrapper {
        padding-top: 10px;
    }
}

.desktop-header {
    display: flex;
}

.mobile-header {
    display: none;
}

@media (max-width: 768px) {
    .desktop-header {
        display: none !important;
    }

    .mobile-header {
        display: block !important;
    }

    .mobile-header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
    }

    .mobile-header-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0 0 0;
        gap: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .mobile-header .nav-item {
        font-size: 14px;
        font-weight: bold;
        padding: 0;
    }

    .mobile-header .invest-btn {
        width: 100px;
        padding: 6px 10px;
        font-size: 12px;
    }

    .mobile-header .login-logo {
        width: 30px !important;
    }

    .mobile-header .login-appname .name {
        font-size: 16px !important;
    }
}
</style>
