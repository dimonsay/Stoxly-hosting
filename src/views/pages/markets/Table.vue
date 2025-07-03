<template>
    <div class="table-wrapper">
        <div class="container">
            <div class="top-wrapper ">
                <div class="table-title-wrapper flex justify-between" style="align-items: center !important;">
                    <div class="block-title">Stock Market Table</div>
                    <IconField style="display: flex; align-items: center;">
                        <InputIcon class="pi pi-search" style="position: absolute; left: 10px;" />
                        <InputText v-model="search" type="text" autocomplete="off" placeholder="Search stocks..."
                            class="block mb-5" @blur="validateUsername(search)" :class="{ 'error-border': search }"
                            style="max-width: 320px; min-width: 270px; padding-left: 40px;" />
                    </IconField>
                </div>

            </div>
            <div class="stocks-wrapper">
                <div class="stocks-filters-wrapper flex justify-between">
                    <div class="filter-name filter">Name</div>
                    <div class="filter-symbol filter">Symbol</div>
                    <div class="filter-open	 filter">Open</div>
                    <div class="filter-volume filter">Volume</div>
                    <div class="filter-change filter">Change</div>
                    <div class="filter-change-percentage filter">Change %</div>
                </div>

                <div class="stocks-data-wrapper">
                    <div class="stock-item flex justify-between" v-for="stock in stocks">
                        <div class="stock-name">{{ stock.name }}</div>
                        <div class="stock-symbol">{{ stock.symbol }}</div>
                        <div class="stock-open">${{ stock.open }}</div>
                        <div class="stock-volume" style="text-align: center;">{{ formatVolume(stock.volume) }}</div>
                        <div class="stock-change flex" style="justify-content: center; align-items: center;"
                            :class="{ 'red': stock.changePerchentage < 0, 'green': stock.changePerchentage > 0 }">
                            <i class="pi pi-arrow-up arrow" :class="{ 'hidden': stock.changePerchentage < 0 }"></i>
                            <i class="pi pi-arrow-down arrow" :class="{ 'hidden': stock.changePerchentage > 0 }"></i>
                            {{ stock.change }}
                        </div>
                        <div class="stock-change-percentage flex"
                            :class="{ 'red': stock.changePerchentage < 0, 'green': stock.changePerchentage > 0 }">
                            <div class="plus" :class="{ 'hidden': stock.changePerchentage < 0 }">+</div>
                            {{ stock.changePerchentage }} %
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-tiles-wrapper flex justify-between" style="align-items: center;">
                <div class="flex justify-between" style="flex-direction: column; min-width: 270px; min-height: 300px;"
                    :class="['page-tile', tile.name], 'flex'" v-for="tile in tiles">
                    <div class="tile-name">{{ tile.name }}</div>
                    <div class="tile-description">{{ tile.description }}</div>
                    <div class="data-wrapper flex justify-between" style="flex-direction: column;">
                        <div class="data-name" v-for="data in tile.data" style="color: #33c3f0;">{{ data.name }} ({{
                            data.symbol }})</div>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script setup>
import { reactive } from 'vue';


const search = reactive('')
const stocks = reactive([
    { name: 'Apple Inc.', symbol: 'AAPL', open: 185.78, volume: 54321000, change: 1.64, changePerchentage: 0.88 },
    { name: 'Microsoft Corporation', symbol: 'MSFT', open: 415.25, volume: 23456123, change: 2.73, changePerchentage: 0.66 },
    { name: 'Amazon.com Inc.', symbol: 'AMZN', open: 177.98, volume: 32458000, change: 1.33, changePerchentage: -0.75 },
    { name: 'Alphabet Inc.', symbol: 'GOOGL', open: 151.78, volume: 18763000, change: 0.65, changePerchentage: 0.43 },
    { name: 'Tesla Inc.', symbol: 'TSLA', open: 224.32, volume: 45000000, change: 5.76, changePerchentage: -2.57 },
    { name: 'NVIDIA Corporation', symbol: 'NVDA', open: 878.45, volume: 29876943, change: 14.09, changePerchentage: 1.60 },
    { name: 'Meta Platforms Inc.', symbol: 'META', open: 458.76, volume: 15432000, change: 5.56, changePerchentage: 1.21 },
    { name: 'Berkshire Hathaway Inc.', symbol: '	BRK.B	', open: 405.32, volume: 3599000, change: 1.55, changePerchentage: 0.38 }
])

