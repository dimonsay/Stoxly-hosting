<template>

    <div class="gloval-markets-wrapper">
        <div class="container">
            <div class="block-title">
                Discover Opportunities Worldwide
            </div>
            <div class="block-description">Invest easily in thousands of assets—from stocks to
                commodities—across global markets at your fingertips.</div>

            <div class="top-companies-wrapper flex justify-between">
                <div class="top-companies">
                    <div class="top-title">Top Companies This Week</div>
                    <div class="company-details-wrapper" v-for="company in companies">
                        <div class="company-details flex justify-between" style="align-items: center !important;">
                            <div class="company-title-wrapper">
                                <div class="companie-title">{{ company.name }}</div>
                                <div class="stock-name">{{ company.stock }}</div>
                            </div>
                            <div class="trend-wrapper flex"
                                :class="{ 'red': company.profit < 0, 'green': company.profit > 0 }">
                                <div class="trend">
                                    <div class="arrow" :class="{ 'hidden': company.profit > 0 }"><i
                                            class="fa-solid fa-arrow-trend-down"></i>
                                    </div>
                                    <div class="arrow" :class="{ 'hidden': company.profit < 0 }">
                                        <i class="fa-solid fa-arrow-trend-up"></i>
                                    </div>
                                </div>
                                <div class="profit"> {{ company.profit }} %</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="categories">
                    <div class="categories-title category-title">Categories</div>
                    <div class="categories-wrapper" v-for="category in categories">
                        <div class="category-name company-details" style="align-content: center !important; ">{{
                            category.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import apiClient from '@/api/axios';
import { onMounted, reactive } from 'vue';

const categories = reactive([
    { name: 'Stocks' },
    { name: 'ETFs' },
    { name: 'Bonds' },
    { name: 'Commodities' },
    { name: 'Forex' },
    { name: 'Crypto' },
])

const companies = reactive([
    { name: 'Apple Inc.', stock: 'AAPL', profit: '1' },
    { name: 'Microsoft Inc.', stock: 'MSFT', profit: '-1' },
    { name: 'Amazon.com Inc.', stock: 'AMZN', profit: '' },
    { name: 'Alphabet Inc.', stock: 'GOOGL', profit: '' },
    { name: 'Tesla Inc.', stock: 'TSLA', profit: '' },
    { name: 'Meta Inc.', stock: 'META', profit: '' },
])

onMounted(async () => {
    for (let i = 0; i < companies.length; i++) {
        companies[i].profit = (Math.random() * 10 - 5).toFixed(2)
    }

    getAssets()
})

async function getAssets() {
    const response = await apiClient.getAssetsMain()
    console.log(response)
}

</script>

<style scoped>
.profit {
    width: 70px;
    text-align: right;
}

.categories {
    height: 100%;
    width: 30%;
}

.top-companies-wrapper {
    margin-top: 40px;
}

.gloval-markets-wrapper {
    padding: 20px 0;
}

.trend {
    margin-right: 10px;
}

.red {
    color: #eb6c6d;
}

.green {
    color: green
}

.company-details {
    height: 64px;
    font-size: 14px;
    padding: 10px 20px;
    border: 1px solid #1d283a;
    background-color: #161a23;
}

.category-name {
    font-size: 18px;
}

.company-details:hover {
    cursor: pointer;
    background-color: #1a212e;
}

.category-title,
.top-title {
    font-size: 20px;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #1d283a;
    padding: 20px 20px;
}

.top-companies-wrapper {
    width: 100%;
}

.top-companies {
    width: 60%;
}
</style>