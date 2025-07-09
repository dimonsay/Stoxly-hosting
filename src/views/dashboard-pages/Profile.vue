<template>
    <div class="profile-wrapper select-none">
        <div class="profile-title dashboard-title flex justify-between mb-3">
            <div class="title">Profile</div>
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
                    <div class="email-verification p-2 w-fit border rounded">Passport Verified</div>
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
                    <InputText v-model="phone"></InputText>
                    <div class="change-phone p-2 flex pointer items-center border rounded border-gray-500 hover:border-sky-400 transition duration-150 ease-in-out"
                        @click="change('phone')">
                        <i class="pi pi-user-edit mr-2"></i>
                        Change
                    </div>
                </div>

            </div>

            <div class="passport-verification-wrapper dashboard-tile page-tile flex flex-col gap-2"
                v-if="!passport_verified">
                <div class="passport-verification-title font-semibold text-lg">Passport</div>

                <FileUpload name="document" :customUpload="true" @uploader="onCustomUpload" :multiple="true"
                    accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <span>Загрузите фотографии документов</span>
                    </template>
                </FileUpload>
            </div>



        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import { onMounted } from 'vue';

const { user } = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const phone = '+1 (555) 123-4567'
const passport_verified = false

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
    console.log(user); // ✅ user доступен
});
</script>

<style scoped>
.p-fileupload-cancel-button {
    background-color: red !important;
}
</style>