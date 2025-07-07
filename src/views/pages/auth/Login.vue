<script setup>
import apiClient from '@/api/axios.js';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const { isDarkTheme } = useLayout();

const router = useRouter();

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}


const loginData = reactive({
    email: '',
    password: '',
})

onMounted(() => {
    const storedEmail = sessionStorage.getItem('email');

    if (storedEmail) {
        loginData.email = storedEmail;
        sessionStorage.removeItem('email');
    }
});

function isTokenValid(token) {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch (e) {
        return false;
    }
}

function registerPage() {
    router.push({
        name: 'register'
    })
}

async function login() {
    if (loginData.email !== '' && loginData.password !== '') {
        const existingToken = localStorage.getItem('access_token');

        if (isTokenValid(existingToken)) {
            // Уже авторизован — не вызываем login, не запрашиваем OTP
            return router.push({ name: 'dashboard' });
        }

        const response = await apiClient.login(loginData);
        console.log(response);

        if (response.success) {
            // токен получен, но верификация через OTP обязательна
            sessionStorage.setItem('email', loginData.email);
            sessionStorage.setItem('type', 'login');

            router.push({
                name: 'verification'
            });
        } else {
            if (response.isValidationError) {
                console.error('Ошибка валидации:', response.errors);
            } else if (response.isNetworkError) {
                console.error('Сетевая ошибка');
            } else {
                console.error('Ошибка:', response.status, response.errors);
            }
        }
    }
}

</script>

<template>
    <div :class="'login-body flex min-h-screen ' + (!isDarkTheme ? 'layout-light' : 'layout-dark')">
        <div class="login-image w-6/12 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/demo/images/pages/login-' + (isDarkTheme ? 'ondark' : 'onlight') + '.png'" alt="atlantis"
                class="h-screen w-full" />
        </div>
        <div class="login-panel w-full" style="background: var(--surface-ground)">
            <Fluid
                class="min-h-screen text-center w-full flex items-center md:items-start justify-center flex-col bg-auto md:bg-contain bg-no-repeat"
                style="padding: 20% 10% 20% 10%; background: var(--exception-pages-image)">
                <div class="flex flex-col">
                    <div class="flex items-center mb-12 logo-container">
                        <img :src="`/layout/images/logo/logo-${logo()}.png`" class="login-logo" style="width: 45px" />
                        <img :src="`/layout/images/logo/appname-${logo()}.png`" class="login-appname ml-4"
                            style="width: 100px" />
                    </div>
                    <div class="form-container">
                        <IconField>
                            <InputIcon class="pi pi-envelope" />
                            <InputText type="text" v-model="loginData.email" autocomplete="off" placeholder="Email"
                                class="block mb-4" style="max-width: 320px; min-width: 270px" />
                        </IconField>
                        <IconField>
                            <InputIcon class="pi pi-key" />
                            <InputText type="password" v-model="loginData.password" autocomplete="off"
                                placeholder="Password" class="block mb-4" style="max-width: 320px; min-width: 270px" />
                        </IconField>
                        <a href="#" class="flex text-surface-500 dark:text-surface-400 mb-6 text-sm">Forgot your
                            password?</a>
                    </div>
                    <div class="button-container">
                        <Button type="button" @click="login()" class="block"
                            style="max-width: 320px; margin-bottom: 32px">Login</Button>
                        <span class="flex text-sm text-surface-500 dark:text-surface-400">Don’t have an account?<a
                                @click="registerPage()" class="cursor-pointer ml-1"
                                style="border-bottom: 1px solid white ;">Sign-up here</a></span>
                    </div>
                </div>

                <div class="login-footer flex items-center absolute" style="bottom: 75px">
                    <div
                        class="flex items-center login-footer-logo-container pr-6 mr-6 border-r border-surface-200 dark:border-surface-700">
                        <img src="/layout/images/logo/logo-gray.png" class="login-footer-logo" style="width: 22px" />
                        <img src="/layout/images/logo/appname-gray.png" class="login-footer-appname ml-2"
                            style="width: 45px" />
                    </div>
                    <span class="text-sm text-surface-500 dark:text-surface-400 mr-4">Copyright 2024</span>
                </div>
            </Fluid>
        </div>
    </div>
</template>
