<template>
    <Title title="Global Markets"
        description="Discover thousands of investment opportunities across a variety of assets and worldwide exchanges."
        class="block" />
    <Table class="block" />
</template>

<style scoped>
.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>

<script setup>
import Title from '../uikit/Title.vue';
import Table from './markets/Table.vue';

</script>