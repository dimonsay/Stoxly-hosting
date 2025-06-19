<script setup>
import apiClient from '@/api/axios.js';
import { useLayout } from '@/layout/composables/layout';
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();
const router = useRouter();

const values = ref(Array(6).fill(null));
const inputs = ref([]);

const errorCode = ref(false);

const type = sessionStorage.getItem('type');
const email = sessionStorage.getItem('email');
sessionStorage.removeItem('email');
sessionStorage.removeItem('type');

const handlePaste = (event) => {
    event.preventDefault();

    // Получаем данные из буфера обмена
    const pasteData = event.clipboardData?.getData('text')?.trim() || '';

    // Проверяем что в буфере ровно 6 цифр
    if (/^\d{6}$/.test(pasteData)) {
        const digits = pasteData.split('');

        // Заполняем значения
        digits.forEach((digit, index) => {
            if (index < 6) {
                values.value[index] = parseInt(digit, 10);
            }
        });

        // Фокусируем последнее поле
        nextTick(() => {
            console.log()
            if (inputs.value[5]?.$el) {
                nextTick(() => verify());
            }
            if (digits.length == 6) {
                nextTick(() => verify());
            }
        });
    }
};

async function verify() {
    if (values.value.every(val => val !== null)) {
        const valCode = values.value.join('');
        const response = await apiClient.verifyCode(valCode, email, type)

        if (response.success) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            if (type == 'registration') {
                sessionStorage.setItem('email', email);

                router.push({
                    name: 'login'
                })
            } else if (type == 'login') {
                router.push({
                    name: 'me'
                })
            }
        } else {
            if (response.isValidationError) {
                values.value = Array(6).fill(null);
                errorCode.value = true;
                console.error('Ошибка валидации:', response.errors);
            } else if (response.isNetworkError) {
                // Проблемы с сетью
                console.error('Сетевая ошибка');
            } else {
                // Другие ошибки
                console.error('Ошибка:', response.status, response.errors);
            }
        }
    }
};

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}

function goHome() {
    router.push('/');
}

const nextElementInputRef = ref('')
const prevElementInputRef = ref('')

const focus = (event) => {
    const regexNum = /^\d+$/;
    const isValid = regexNum.test(event.key);
    if (prevElementInputRef.value.id != 'val6') {
        nextElementInputRef.value = event.currentTarget.nextElementSibling.children[0];
        isValid && nextElementInputRef.value.focus();
        prevElementInputRef.value = nextElementInputRef.value
        console.log(prevElementInputRef.value)
    } else if (isValid && prevElementInputRef.value.id == 'val6') {
        console.log(1)
        prevElementInputRef.value.blur()
        nextElementInputRef.value = ''
        prevElementInputRef.value = ''
        verify()
    }

    errorCode.value = false

};
</script>

<template>
    <div :class="'login-body flex min-h-screen  ' + (isDarkTheme ? 'layout-dark' : 'layout-light')">
        <div class="login-image w-6/12 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/demo/images/pages/verification-' + (isDarkTheme ? 'ondark' : 'onlight') + '.png'"
                alt="atlantis" class="h-screen w-full" />
        </div>
        <div class="w-full" style="background: var(--surface-ground)">
            <Fluid
                class="min-h-screen text-center w-full flex items-center md:items-start justify-center flex-col bg-auto md:bg-contain bg-no-repeat"
                style="padding: 20% 10% 20% 10%; background: var(--exception-pages-image)">
                <div class="flex flex-col">
                    <div class="flex items-center mb-12 logo-container">
                        <img :src="`/layout/images/logo/logo-${logo()}.png`" class="login-logo" style="width: 45px" />
                        <img :src="`/layout/images/logo/appname-${logo()}.png`" class="login-appname ml-4"
                            style="width: 100px" />
                    </div>
                    <div class="form-container text-left" style="max-width: 320px; min-width: 270px">
                        <span
                            class="text-surface-900 dark:text-surface-0 font-bold mb-2 text-2xl m-0">Verification</span>
                        <span class="text-surface-600 dark:text-surface-200 font-medium"><br>We have sent code to you
                            email: <br><br></span>
                        <div class="flex items-center mt-1 mb-6">
                            <i class="pi pi-envelope text-surface-600 dark:text-surface-200"></i>
                            <span class="text-surface-900 dark:text-surface-0 font-bold ml-2">
                                {{ email[0] }}{{ email[1] }}*****@gmail.com
                            </span>
                        </div>
                        <div class="flex justify-between w-full items-center gap-4" @paste="handlePaste">
                            <InputNumber v-for="(_, index) in 6" :key="index" :inputId="'val' + (index + 1)"
                                v-model="values[index]" inputClass="w-12 text-center" :class="{ 'error': errorCode }"
                                :max="9" @keyup="focus($event)" />
                        </div>
                    </div>
                    <div class="button-container mt-6 text-left" style="max-width: 320px; min-width: 270px">
                        <div class="buttons flex items-center gap-4">
                            <Button @click="verify" class="block"
                                style="max-width: 320px; margin-bottom: 32px">Verify</Button>
                            <Button @click="goHome" class="block" severity="danger" outlined
                                style="max-width: 320px; margin-bottom: 32px">Cancel</Button>
                        </div>
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

<style>
.error {
    animation: shake .5s;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    20%,
    60% {
        transform: translateX(-10px);
    }

    40%,
    80% {
        transform: translateX(10px);
    }
}
</style>
