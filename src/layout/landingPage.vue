<template>
    <div class="landing-main-page-wrapper">
        <landingHeader class="sticky-header" />

        <div class="layout-content-wrapper">
            <div class="layout-content">
                <router-view></router-view>
            </div>
        </div>

        <landingFooter />
    </div>
</template>

<style></style>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import LandingFooter from '@/views/pages/LandingFooter.vue';
import landingHeader from '@/views/pages/landingHeader.vue';
import { onBeforeUnmount, onMounted } from 'vue';

const { watchSidebarActive, unbindOutsideClickListener } = useLayout();

onMounted(() => {
    watchSidebarActive();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

</script>
