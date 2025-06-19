<template>
    <Title title="Investment Guides"
        description="Comprehensive resources to help you build investment knowledge and improve your trading strategies"
        class="block" />
    <Guides class="block" />
</template>

<script setup>
import Title from '../uikit/Title.vue';
import Guides from './guides/Guides.vue';
</script>

<style scoped>
.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>