<template>
    <div class="referrals-wrapper flex flex-col gap-8">
        <div class="dashboard-title">Referrals</div>
        <div class="referrals-info-wrapper">
            <div class="referrals-info flex gap-4 grid-mobile-referrals">
                <div class="total-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-users mr-8 blue icon"></i>
                        <div>
                            <div class="dashboard-count text-2xl font-medium">{{ referrals.referrals ?
                                referrals.referrals.length : 0 }}</div>
                            <div class="referrals-title grey">Total referrals</div>
                        </div>
                    </div>
                </div>

                <div class="active-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-users mr-8 green icon"></i>
                        <div>
                            <div class="tile-count text-2xl font-medium">{{ referrals.active }}</div>
                            <div class="referrals-title grey">Active referrals</div>
                        </div>
                    </div>
                </div>

                <div class="earned-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-dollar mr-8 blue icon"></i>
                        <div>
                            <div class="tile-count text-2xl font-medium">${{ referrals.totalEarned() }}</div>
                            <div class="referrals-title grey">Total Earned</div>
                        </div>
                    </div>
                </div>

                <div class="earned-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-gift mr-8 text-orange-400 icon "></i>
                        <div>
                            <div class="tile-count text-2xl font-medium ">${{ referrals.pending }}</div>
                            <div class="referrals-title grey">Pending Rewards</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="referral-link-wrapper page-tile dashboard-tile">
            <div class="link-title-wrapper flex justify-between items-center mb-5">
                <div class="link-title text-3xl font-semibold">Your Referral Link</div>
            </div>

            <div class="flex align-center gap-3">
                <div class="referral-link bc-dark-grey padding pointer" :class="{ 'copied': copied }"
                    @click="copyToClipboard(referralLink)" style="width: 100%;">
                    <span class="hidden md:inline">{{ referralLink }}</span>
                    <span class="inline md:hidden">{{ shortReferralLink }}</span>
                </div>
                <div class="clipboard text-2xl pointer" @click="copyToClipboard(referralLink)">
                    <i class="pi pi-clone bc-blue text-lg clone-padding rounded-lg"
                        :class="{ 'hidden copied-btn': copied }"></i>
                    <i class="pi pi-check green bc-blue text-lg clone-padding rounded-lg"
                        :class="{ 'hidden ': !copied, 'copied-btn': copied }"></i>
                </div>
            </div>
        </div>

        <div class="view-referrals-wrapper flex gap-2 flex-col dashboard-tile page-tile"
            v-if="referrals.referrals && referrals.referrals.length > 0">
            <div class="view-title text-3xl font-bold mb-5">Referrals</div>
            <div class="view-referral flex items-center justify-between page-tile bg-gray-700"
                v-for="referral in referrals.referrals" :key="referral.id">
                <div class="flex flex-col">
                    <div class="name-wrapper flex gap-2 text-lg font-semibold">
                        <div class="name">{{ referral.first_name || referral.name }}</div>
                        <div class="surname">{{ referral.last_name || referral.surname }}</div>
                    </div>
                    <div class="joined grey">{{ formatDate(referral.date_joined || referral.joined) }}</div>
                </div>
                <div class="status flex flex-col">
                    <div class="earned text-right text-lg font-semibold">${{ referral.earned || 0 }}</div>
                    <div class="status text-sm font-medium" :class="{
                        'text-orange-400 bg-orange-100 dark:bg-orange-900/20': referral.status === 'Pending',
                        'text-green-500 bg-green-100 dark:bg-green-900/20': referral.status === 'Active'
                    }">{{
                        referral.status || 'Active' }}</div>
                </div>
            </div>
        </div>

        <div v-else-if="!loading" class="view-referrals-wrapper flex gap-2 flex-col dashboard-tile page-tile">
            <div class="view-title text-3xl font-bold mb-5">Referrals</div>
            <div class="empty-state text-center py-8">
                <i class="pi pi-users text-4xl text-surface-400 mb-4"></i>
                <h5 class="text-lg font-medium mb-2">No Referrals Yet</h5>
                <p class="text-surface-600">
                    Share your referral link with friends and start earning rewards!
                </p>
            </div>
        </div>

        <!-- Загрузка -->
        <div v-if="loading" class="view-referrals-wrapper flex gap-2 flex-col dashboard-tile page-tile">
            <div class="view-title text-3xl font-bold mb-5">Referrals</div>
            <div class="loading-state text-center py-8">
                <i class="pi pi-spin pi-spinner text-4xl text-primary mb-4"></i>
                <p class="text-surface-600">Loading referrals...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios.js';
