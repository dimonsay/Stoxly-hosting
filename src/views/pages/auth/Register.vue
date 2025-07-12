<script setup>
import apiClient from '@/api/axios.js';
import { useLayout } from '@/layout/composables/layout';
import { extractReferralCodeFromURL as extractReferralCodeFromURLUtil, validateReferralCode as validateReferralCodeUtil } from '@/utils/referral.js';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();
const router = useRouter();
const route = useRoute();

function logo() {
    return isDarkTheme.value ? 'light' : 'dark';
}

function toLogin() {
    router.push({
        name: 'login',
    })
}

const formData = reactive({
    firstName: 'asd',
    lastName: 'asd',
    username: 'dimonsay',
    email: 'dimonwar12@gmail.com',
    phone: '', // Добавляем поле для номера телефона
    password: 'Varvarua73219@',
    password2: 'Varvarua73219@',
    referralCode: '', // Добавляем поле для реферального кода
});

const validateCode = reactive('')

const errors = reactive({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    phone: false, // Добавляем ошибку для номера телефона
    password: false,
    password2: false,
    code: false,
    validateCodeHidden: false,
    referralCode: false, // Добавляем ошибку для реферального кода
});

const serverErrors = reactive({
    username: '',
    email: '',
    phone: '',
    referralCode: '',
    general: ''
});

// Функция для извлечения реферального кода из URL
function extractReferralCodeFromURL() {
    const refCode = extractReferralCodeFromURLUtil();
    if (refCode) {
        formData.referralCode = refCode;
        validateReferralCode(refCode);
    }
}

// Функция валидации реферального кода
function validateReferralCode(code) {
    if (!code) {
        errors.referralCode = false;
        return true;
    }

    errors.referralCode = !validateReferralCodeUtil(code);
    return !errors.referralCode;
}

// Функция для очистки реферального кода
function clearReferralCode() {
    formData.referralCode = '';
    errors.referralCode = false;
}

// Функция валидации номера телефона
function validatePhone(phone) {
    if (!phone) {
        errors.phone = false;
        return true;
    }

    // Удаляем все пробелы, дефисы и скобки для проверки
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    // Проверяем, что номер содержит только цифры и имеет длину от 10 до 15 символов
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    errors.phone = !phoneRegex.test(cleanPhone);
    return !errors.phone;
}

// Инициализация при загрузке компонента
onMounted(() => {
    extractReferralCodeFromURL();
});

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (password) {
        errors.password = !passwordRegex.test(password)
    }

    return !errors.password
}

function validateConfirmedPassword() {
    errors.password2 = true
    if (validatePassword()) {
        if (formData.password == formData.password2) {
            errors.password2 = false
        }
    }
}

function validateEmail(email) {

    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if (email) {
        errors.email = !emailRegex.test(email);
    }
}

function validateName(name, status) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/;

    if (name) {
        if (status == 'first') {
            errors.firstName = !nameRegex.test(name);
        } else if (status == 'last') {
            errors.lastName = !nameRegex.test(name);
        }
    }
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9]{6,}$/;
    if (username) {
        errors.username = !usernameRegex.test(username);
    }
}

function ifEmpty() {
    if (formData.firstName == '') {
        errors.firstName = true;
    } if (formData.lastName == '') {
        errors.lastName = true;
    } if (formData.username == '') {
        errors.username = true
    } if (formData.email == '') {
        errors.email = true
    } if (formData.phone == '') {
        errors.phone = true
    } if (formData.password == '') {
        errors.password = true
    } if (formData.password2 == '') {
        errors.password2 = true
    }

    return true
}

async function submit() {
    // Сбрасываем ошибки
    errors.firstName = false;
    errors.lastName = false;
    errors.username = false;
    errors.phone = false;
    errors.password = false;
    errors.password2 = false;
    errors.email = false;
    errors.referralCode = false;
    serverErrors.username = '';
    serverErrors.email = '';
    serverErrors.phone = '';
    serverErrors.referralCode = '';
    serverErrors.general = '';

    if (ifEmpty()) {
        validateEmail(formData.email);
        validateName(formData.firstName);
        validatePhone(formData.phone);
        validatePassword(formData.password);
        validateUsername(formData.username);
        validateName(formData.lastName);
        validateConfirmedPassword(formData.password2);
        validateReferralCode(formData.referralCode);

        if (!errors.firstName && !errors.lastName && !errors.username &&
            !errors.email && !errors.phone && !errors.password && !errors.password2 && !errors.referralCode) {

            const result = await apiClient.register(formData);

            if (result.success) {
                sessionStorage.setItem('email', formData.email);
                sessionStorage.setItem('type', 'registration');
                router.push({
                    name: 'verification',
                });
            } else {
                if (result.isValidationError) {
                    // Ошибки валидации
                    if (result.errors.username) {
                        errors.username = true;
                        serverErrors.username = result.errors.username[0];
                    }
                    if (result.errors.email) {
                        errors.email = true;
                        serverErrors.email = result.errors.email[0];
                    }
                    if (result.errors.phone) {
                        errors.phone = true;
                        serverErrors.phone = result.errors.phone[0];
                    }
                    if (result.errors.referral_code) {
                        errors.referralCode = true;
                        serverErrors.referralCode = result.errors.referral_code[0];
                    }
                } else {
                    console.error("Registration failed:", result.error);
                }
            }
        }
    }
}

