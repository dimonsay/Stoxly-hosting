<script setup>
import apiClient from '@/api/axios';
import { useLayout } from '@/layout/composables/layout';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();
const router = useRouter();
const toast = useToast();

// Состояние формы
const step = ref(1); // 1 - email, 2 - код и пароль
const loading = ref(false);
const serverError = ref('');

// Данные формы
const emailData = ref({
    email: ''
});

const resetData = ref({
    code: '',
    password: '',
    password2: ''
});

// Ошибки валидации
const emailError = ref('');
const codeError = ref('');
const passwordError = ref('');
const password2Error = ref('');

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}

function goHome() {
    router.push('/');
}

// Валидация email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email';
    }
    return '';
}

// Валидация кода
function validateCode(code) {
    if (!code) {
        return 'Code is required';
    }
    if (code.length < 4) {
        return 'Code must contain at least 4 characters';
    }
    return '';
}

// Валидация пароля
function validatePassword(password) {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 8) {
        return 'Password must contain at least 8 characters';
    }
    return '';
}

// Валидация повторного пароля
function validatePassword2(password, password2) {
    if (!password2) {
        return 'Please repeat password';
    }
    if (password !== password2) {
        return 'Passwords do not match';
    }
    return '';
}

// Шаг 1: Отправка email
async function submitEmail() {
    // Очистка ошибок
    emailError.value = '';
    serverError.value = '';

    // Валидация
    const emailValidation = validateEmail(emailData.value.email);
    if (emailValidation) {
        emailError.value = emailValidation;
        return;
    }

    loading.value = true;

    try {
        await apiClient.forgotPassword(emailData.value.email);
        toast.add({
            severity: 'success',
            summary: 'Code sent',
            detail: 'Check your email and enter the received code',
            life: 5000
        });
        step.value = 2;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error sending code';
        serverError.value = errorMessage;
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });
    } finally {
        loading.value = false;
    }
}

// Шаг 2: Подтверждение кода и установка пароля
async function submitReset() {
    // Очистка ошибок
    codeError.value = '';
    passwordError.value = '';
    password2Error.value = '';
    serverError.value = '';

    // Валидация
    const codeValidation = validateCode(resetData.value.code);
    const passwordValidation = validatePassword(resetData.value.password);
    const password2Validation = validatePassword2(resetData.value.password, resetData.value.password2);

    if (codeValidation) {
        codeError.value = codeValidation;
        return;
    }
    if (passwordValidation) {
        passwordError.value = passwordValidation;
        return;
    }
    if (password2Validation) {
        password2Error.value = password2Validation;
        return;
    }

    loading.value = true;

    try {
        await apiClient.forgotPasswordConfirm(
            emailData.value.email,
            resetData.value.code,
            resetData.value.password,
            resetData.value.password2
        );

        toast.add({
            severity: 'success',
            summary: 'Password changed',
            detail: 'Your password has been successfully changed. You can now log in.',
            life: 5000
        });

        // Перенаправление на страницу входа
        router.push({ name: 'login' });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Password reset error';
        serverError.value = errorMessage;
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });
    } finally {
        loading.value = false;
    }
}

// Возврат к первому шагу
function goBack() {
    step.value = 1;
    serverError.value = '';
    resetData.value = {
        code: '',
        password: '',
        password2: ''
    };
    codeError.value = '';
    passwordError.value = '';
    password2Error.value = '';
}
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

            <!-- Step 1: Email Form -->
            <Card v-if="step === 1" class="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">Password Recovery</h1>
                        <p class="text-gray-400">Enter your email to receive a reset code</p>
                    </div>
                </template>
                <template #content>
                    <form @submit.prevent="submitEmail" class="space-y-6">
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium text-gray-300">Email</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-envelope" />
                                <InputText id="email" v-model="emailData.email" type="email" autocomplete="off"
                                    placeholder="Enter your email"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    :class="{ 'border-red-500': emailError }" required />
                            </IconField>
                            <div v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</div>
                        </div>

                        <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                            {{ serverError }}
                        </div>

                        <Button type="submit" :loading="loading" :disabled="loading"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                            Send Code
                        </Button>

                        <div class="mt-6 text-center flex flex-col gap-2">
                            <span class="text-sm text-gray-400">
                                Remember your password?
                                <a @click.prevent="router.push({ name: 'login' })" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium ml-1">Sign
                                    in</a>
                            </span>
                            <span class="text-sm text-gray-400">
                                <a @click.prevent="router.push({ name: 'register' })" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium">Sign up</a>
                            </span>
                        </div>
                    </form>
                </template>
            </Card>

            <!-- Step 2: Code and Password Form -->
            <Card v-else class="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">New Password</h1>
                        <p class="text-gray-400">Enter code and new password</p>
                        <p class="text-sm text-gray-500 mt-1">{{ emailData.email }}</p>
                    </div>
                </template>
                <template #content>

                    <form @submit.prevent="submitReset" class="space-y-6">
                        <div class="space-y-2">
                            <label for="code" class="text-sm font-medium text-gray-300">Confirmation Code</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-key" />
                                <InputText id="code" v-model="resetData.code" type="text" autocomplete="off"
                                    placeholder="Enter code from email"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    :class="{ 'border-red-500': codeError }" required />
                            </IconField>
                            <div v-if="codeError" class="text-red-500 text-sm">{{ codeError }}</div>
                        </div>

                        <div class="space-y-2">
                            <label for="password" class="text-sm font-medium text-gray-300">New Password</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-lock" />
                                <InputText id="password" v-model="resetData.password" type="password"
                                    autocomplete="new-password" placeholder="Enter new password"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    :class="{ 'border-red-500': passwordError }" required />
                            </IconField>
                            <div v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</div>
                        </div>

                        <div class="space-y-2">
                            <label for="password2" class="text-sm font-medium text-gray-300">Repeat Password</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-lock" />
                                <InputText id="password2" v-model="resetData.password2" type="password"
                                    autocomplete="new-password" placeholder="Confirm password"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    :class="{ 'border-red-500': password2Error }" required />
                            </IconField>
                            <div v-if="password2Error" class="text-red-500 text-sm">{{ password2Error }}</div>
                        </div>

                        <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                            {{ serverError }}
                        </div>

                        <Button type="submit" :loading="loading" :disabled="loading"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                            Change Password
                        </Button>

                        <div class="mt-6 text-center">
                            <Button type="button" @click="goBack"
                                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                                ← Back to email input
                            </Button>

                        </div>
                    </form>
                </template>
            </Card>

            <div class="mt-8 text-center text-xs text-gray-500">
                <p>
                    By resetting your password, you agree to our
                    <a href="/terms-of-service" class="text-blue-400 hover:underline underline-offset-2"
                        target="_blank">Terms of
                        Service</a>
                    and
                    <a href="/privacy-policy" class="text-blue-400 hover:underline underline-offset-2"
                        target="_blank">Privacy
                        Policy</a>
                </p>
            </div>
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

:deep(.p-inputtext) {
    background: rgba(55, 65, 81, 0.5) !important;
    border: 1px solid #4b5563 !important;
    color: white !important;
}

:deep(.p-inputtext:focus) {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
    border-color: #3b82f6 !important;
}

:deep(.p-inputtext.border-red-500) {
    border-color: #ef4444 !important;
}

:deep(.p-inputtext.border-red-500:focus) {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5) !important;
}
</style>
