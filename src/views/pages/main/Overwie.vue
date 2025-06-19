<template>
    <div class="market-overwie-wrapper">
        <div class="container">
            <div class="market-overwie">
                <div class="title-wrapper">
                    <div class="block-title">Market Overwie</div>
                    <div class="block-description">Main indexes and their dinamic</div>
                </div>
                <div class="indexes-wrapper flex justify-between">
                    <div class="index" v-for="index in indexes" style="text-align: left;">
                        <div class="index-title">{{ index.title }}</div>
                        <div class="index-profit" :class="{ 'red': index.profit < 0, 'green': index.profit > 0 }">
                            {{ index.profit }} %</div>
                        <div class="profit-trend">

                        </div>

                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

const indexes = reactive([
    { title: 'S&P 500', profit: '1.23', dynamic: '' },
    { title: 'NASDAQ', profit: '1.87', dynamic: '' },
    { title: 'Dow Jones', profit: '-0.32', dynamic: '' }
])


onMounted(() => {
    for (let i = 0; i < indexes.length; i++) {
        indexes[i].profit = (Math.random() * 5 - 3).toFixed(2)
    }
})
</script>

<style scoped>
.red {
    color: #eb6c6d;
}

.green {
    color: green
}

.indexes-wrapper {
    margin-top: 40px;
}

.index {
    width: 30%;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #33c4f05b;
}

.index-title {
    font-weight: bold;
    font-size: 1.5rem;
}

.profit-trend {
    margin-top: 10px;
    height: 100px;
    background-color: green;
    border-radius: 4px;
}
</style>