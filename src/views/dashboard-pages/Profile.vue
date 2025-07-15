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
import { onMounted, ref } from 'vue';
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
</style>