<template>
    <Title title="Help Center" description="Get support and answers to your questions about using the Stoxly platform"
        class="block" />
    <Help class="block" />
</template>

<script setup>
import Title from '../uikit/Title.vue';
import Help from './help/Help.vue';
</script>

<style scoped>
.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>