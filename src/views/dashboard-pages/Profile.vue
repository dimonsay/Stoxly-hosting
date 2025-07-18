<template>
    <div class="profile-wrapper select-none">
        <div class="profile-title dashboard-title flex justify-between mb-3">
            <div class="title">Profile</div>
            <Button type="button" label="Logout" icon="pi pi-sign-out" severity="danger" outlined @click="logout"
                class="logout-btn" />
        </div>
        <div class="user-data-wrapper flex flex-col gap-2">

            <div class="flex flex-col gap-2 page-tile dashboard-tile">
                <div class="user-full-name flex gap-2 text-xl font-semibold">
                    <div class="user-name">{{ user.first_name }}</div>
                    <div class="user-name">{{ user.last_name }}</div>
                </div>

                <div class="verification-statuses flex gap-4">
                    <div class="email-verification p-2 w-fit border rounded"
                        :class="{ 'verified bg-sky-500': user.is_verified }">Email Verified</div>
                    <div class="email-verification p-2 w-fit border rounded"
                        :class="{ 'verified bg-sky-500': user.is_document_verified }">Passport Verified</div>
                </div>
            </div>

            <div class="user-contacts flex gap-2 flex-col page-tile dashboard-tile">
                <div class="contacts-title text-lg font-semibold">Contacts</div>

                <div class="flex items-center justify-between w-1/4 pointer gap-2">
                    <InputText v-model="user.email"></InputText>

                    <div class="change-email p-2 flex pointer items-center border rounded border-gray-500 hover:border-sky-400 transition duration-150 ease-in-out"
                        @click="change('email')">
                        <i class="pi pi-user-edit mr-2"></i>
                        Change
                    </div>
                </div>

                <div class="flex items-center justify-between w-1/4 pointer gap-2">
                    <InputText v-model="user.phone"></InputText>
                    <div class="change-phone p-2 flex pointer items-center border rounded border-gray-500 hover:border-sky-400 transition duration-150 ease-in-out"
                        @click="change('phone')">
                        <i class="pi pi-user-edit mr-2"></i>
                        Change
                    </div>
                </div>

            </div>

            <div class="change-data-wrapper dashboard-tile page-tile justify-between flex gap-2 ">
                <Button label="Change Email" icon="pi pi-envelope" @click="openDialog('email')" />
                <Button label="Change Phone" icon="pi pi-phone" @click="openDialog('phone')" />
                <Button label="Change Password" icon="pi pi-key" @click="openDialog('password')" />
            </div>

            <!-- Универсальный диалог -->
            <Dialog v-model:visible="showDialog" :header="dialogHeader" :modal="true"
                :closable="!loading && !(dialogType === 'email' && showEmailCode)" :style="{ minWidth: '340px' }">
                <div v-if="dialogType === 'password'" class="flex flex-col gap-4">
                    <InputText v-model="passwordForm.old" type="password" placeholder="Current Password"
                        :disabled="loading" class="w-full" />
                    <InputText v-model="passwordForm.new1" type="password" placeholder="New Password"
                        :disabled="loading" class="w-full" />
                    <InputText v-model="passwordForm.new2" type="password" placeholder="Repeat New Password"
                        :disabled="loading" class="w-full" />
                    <div v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</div>
                    <Button label="Submit" :loading="loading" @click="submitPassword" class="w-full" />
                </div>
                <div v-else-if="dialogType === 'email'">
                    <div v-if="!showEmailCode" class="flex flex-col gap-4">
                        <InputText v-model="emailForm.email" type="email" placeholder="New Email" :disabled="loading"
                            class="w-full" />
                        <div v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</div>
                        <Button label="Send Code" :loading="loading" @click="submitEmail" class="w-full" />
                    </div>
                    <div v-else class="flex flex-col gap-4">
                        <InputText v-model="emailForm.code" type="text" placeholder="Code from Email"
                            :disabled="loading" class="w-full" />
                        <div v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</div>
                        <Button label="Confirm" :loading="loading" @click="submitEmailCode" class="w-full" />
                    </div>
                </div>
                <div v-else-if="dialogType === 'phone'" class="flex flex-col gap-4">
                    <InputText v-model="phoneForm.phone" type="text" placeholder="New Phone" :disabled="loading"
                        class="w-full" />
                    <div v-if="phoneError" class="text-red-500 text-sm">{{ phoneError }}</div>
                    <Button label="Submit" :loading="loading" @click="submitPhone" class="w-full" />
                </div>
            </Dialog>

            <div class="passport-verification-wrapper dashboard-tile page-tile flex flex-col gap-2"
                v-if="!user.is_document_verified">
                <div class="passport-verification-title font-semibold text-lg">Passport</div>

                <FileUpload name="document" :customUpload="true" @uploader="onCustomUpload" :multiple="true"
                    accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <span>Upload passport photo to verify your identity</span>
                    </template>
                </FileUpload>
            </div>



        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    is_verified: false,
    is_document_verified: false
});

const showDialog = ref(false);
const dialogType = ref(''); // 'email' | 'phone' | 'password'
const showEmailCode = ref(false);
const loading = ref(false);
const toast = useToast();

const dialogHeader = computed(() => {
    if (dialogType.value === 'email') return 'Change Email';
    if (dialogType.value === 'phone') return 'Change Phone';
    if (dialogType.value === 'password') return 'Change Password';
    return '';
});

const dialogPlaceholder = computed(() => {
    if (dialogType.value === 'email') return 'New Email';
    if (dialogType.value === 'phone') return 'New Phone';
    if (dialogType.value === 'password') return 'New Password';
    return '';
});


