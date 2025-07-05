<template>
    <div class="header-content-wrapper">
        <header class="header">
            <div class="header-nav flex align-items-center justify-between items-center container">
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

            <div class="stocks-animation-wrapper" @mouseenter="pauseAnimation" @mouseleave="resumeAnimation">
                <div class="stocks-animation flex" :style="{
                    'animation-duration': animationDuration + 's',
                    'animation-play-state': animationState
                }">
                    <div class="stocks-item flex" v-for="(stock, index) in stocks" :key="index">
                        <div class="stock-title">{{ stock.title }} ${{ stock.price }}</div>
                        <div class="arrow green" :class="{ 'hidden': stock.trend < 0 }">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div class="arrow red" :class="{ 'hidden': stock.trend > 0 }">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div class="price" :class="{ 'red': stock.trend < 0, 'green': stock.trend > 0 }">
                            {{ stock.trend > 0 ? '+' : '' }}{{ stock.trend }}%
                        </div>
                    </div>
                    <div class="stocks-item flex" v-for="(stock, index) in stocks" :key="'dup-' + index">
                        <div class="stock-title">{{ stock.title }} ${{ stock.price }}</div>
                        <div class="arrow green" :class="{ 'hidden': stock.trend < 0 }">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <div class="arrow red" :class="{ 'hidden': stock.trend > 0 }">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                        </div>
                        <div class="price" :class="{ 'red': stock.trend < 0, 'green': stock.trend > 0 }">
                            {{ stock.trend > 0 ? '+' : '' }}{{ stock.trend }}%
                        </div>
                    </div>
                </div>
            </div>

        </header>
    </div>
</template>


<script setup>
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

const stocks = reactive([
    { title: 'AAPL', trend: '', price: '278' },
    { title: 'QBTS', trend: '', price: '172' },
    { title: 'BBD', trend: '', price: '54' },
    { title: 'NVDA', trend: '', price: '89' },
    { title: 'PLTR', trend: '', price: '102' },
    { title: 'F', trend: '', price: '201' },
    { title: 'TSLA', trend: '', price: '274' },
    { title: 'HIMS', trend: '', price: '37' },
    { title: 'LCID', trend: '', price: '15' },
    { title: 'WBD', trend: '', price: '28' },
    { title: 'RGTI', trend: '', price: '72' },
    { title: 'INTC', trend: '', price: '99' },
    { title: 'AAL', trend: '', price: '45' },
    { title: 'NU', trend: '', price: '23' },
    { title: 'CLF', trend: '', price: '75' },
    { title: 'AMD', trend: '', price: '109' },
])

onMounted(() => {
    for (let i = 0; i < stocks.length; i++) {
        stocks[i].trend = (Math.random() * 10 - 5).toFixed(2)
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
</style>
