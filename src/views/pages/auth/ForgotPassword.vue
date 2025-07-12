<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();
const router = useRouter();
const serverError = ref('');

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}

function goHome() {
    router.push('/');
}

async function submit() {
    serverError.value = '';
    try {
        // Assuming emailData is defined elsewhere or passed as a prop/ref
        // For example: const emailData = { email: emailInput.value };
        const response = await apiClient.forgotPassword(emailData); // emailData — объект с email
        if (!response.success) {
            serverError.value = response.message || 'Ошибка сброса пароля';
        }
        // ... остальная логика
    } catch (e) {
        serverError.value = e.response?.data?.message || e.message || 'Ошибка сети';
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
            <!-- Forgot Password Card -->
            <Card class="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">Forgot Password</h1>
                        <p class="text-gray-400">Enter your email to reset your password</p>
                    </div>
                </template>
                <template #content>
                    <form @submit.prevent class="space-y-6">
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium text-gray-300">Email</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-envelope" />
                                <InputText id="email" type="email" autocomplete="off" placeholder="Enter your email"
                                    class="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    required />
                            </IconField>
                        </div>
                        <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                            {{ serverError }}
                        </div>
                        <Button type="submit"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                            Submit
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
                    <div class="mt-8 text-center text-xs text-gray-500">
                        <p>
                            By resetting your password, you agree to our
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
</style>
