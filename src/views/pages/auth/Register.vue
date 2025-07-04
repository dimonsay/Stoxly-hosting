<script setup>
import apiClient from '@/api/axios.js';
import { useLayout } from '@/layout/composables/layout';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();
const router = useRouter();

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
    password: 'Varvarua73219@',
    password2: 'Varvarua73219@',
});

const validateCode = reactive('')


const errors = reactive({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    password2: false,
    code: false,
    validateCodeHidden: false
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
    errors.password = false;
    errors.password2 = false;
    errors.email = false;

    if (ifEmpty()) {
        validateEmail(formData.email);
        validateName(formData.firstName);
        validatePassword(formData.password);
        validateUsername(formData.username);
        validateName(formData.lastName);
        validateConfirmedPassword(formData.password2);

        if (!errors.firstName && !errors.lastName && !errors.username &&
            !errors.email && !errors.password && !errors.password2) {

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
                    console.error("Validation errors:", result.errors);
                    if (result.errors.username) {
                        errors.username = true
                    }
                    if (result.errors.email) {
                        errors.email = true
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
    <div :class="'login-body flex min-h-screen  ' + (isDarkTheme ? 'layout-dark' : 'layout-light')">

        <div class="w-full" style="background: var(--surface-ground)">

            <Fluid
                class="min-h-screen text-center w-full flex items-center md:items-start justify-center flex-col bg-auto md:bg-contain bg-no-repeat max-w-full"
                style="align-items: center; background: var(--exception-pages-image)">


                <div class="flex justify-between w-full" style="padding: 0 5%; align-items: center;">

                    <div class="flex flex-col justify-center" style="margin: 0 auto;">

                        <div class="flex items-center mb-12 logo-container">
                            <img :src="`/layout/images/logo/logo-${logo()}.png`" class="login-logo"
                                style="width: 45px" />
                            <div class="login-appname ml-4  font-bold">
                                <div class="name text-xl" style="text-align: left;">Stoxly</div>
                                <div class="undername" style="font-weight: 100;">Bordless invest</div>
                            </div>
                        </div>

                        <div class="form-container text-left" style="max-width: 320px; min-width: 270px;">
                            <span class="text-2xl font-semibold m-0 mb-2">Register</span>
                            <span class="block text-surface-600 dark:text-surface-200 font-medium mb-6">Let's get
                                started</span>
                            <IconField>
                                <InputText v-model="formData.firstName" type="text" autocomplete="off"
                                    placeholder="First Name" class="block mb-5"
                                    @blur="validateName(formData.firstName, 'first')"
                                    :class="{ 'error-border': errors.firstName }"
                                    style="max-width: 320px; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <InputText v-model="formData.lastName" type="text" autocomplete="off"
                                    placeholder="Last Name" class="block mb-5"
                                    :class="{ 'error-border': errors.lastName }"
                                    @blur="validateName(formData.lastName, 'last')"
                                    style="max-width: 320px; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <InputIcon class="pi pi-user" />
                                <InputText v-model="formData.username" type="text" autocomplete="off"
                                    placeholder="Username" class="block mb-5"
                                    @blur="validateUsername(formData.username)"
                                    :class="{ 'error-border': errors.username }"
                                    style="max-width: 320px; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <InputIcon class="pi pi-envelope" />
                                <InputText v-model="formData.email" type="mail" autocomplete="off" placeholder="Email"
                                    class="block mb-5" :class="{ 'error-border': errors.email }"
                                    @blur="validateEmail(formData.email)" style="max-width: 320px; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <InputIcon class="pi pi-key" />
                                <InputText v-model="formData.password" type="password" autocomplete="current-password"
                                    placeholder="Password" @blur="validatePassword(formData.password)"
                                    class="block mb-5" :class="{ 'error-border': errors.password }"
                                    style="max-width: 320px; min-width: 270px" />
                            </IconField>

                            <IconField>
                                <InputIcon class="pi pi-key" />
                                <InputText v-model="formData.password2" type="password" autocomplete="current-password"
                                    placeholder="Confirm Password" @blur="validateConfirmedPassword(formData.password2)"
                                    class="block mb-5" :class="{ 'error-border': errors.password2 }"
                                    style="max-width: 320px; min-width: 270px" />
                            </IconField>

                            <div class="mt-2 flex flex-wrap hidden">
                                <Checkbox type="checkbox" id="confirmed" :binary="true" class="mr-2" />
                                <label for="confirmed" class="text-surface-900 dark:text-surface-0 font-medium mr-2">I
                                    have
                                    read the</label>
                                <a class="text-surface-600 dark:text-surface-200 hover:text-primary cursor-pointer">Terms
                                    and Conditions</a>
                            </div>
                        </div>

                        <div class="button-container mt-6 text-left" style="max-width: 320px; min-width: 270px">
                            <div class="buttons flex items-center gap-4">
                                <Button type="button" @click="submit()" class="block"
                                    style="max-width: 320px; margin-bottom: 32px">Submit</Button>
                                <Button type="button" @click="goHome" class="block" severity="danger" outlined
                                    style="max-width: 320px; margin-bottom: 32px">Cancel</Button>
                            </div>
                            <span class="font-medium text-surface-600 dark:text-surface-200">Already have an account? <a
                                    class="font-semibold cursor-pointer text-surface-900 dark:text-surface-0 hover:text-primary transition-colors duration-300"
                                    @click="toLogin()">Login</a>
                            </span>
                        </div>

                        <div class="login-footer flex items-center mt-6">
                            <div
                                class="flex items-center login-footer-logo-container pr-6 mr-6 border-r border-surface-200 dark:border-surface-700">
                                <img src="/layout/images/logo/logo-gray.png" class="login-footer-logo"
                                    style="width: 22px" />
                                <img src="/layout/images/logo/appname-gray.png" class="login-footer-appname ml-2"
                                    style="width: 45px" />
                            </div>
                            <span class="text-sm text-surface-500 dark:text-surface-400 mr-4">Copyright 2024</span>
                        </div>

                    </div>

                </div>

            </Fluid>
        </div>
    </div>

</template>

<style>
.error-border {
    border: 2px solid red !important;
}
</style>