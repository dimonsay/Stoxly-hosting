<template>
    <Title title="About Stoxly"
        description="Our mission is to make global investments accessible to everyone through a secure and intuitive platform"
        class="block" />
    <About class="block" />
</template>

<script setup>
import Title from '../uikit/Title.vue';
import About from './about/About.vue';

</script>

<style scoped>
.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>