const tiles = reactive([
    {
        name: 'Stocks', description: 'Buy and sell shares of top public companies from markets around the world.', data: [
            { name: 'Apple', symbol: 'AAPL' },
            { name: 'Microsoft', symbol: 'MSFT' },
            { name: 'Tesla', symbol: 'TSLA' }
        ]
    },
    {
        name: 'ETFs', description: 'Invest in diversified portfolios with easy-to-trade exchangetraded funds.', data: [
            { name: 'Apple', symbol: 'AAPL' },
            { name: 'Microsoft', symbol: 'MSFT' },
            { name: 'Tesla', symbol: 'TSLA' }
        ]
    },
    {
        name: 'Cryptocurrencies', description: 'Buy and sell popular digital assets built on blockchain technolog.', data: [
            { name: 'Apple', symbol: 'AAPL' },
            { name: 'Microsoft', symbol: 'MSFT' },
            { name: 'Tesla', symbol: 'TSLA' }
        ]
    },
    {
        name: 'Commodities', description: 'Trade essential raw materials like gold, oil, and more.', data: [
            { name: 'Apple', symbol: 'AAPL' },
            { name: 'Microsoft', symbol: 'MSFT' },
            { name: 'Tesla', symbol: 'TSLA' }
        ]
    },
    {
        name: 'Forex', description: 'Exchange global currencies on the world’s largest financial market.', data: [
            { name: 'Apple', symbol: 'AAPL' },
            { name: 'Microsoft', symbol: 'MSFT' },
            { name: 'Tesla', symbol: 'TSLA' }
        ]
    },
    {
        name: 'Bonds', description: 'Invest in stable debt securities from governments and companies.', data: [
            { name: 'Apple', symbol: 'AAPL' },
            { name: 'Microsoft', symbol: 'MSFT' },
            { name: 'Tesla', symbol: 'TSLA' }
        ]
    },
])

const formatVolume = (volume) => {
    return volume.toLocaleString('en-US');
};


</script>

<style scoped>
.data-wrapper {
    min-height: 100px;
}

.data-name {
    font-size: 16px;
    font-weight: 600;
}

.tile-name {
    font-size: 1.6rem;
    font-weight: bold;
}

.tile-description {
    font-size: 16px;
    color: #D1D5DB;
}

.page-tiles-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    margin-top: 5%;
}

.stock-item:hover {
    cursor: pointer;
    background-color: #252a36;
    transition: ease-in-out 0.15s;
}

.arrow {
    font-size: 10px;
}

.filter {
    font-weight: bold;
    font-size: 16px;
}

.stock-item {
    padding: 10px 20px;
    border-bottom: 1px solid #1d283a;
    font-size: 15px;
}

.filter-name,
.stock-name {
    width: 20%;
}

.stock-symbol {
    color: #33c3f0;
}

.filter-symbol,
.stock-symbol {
    width: 10%;
}

.filter-last-price,
.stock-last-price {
    width: 15%;
}

.filter-volume,
.stock-volume {
    text-align: center;
    width: 20%;
}

.filter-change,
.stock-change {
    text-align: center;
    width: 10%;
}

.filter-change-percentage,
.stock-change-percentage {
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 10%;
}

.stocks-filters-wrapper {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #161a23;
    border-bottom: 1px solid #1d283a;
}

.block-title {
    font-size: 30px;
}

.p-inputicon {
    margin-top: calc(-2.3 * (var(--p-icon-size) / 2));
}
</style>