<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();
const router = useRouter();
const toast = useToast();

// Данные формы
const passwordData = ref({
    password: '',
    password2: ''
});

// Ошибки валидации
const passwordError = ref('');
const password2Error = ref('');
const serverError = ref('');
const loading = ref(false);

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}

function goHome() {
    router.push('/');
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

// Отправка формы
async function submitForm() {
    // Очистка ошибок
    passwordError.value = '';
    password2Error.value = '';
    serverError.value = '';

    // Валидация
    const passwordValidation = validatePassword(passwordData.value.password);
    const password2Validation = validatePassword2(passwordData.value.password, passwordData.value.password2);

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
        // Здесь будет вызов API для установки нового пароля
        // await apiClient.setNewPassword(passwordData.value.password, passwordData.value.password2);

        toast.add({
            severity: 'success',
            summary: 'Password changed',
            detail: 'Your password has been successfully changed.',
            life: 5000
        });

        // Перенаправление на страницу входа
        router.push({ name: 'login' });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Password change error';
        serverError.value = errorMessage;
        toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: errorMessage,
            life: 5000
        });
    } finally {
        loading.value = false;
    }
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

            <!-- New Password Card -->
            <Card class="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">New Password</h1>
                        <p class="text-gray-400">Enter your new password</p>
                    </div>
                </template>
                <template #content>
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div class="space-y-2">
                            <label for="password" class="text-sm font-medium text-gray-300">New Password</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-lock" />
                                <InputText id="password" v-model="passwordData.password" type="password"
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
                                <InputText id="password2" v-model="passwordData.password2" type="password"
                                    autocomplete="new-password" placeholder="Repeat new password"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    :class="{ 'border-red-500': password2Error }" required />
                            </IconField>
                            <div v-if="password2Error" class="text-red-500 text-sm">{{ password2Error }}</div>
                        </div>

                        <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                            {{ serverError }}
                        </div>

                        <div class="flex gap-4">
                            <Button type="button" @click="goHome" severity="danger" outlined
                                class="flex-1 bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-3 px-4 transition-all duration-200">
                                Cancel
                            </Button>
                            <Button type="submit" :loading="loading" :disabled="loading"
                                class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                                Change Password
                            </Button>
                        </div>

                        <div class="mt-6 text-center">
                            <span class="text-sm text-gray-400">
                                <a @click.prevent="router.push({ name: 'login' })" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium">Back to
                                    login</a>
                            </span>
                        </div>
                    </form>
                </template>
            </Card>

            <div class="mt-8 text-center text-xs text-gray-500">
                <p>
                    By changing your password, you agree to our
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

:deep(.p-button.p-button-outlined) {
    background: transparent !important;
    border: 1px solid #ef4444 !important;
    color: #ef4444 !important;
}

:deep(.p-button.p-button-outlined:hover) {
    background: #ef4444 !important;
    border-color: #ef4444 !important;
    color: white !important;
}
</style>
