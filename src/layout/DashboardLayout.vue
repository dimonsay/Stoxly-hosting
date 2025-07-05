<template>
    <div class="dashboard-wrapper ">
        <div class="dashboard flex justify-around">
            <SideBar class="p-10" />
            <div class="container borders">
                <router-view></router-view>
            </div>
            <Wallet class="p-10" :user="user" />
        </div>

    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import SideBar from '@/views/uikit/SideBar.vue';
import Wallet from '@/views/uikit/Wallet.vue';
import { onMounted, reactive } from 'vue';

const user = reactive({})

onMounted(async () => {
    try {
        const userData = await apiClient.getUser();

        Object.assign(user, userData);
    } catch (err) {
        console.error(err);
    }
});

</script>

<style>
.bc-dark-grey {
    background-color: #374151;
}

.borders {
    border-right: 1px solid black;
    border-left: 1px solid black;
}

.container {
    padding: 30px;
}

.dashboard-wrapper {
    background-color: #161a23;
    min-height: 100vh;
}


.dashboard-title {
    font-size: 2rem;
    font-weight: bold;
}

.dashboard-tile {
    background-color: #1d283a !important;
}
</style>