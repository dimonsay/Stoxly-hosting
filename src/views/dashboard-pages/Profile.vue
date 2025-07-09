<template>
    <div class="profile-wrapper">
        <div class="profile-title dashboard-title">Profile</div>
        <div class="user-data-wrapper page-tile dashboard-tile">
            <div class="user-name"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

defineProps({
    user: {
        type: Object,
        required: true
    }
});

const user = reactive([])

onMounted(async () => {

    try {

    } catch (err) {

    }
})



</script>

<style scoped></style>