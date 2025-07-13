<template>
    <MainBlock class="block" />
    <Security class="block" />
    <GlobalMarkets class="block" />
    <Invest class="block" />
    <Overwie class="block" />
    <About class="block" />
</template>

<script setup>
import GlobalMarkets from '@/views/pages/main/GlobalMarkets.vue';
import Invest from '@/views/pages/main/Invest.vue';
import About from './main/About.vue';
import MainBlock from './main/MainBlock.vue';
import Overwie from './main/Overwie.vue';
import Security from './main/Security.vue';
</script>

<style scoped>
.block {
    padding: 5% 0;
}

.block:nth-child(odd) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(even) {
    background-color: var(--even-bg-color, #1d283a);
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
    .block {
        padding: 3% 0;
    }
}

@media screen and (max-width: 480px) {
    .block {
        padding: 2% 0;
    }
}
</style>