import { computed, onMounted, reactive, ref } from 'vue';

const copied = ref(false);
const loading = ref(true);
const referralData = ref({
    referral_code: '',
    referrals: []
});

const referrals = reactive({
    active: 0,
    earned: 0,
    pending: 0,
    referrals: [],
    totalEarned() {
        return this.referrals.reduce((total, referral) => {
            return total + (referral.earned || 0);
        }, 0);
    },
});

// Вычисляемое свойство для реферальной ссылки
const referralLink = computed(() => {
    if (referralData.value.referral_code) {
        return `${window.location.origin}/auth/register?ref=${referralData.value.referral_code}`;
    }
    return `${window.location.origin}/auth/register`;
});

// Короткая ссылка для мобильного отображения
const shortReferralLink = computed(() => {
    if (referralData.value.referral_code) {
        return `${window.location.hostname}/.../${referralData.value.referral_code}`;
    }
    return `${window.location.hostname}/auth/register`;
});

// Функция для загрузки данных рефералов
async function loadReferrals() {
    loading.value = true;
    try {
        const response = await apiClient.get('/auth/my-referrals/');
        referralData.value = response.data;

        // Обновляем реактивные данные
        referrals.referrals = referralData.value.referrals || [];
        referrals.active = referrals.referrals.filter(ref => ref.status === 'Active').length;
        referrals.earned = referrals.totalEarned();
        referrals.pending = referrals.referrals.filter(ref => ref.status === 'Pending').length * 10; // Примерная сумма ожидающих наград

    } catch (error) {
        console.error('Error loading referrals:', error);
        // В случае ошибки используем пустой массив
        referrals.referrals = [];
        referrals.active = 0;
        referrals.earned = 0;
        referrals.pending = 0;
    } finally {
        loading.value = false;
    }
}

// Функция форматирования даты
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        copied.value = true;
        setTimeout(() => copied.value = false, 1000);
    } catch (err) {
        console.error("Failed to copy (modern API):", err);

        try {
            const input = document.createElement("input");
            input.value = text;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            copied.value = true;
            setTimeout(() => copied.value = false, 2000);
        } catch (fallbackErr) {
            console.error("Failed to copy (fallback):", fallbackErr);
        } finally {
            if (input) document.body.removeChild(input);
        }
    }
}

// Загружаем данные при монтировании компонента
onMounted(() => {
    loadReferrals();
});
</script>

<style scoped>
.copied-btn {
    background-color: transparent !important;
    transition: hidden .3s ease-in-out;
}

.referral-link {
    transition: .3s ease-in-out;
    border: 1px solid rgba(0, 255, 255, 0.61);
}

.copied {
    border: 1px solid green;
}

.referral-link {
    padding: 10px 15px;
    border-radius: 8px;
}

.clone-padding {
    padding: 10px 15px;
}

.icon {
    font-size: 2.2rem;
}

.empty-state {
    color: var(--surface-600);
}

.loading-state {
    color: var(--surface-600);
}

@media (max-width: 768px) {
    .referrals-info.grid-mobile-referrals {
        display: grid !important;
        grid-template-columns: 1fr;
        gap: 12px !important;
    }

    .referrals-info.grid-mobile-referrals>div {
        width: 100% !important;
        min-width: 0 !important;
    }

    .referral-link {
        font-size: 1rem;
        word-break: break-all;
        padding: 8px 6px !important;
    }
}
</style>