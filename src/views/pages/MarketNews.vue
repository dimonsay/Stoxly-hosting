<template>
    <Title title="Market News" description="Stay informed with the latest financial news, market trends, and analysis"
        class="block" />
    <MarketNews class="block" />
</template>

<style scoped>
.block {
    padding: 5% 0;
}

.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>

<script setup>
import Title from '../uikit/Title.vue';
import MarketNews from './markets-news/MarketNews.vue';

</script>