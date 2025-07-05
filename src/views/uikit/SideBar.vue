<template>
    <div class="sidabar-wrapper">
        <div class="name text-3xl font-bold pointer " style="text-align: left;">Stoxly</div>

        <div class="menu-navigation flex flex-col gap-3 text-1xl">
            <div class="menu-item flex pointer  text-lg gap-2" @click="goTo('dashboard')" style="align-items: center;">
                <i class="pi pi-chart-line menu-item-logo"></i>
                <div class="menu-item-title grey">Dashboard</div>
            </div>
            <div class="menu-item flex pointer  text-lg gap-2" @click="goTo('trade')" style="align-items: center;">
                <i class="fa-solid fa-arrow-trend-up"></i>
                <div class="menu-item-title grey">Trade</div>
            </div>
            <div class="menu-item flex pointer  text-lg gap-2" @click="goTo('portfolio')" style="align-items: center;">
                <i class="pi pi-chart-pie menu-item-logo"></i>
                <div class="menu-item-title grey">Portfolio</div>
            </div>
            <div class="menu-item flex pointer  text-lg gap-2" @click="goTo('community')" style="align-items: center;">
                <i class="pi pi-users menu-item-logo"></i>
                <div class="menu-item-title grey">Community</div>
            </div>
            <div class="menu-item flex pointer  text-lg gap-2" @click="goTo('referrals')" style="align-items: center;">
                <i class="pi pi-gift menu-item-logo"></i>
                <div class="menu-item-title grey">Referrals</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidabar-wrapper {
    width: 300px;
}

.menu-navigation {
    margin-top: 2rem;
}

.menu-item {
    width: 150px;
    padding: 5px 5px;
}

.menu-item i {
    width: 20px;
    font-size: 1rem;
    align-items: start;
}

.login-logo {
    width: 2rem;
}
</style>

<script setup>
import router from '@/router';


function goTo(name) {
    router.push({
        name: name,
    })
}
</script>