async function submitChange() {
    loading.value = true;
    try {
        if (dialogType.value === 'email') {
            await apiClient.changeEmailRequest(inputValue.value);
            toast.add({ severity: 'success', summary: 'Email change requested', life: 3000 });
        } else if (dialogType.value === 'phone') {
            await apiClient.changePhone(inputValue.value);
            toast.add({ severity: 'success', summary: 'Phone changed', life: 3000 });
        } else if (dialogType.value === 'password') {
            await apiClient.changePassword(inputValue.value);
            toast.add({ severity: 'success', summary: 'Password changed', life: 3000 });
        }
        showDialog.value = false;
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 4000 });
    } finally {
        loading.value = false;
    }
}

// Загрузка данных пользователя
async function loadUserData() {
    try {
        const response = await apiClient.getUser();
        user.value = response;
    } catch (err) {
        console.error('Error loading user data:', err);
    }
}

// Функция выхода из системы
async function logout() {
    try {
        // Очищаем токены из localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Перенаправляем на страницу входа
        router.push({ name: 'login' });
    } catch (err) {
        console.error('Error during logout:', err);
        // Даже если произошла ошибка, все равно перенаправляем на login
        router.push({ name: 'login' });
    }
}

async function change(type) {
    console.log('change ' + type)
}

const onCustomUpload = async (event) => {
    try {
        const files = event.files;
        const description = 'passport'; // или input с v-model

        const response = await apiClient.sendPassportData(files, description);

        console.log('Upload success:', response);
    } catch (err) {
        console.error('Ошибка загрузки:', err);
    }
};

// Формы и ошибки
const passwordForm = ref({ old: '', new1: '', new2: '' });
const passwordError = ref('');
const emailForm = ref({ email: '', code: '' });
const emailError = ref('');
const phoneForm = ref({ phone: '' });
const phoneError = ref('');

function openDialog(type) {
    passwordError.value = '';
    emailError.value = '';
    phoneError.value = '';
    dialogType.value = type;
    if (type === 'password') {
        passwordForm.value = { old: '', new1: '', new2: '' };
    } else if (type === 'email') {
        emailForm.value = { email: '', code: '' };
        showEmailCode.value = false;
    } else if (type === 'phone') {
        phoneForm.value = { phone: '' };
    }
    showDialog.value = true;
}

// Валидация email
function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
// Валидация телефона
function validatePhone(phone) {
    return /^\+?\d{10,15}$/.test(phone);
}
// Валидация пароля
function validatePassword(pw) {
    return typeof pw === 'string' && pw.length >= 8;
}

// Смена пароля
async function submitPassword() {
    passwordError.value = '';
    const { old, new1, new2 } = passwordForm.value;
    if (!old || !new1 || !new2) {
        passwordError.value = 'All fields are required.';
        return;
    }
    if (!validatePassword(new1)) {
        passwordError.value = 'Password must be at least 8 characters.';
        return;
    }
    if (new1 !== new2) {
        passwordError.value = 'Passwords do not match.';
        return;
    }
    if (old === new1) {
        passwordError.value = 'New password must be different from old password.';
        return;
    }
    loading.value = true;
    try {
        await apiClient.changePassword(old, new1, new2);
        toast.add({ severity: 'success', summary: 'Password changed', life: 3000 });
        showDialog.value = false;
        await loadUserData();
    } catch (err) {
        passwordError.value = err.response?.data?.error || err.message || 'Error changing password.';
    } finally {
        loading.value = false;
    }
}

// Смена email (шаг 1)
async function submitEmail() {
    emailError.value = '';
    if (!validateEmail(emailForm.value.email)) {
        emailError.value = 'Enter a valid email.';
        return;
    }
    loading.value = true;
    try {
        await apiClient.changeEmailRequest(emailForm.value.email);
        showEmailCode.value = true;
        toast.add({ severity: 'info', summary: 'Code sent to new email', life: 3000 });
    } catch (err) {
        emailError.value = err.response?.data?.error || err.message || 'Error sending code.';
    } finally {
        loading.value = false;
    }
}
// Смена email (шаг 2)
async function submitEmailCode() {
    emailError.value = '';
    if (!emailForm.value.code || emailForm.value.code.length < 4) {
        emailError.value = 'Enter the code from email.';
        return;
    }
    loading.value = true;
    try {
        await apiClient.changeEmailConfirm(emailForm.value.email, emailForm.value.code);
        toast.add({ severity: 'success', summary: 'Email changed', life: 3000 });
        showDialog.value = false;
        await loadUserData();
    } catch (err) {
        emailError.value = err.response?.data?.error || err.message || 'Error confirming code.';
    } finally {
        loading.value = false;
    }
}
// Смена телефона
async function submitPhone() {
    phoneError.value = '';
    if (!validatePhone(phoneForm.value.phone)) {
        phoneError.value = 'Enter a valid phone (+1234567890, 10-15 digits).';
        return;
    }
    loading.value = true;
    try {
        await apiClient.changePhone(phoneForm.value.phone);
        toast.add({ severity: 'success', summary: 'Phone changed', life: 3000 });
        showDialog.value = false;
        await loadUserData();
    } catch (err) {
        phoneError.value = err.response?.data?.error || err.message || 'Error changing phone.';
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    loadUserData();
});
</script>

<style scoped>
.p-fileupload-cancel-button {
    background-color: red !important;
}

.logout-btn {
    transition: all 0.3s ease;
}

.logout-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:deep(.p-dialog-header-close),
:deep(.p-dialog-header-close:focus),
:deep(.p-dialog-header-close:hover),
:deep(.p-dialog-header-close:active) {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

:deep(.p-dialog-header-close .p-dialog-header-close-icon) {
    color: #fff !important;
}

:deep(.p-dialog) {
    min-width: 320px;
}
</style>