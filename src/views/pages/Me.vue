<template>
    <div>
        <!-- Добавил v-if для защиты от null -->
        <div v-if="userData">
            {{ userData }} <!-- Добавил интерполяцию для отображения данных -->
        </div>

        <!-- Исправлено имя функции на getMe (как объявлено в скрипте) -->
        <button @click="getMe">Get Me</button>
    </div>
</template>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import apiClient from '@/api/axios.js';
import { ref } from 'vue';


const { isDarkTheme } = useLayout();

const userData = ref(null);

const getMe = async () => {
    try {
        console.log('Fetching user data...');
        const response = await apiClient.getMe();

        if (response?.success) {
            userData.value = response.data;
            console.log('User data received:', response.data);
        } else {
            console.error('API Error:', response?.errors || 'Unknown error');
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
};
</script>