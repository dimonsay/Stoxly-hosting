<template>
    <Title title="Our Mission"
        description="At Stoxly, we believe that investing shouldn’t be reserved for
the few — it should be a possibility for everyone. Our mission is
to break down the barriers that stand between people and
global financial markets. Whether someone is just starting out
or already experienced, we want to provide a platform where
they can feel safe, informed, and fully in control of their
investments.
To do this, we’ve built a secure and intuitive platform that’s
accessible, transparent, and human - centered. But we go
beyond the tools. What drives us most is the belief that
investing works best when it’s supported by real relationships
— by people who listen, care, and guide each other.
We are here not only to simplify the act of investing, but to help
people feel confident and connected as they do it."
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