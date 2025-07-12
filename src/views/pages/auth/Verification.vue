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
const serverError = ref('');

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
                router.push({ name: 'login' })
            } else if (type == 'login') {
                router.push({ name: 'dashboard' })
            }
        } else {
            if (response.isValidationError) {
                values.value = Array(6).fill(null);
                errorCode.value = true;
                serverError.value = response.errors?.non_field_errors?.[0] || 'Invalid code';
            } else if (response.isNetworkError) {
                serverError.value = 'Network error';
            } else {
                serverError.value = response.message || 'Unknown error';
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
        prevElementInputRef.value.blur()
        nextElementInputRef.value = ''
        prevElementInputRef.value = ''
        verify()
    }

    errorCode.value = false

};
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="mx-auto mb-6">
                    <div class="flex items-center justify-center">
                        <img :src="`/layout/images/logo/logo-${logo()}.png`" class="w-12 h-12" />
                        <img :src="`/layout/images/logo/appname-${logo()}.png`" class="ml-3 h-8" />
                    </div>
                </div>
            </div>
            <!-- Verification Card -->
            <Card class="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">Verification</h1>
                        <p class="text-gray-400">We have sent a code to your email</p>
                    </div>
                </template>
                <template #content>
                    <div class="space-y-6">
                        <div class="flex items-center justify-center mt-1 mb-6">

                            <span class="text-white font-bold ml-2">
                                {{ email ? email[0] + email[1] + '*****@gmail.com' : '' }}
                            </span>
                        </div>
                        <div class="flex justify-between w-full items-center gap-4" @paste="handlePaste">
                            <InputNumber v-for="(_, index) in 6" :key="index" :inputId="'val' + (index + 1)"
                                v-model="values[index]" inputClass="w-12 text-center" :class="{ 'error': errorCode }"
                                :max="9" @keyup="focus($event)" />
                        </div>
                        <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                            {{ serverError }}
                        </div>
                        <div class="flex items-center gap-4 justify-center mt-6">
                            <Button @click="verify" class="block" style="max-width: 160px;">Verify</Button>
                            <Button @click="goHome" class="block" severity="danger" outlined
                                style="max-width: 160px;">Cancel</Button>
                        </div>
                    </div>

                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>
.bg-gradient-to-br {
    background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
}

:deep(.p-card) {
    background: rgba(31, 41, 55, 0.5) !important;
    border: 1px solid rgba(75, 85, 99, 0.5) !important;
    backdrop-filter: blur(8px);
}

:deep(.p-card .p-card-header) {
    background: transparent !important;
    border-bottom: none !important;
    padding-bottom: 0 !important;
}

:deep(.p-card .p-card-content) {
    padding: 0 !important;
}

:deep(.p-inputtext),
:deep(.p-inputnumber-input) {
    background: rgba(55, 65, 81, 0.5) !important;
    border: 1px solid #4b5563 !important;
    color: white !important;
}

:deep(.p-inputtext:focus),
:deep(.p-inputnumber-input:focus) {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
    border-color: #3b82f6 !important;
}

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
