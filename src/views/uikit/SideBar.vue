<template>
    <div class="sidebar-wrapper">
        <div class="name text-3xl font-bold pointer " style="text-align: center;">Stoxly</div>

        <div class="menu-navigation flex flex-col gap-1 text-1xl">
            <div class="menu-item flex pointer text-lg gap-2 items-center"
                :class="{ 'active-item': isActive('dashboard').value }" @click="goTo('dashboard')">
                <i class="pi pi-chart-line menu-item-logo text-3xl"></i>
                <div class="menu-item-title ">Dashboard</div>
            </div>
            <div class="menu-item flex pointer text-lg gap-2 items-center"
                :class="{ 'active-item': isActive('trade').value }" @click="goTo('trade')">
                <i class="fa-solid fa-arrow-trend-up menu-item-logo text-3xl"></i>
                <div class="menu-item-title  text-lg">Trade</div>
            </div>
            <div class="menu-item flex pointer text-lg gap-2 items-center"
                :class="{ 'active-item': isActive('portfolio').value }" @click="goTo('portfolio')">
                <i class="pi pi-chart-pie menu-item-logo text-3xl"></i>
                <div class="menu-item-title ">Portfolio</div>
            </div>
            <div class="menu-item flex pointer text-lg gap-2 items-center"
                :class="{ 'active-item': isActive('community').value }" @click="goTo('community')">
                <i class="pi pi-users menu-item-logo text-3xl"></i>
                <div class="menu-item-title ">Community</div>
            </div>
            <div class="menu-item flex pointer text-lg gap-2 items-center"
                :class="{ 'active-item': isActive('referrals').value }" @click="goTo('referrals')">
                <i class="pi pi-gift menu-item-logo text-3xl"></i>
                <div class="menu-item-title ">Referrals</div>
            </div>
            <div class="menu-item flex pointer text-lg gap-2 items-center"
                :class="{ 'active-item': isActive('profile').value }" @click="goTo('profile')">
                <i class="pi pi-user menu-item-logo text-3xl"></i>
                <div class="menu-item-title ">Profile</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active-item {
    background-color: #33c3f0;
    border-radius: 6px;
    color: white;
}

.sidabar-wrapper {
    width: 300px;
}

.menu-navigation {
    margin-top: 2rem;
}

.menu-item {
    width: 100%;
    padding: 5px 20px;
}

.menu-item i {
    width: 20px;
    font-size: 1rem;
    align-items: start;
}

.login-logo {
    width: 2rem;
}

@media (max-width: 768px) {
    .sidebar-wrapper {
        box-shadow: 0 8px 32px 0 rgba(51, 195, 240, 0.15);
        border-radius: 18px;
        background: linear-gradient(135deg, #101a2b 80%, #1d283a 100%);
        padding-top: 24px !important;
        padding-bottom: 24px !important;
        min-height: 90vh;
        width: 90vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .sidebar-menu-item {
        margin-bottom: 18px !important;
        font-size: 1.15rem !important;
        padding: 12px 0 !important;
        text-align: center !important;
    }
}
</style>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

function goTo(name) {
    router.push({ name });
}

function isActive(name) {
    return computed(() => route.name === name);
}
</script>
