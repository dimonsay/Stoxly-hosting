<script setup>
import apiClient from '@/api/axios.js';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, reactive, ref } from 'vue';
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

const rememberMe = ref(false);
const serverError = ref('');
const nonFieldError = ref('');

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

function forgotPassword() {
    router.push({
        name: 'forgotpassword'
    })
}

async function login() {
    serverError.value = '';
    nonFieldError.value = '';
    if (loginData.email !== '' && loginData.password !== '') {
        const existingToken = localStorage.getItem('access_token');

        if (isTokenValid(existingToken)) {
            // Уже авторизован — не вызываем login, не запрашиваем OTP
            return router.push({ name: 'dashboard' });
        }

        try {
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
                if (response.errors && response.errors.non_field_errors) {
                    nonFieldError.value = response.errors.non_field_errors[0];
                } else if (response.isValidationError) {
                    console.error('Ошибка валидации:', response.errors);
                } else if (response.isNetworkError) {
                    console.error('Сетевая ошибка');
                } else {
                    serverError.value = response.message || 'Ошибка входа';
                }
            }
        } catch (e) {
            serverError.value = e.response?.data?.message || e.message || 'Ошибка сети';
        }
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

            <!-- Login Card -->
            <Card class="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p class="text-gray-400">Sign in to your account to continue trading</p>
                    </div>
                </template>

                <template #content>
                    <form @submit.prevent="login" class="space-y-6">
                        <!-- Email Field -->
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium text-gray-300">Email</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-envelope" />
                                <InputText id="email" type="email" v-model="loginData.email"
                                    placeholder="Enter your email"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    required />
                            </IconField>
                        </div>

                        <!-- Password Field -->
                        <div class="space-y-2">
                            <label for="password" class="text-sm font-medium text-gray-300">Password</label>
                            <Password id="password" v-model="loginData.password" placeholder="Enter your password"
                                class="w-full" :feedback="false" toggleMask
                                inputClass="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                panelClass="bg-gray-700 border-gray-600" />
                        </div>

                        <!-- Sign In Button -->
                        <Button type="submit"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                            Sign In
                        </Button>

                        <div v-if="nonFieldError" class="text-red-500 text-sm mb-2 text-center">
                            {{ nonFieldError }}
                        </div>
                        <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                            {{ serverError }}
                        </div>

                        <!-- Sign Up & Forgot Password Links -->
                        <div class="mt-6 text-center flex flex-col gap-2">
                            <span class="text-sm text-gray-400">
                                Don't have an account?
                                <a @click.prevent="registerPage" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium ml-1">Sign
                                    up</a>
                            </span>
                            <span class="text-sm text-gray-400">
                                <a @click.prevent="forgotPassword" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium">Forgot
                                    password?</a>
                            </span>
                        </div>
                    </form>

                    <!-- Footer -->
                    <div class="mt-8 text-center text-xs text-gray-500">
                        <p>
                            By signing in, you agree to our
                            <a href="/terms-of-service" class="text-blue-400 hover:underline underline-offset-2"
                                target="_blank">Terms of Service</a>
                            and
                            <a href="/privacy-policy" class="text-blue-400 hover:underline underline-offset-2"
                                target="_blank">Privacy Policy</a>
                        </p>
                    </div>
                </template>
            </Card>


        </div>
    </div>
</template>

<style scoped>
/* Дополнительные стили для анимаций */
.bg-gradient-to-br {
    background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
}

/* Кастомизация PrimeVue компонентов */
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

:deep(.p-password) {
    width: 100%;
}

:deep(.p-password-input) {
    background: rgba(55, 65, 81, 0.5) !important;
    border: 1px solid #4b5563 !important;
    color: white !important;
}

:deep(.p-password-input:focus) {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
    border-color: #3b82f6 !important;
}

:deep(.p-checkbox .p-checkbox-box) {
    background: rgba(55, 65, 81, 0.5) !important;
    border: 1px solid #4b5563 !important;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
    background: #3b82f6 !important;
    border-color: #3b82f6 !important;
}

:deep(.p-button.p-button-text) {
    background: transparent !important;
    color: inherit !important;
}

:deep(.p-button.p-button-text:hover) {
    background: rgba(59, 130, 246, 0.1) !important;
}

:deep(.p-divider .p-divider-content) {
    background: rgba(31, 41, 55, 0.5) !important;
}

:deep(.p-divider .p-divider-line) {
    border-color: #4b5563 !important;
}
</style>