function goHome() {
    router.push('/');
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
            <!-- Register Card -->
            <Card class=" backdrop-blur-sm border-gray-700/50 shadow-2xl">
                <template #header>
                    <div class="text-center mt-5">
                        <h1 class="text-3xl font-bold text-white mb-2">Create your account</h1>
                        <p class="text-gray-400">Sign up to start trading with Stoxly</p>
                    </div>
                </template>
                <template #content>
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="flex gap-4">
                            <div class="flex-1 space-y-2">
                                <label for="firstName" class="text-sm font-medium text-gray-300">First Name</label>
                                <InputText id="firstName" v-model="formData.firstName" autocomplete="off"
                                    placeholder="First Name"
                                    :class="['w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400', { 'error-border': errors.firstName }]"
                                    @blur="validateName(formData.firstName, 'first')" required />
                            </div>
                            <div class="flex-1 space-y-2">
                                <label for="lastName" class="text-sm font-medium text-gray-300">Last Name</label>
                                <InputText id="lastName" v-model="formData.lastName" autocomplete="off"
                                    placeholder="Last Name"
                                    :class="['w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400', { 'error-border': errors.lastName }]"
                                    @blur="validateName(formData.lastName, 'last')" required />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label for="username" class="text-sm font-medium text-gray-300">Username</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-user" />
                                <InputText id="username" v-model="formData.username" autocomplete="off"
                                    placeholder="Username"
                                    :class="['w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400', { 'error-border': errors.username }]"
                                    @blur="validateUsername(formData.username)" required />
                            </IconField>
                            <div v-if="serverErrors.username" class="text-red-500 text-sm mt-1">
                                {{ serverErrors.username }}
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium text-gray-300">Email</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-envelope" />
                                <InputText id="email" v-model="formData.email" type="email" autocomplete="off"
                                    placeholder="Email"
                                    :class="['w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400', { 'error-border': errors.email }]"
                                    @blur="validateEmail(formData.email)" required />
                            </IconField>
                            <div v-if="serverErrors.email" class="text-red-500 text-sm mt-1">
                                {{ serverErrors.email }}
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label for="phone" class="text-sm font-medium text-gray-300">Phone</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-phone" />
                                <InputText id="phone" v-model="formData.phone" type="tel" autocomplete="off"
                                    placeholder="Phone"
                                    :class="['w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400', { 'error-border': errors.phone }]"
                                    @blur="validatePhone(formData.phone)" required />
                            </IconField>
                            <div v-if="serverErrors.phone" class="text-red-500 text-sm mt-1">
                                {{ serverErrors.phone }}
                            </div>
                            <div v-if="errors.phone" class="text-red-500 text-sm mt-1 mb-3">
                                Please enter a valid phone number
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-1 space-y-2">
                                <label for="password" class="text-sm font-medium text-gray-300">Password</label>
                                <Password id="password" v-model="formData.password" placeholder="Password"
                                    :feedback="false" toggleMask
                                    inputClass="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    panelClass="bg-gray-700 border-gray-600" @blur="validatePassword(formData.password)"
                                    required />
                            </div>
                            <div class="flex-1 space-y-2">
                                <label for="password2" class="text-sm font-medium text-gray-300">Confirm
                                    Password</label>
                                <Password id="password2" v-model="formData.password2" placeholder="Confirm Password"
                                    :feedback="false" toggleMask
                                    inputClass="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    panelClass="bg-gray-700 border-gray-600"
                                    @blur="validateConfirmedPassword(formData.password2)" required />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label for="referralCode" class="text-sm font-medium text-gray-300">Referral Code
                                (optional)</label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-users" />
                                <InputText id="referralCode" v-model="formData.referralCode" autocomplete="off"
                                    placeholder="Referral Code (optional)"
                                    :class="['w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400', { 'error-border': errors.referralCode }]"
                                    @blur="validateReferralCode(formData.referralCode)" />
                            </IconField>
                            <div v-if="serverErrors.referralCode" class="text-red-500 text-sm mt-1">
                                {{ serverErrors.referralCode }}
                            </div>
                            <div v-if="formData.referralCode" class="flex items-center justify-between mt-2">
                                <span class="text-sm text-surface-600 dark:text-surface-400">
                                    Referral code: {{ formData.referralCode }}
                                </span>
                                <Button type="button" icon="pi pi-times" size="small" text @click="clearReferralCode"
                                    class="p-1" />
                            </div>
                            <div v-if="errors.referralCode" class="text-red-500 text-sm mt-1">
                                Invalid referral code format
                            </div>
                        </div>
                        <Button type="submit"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02]">
                            Sign Up
                        </Button>
                        <div class="mt-6 text-center flex flex-col gap-2">
                            <span class="text-sm text-gray-400">
                                Already have an account?
                                <a @click.prevent="toLogin" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium ml-1">Sign
                                    in</a>
                            </span>
                            <span class="text-sm text-gray-400">
                                <a @click.prevent="router.push({ name: 'forgotpassword' })" href="#"
                                    class="text-blue-400 hover:underline underline-offset-2 font-medium">Forgot
                                    password?</a>
                            </span>
                        </div>
                    </form>
                    <div class="mt-8 text-center text-xs text-gray-500">
                        <p>
                            By signing up, you agree to our
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

<style>
.error-border {
    border: 2px solid red !important;
}
</style>

<style scoped>
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

:deep(.p-password-input) {
    background: rgba(55, 65, 81, 0.5) !important;
    border: 1px solid #4b5563 !important;
    color: white !important;
}

:deep(.p-password-input:focus) {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
    border-color: #3b82f6 !important;
}
</style>