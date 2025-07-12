<template>
    <div class="referral-info">
        <div class="card">
            <div class="card-header">
                <h3 class="text-xl font-semibold mb-4">Referral Program</h3>
            </div>

            <div class="card-content">
                <!-- Реферальный код пользователя -->
                <div class="referral-code-section mb-6">
                    <h4 class="text-lg font-medium mb-3">Your Referral Code</h4>
                    <div class="flex items-center gap-3">
                        <div class="referral-code-display">
                            <InputText :value="userReferralCode" readonly class="font-mono text-lg"
                                style="background-color: var(--surface-100);" />
                        </div>
                        <Button type="button" icon="pi pi-copy" @click="copyReferralCode"
                            :label="copySuccess ? 'Copied!' : 'Copy'" :class="{ 'p-button-success': copySuccess }" />
                    </div>
                </div>

                <!-- Статистика рефералов -->
                <div class="referral-stats mb-6">
                    <h4 class="text-lg font-medium mb-3">Your Referrals</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="stat-card">
                            <div class="stat-number text-2xl font-bold text-primary">
                                {{ referralStats.totalReferrals || 0 }}
                            </div>
                            <div class="stat-label text-sm text-surface-600">
                                Total Referrals
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number text-2xl font-bold text-green-600">
                                {{ referralStats.activeReferrals || 0 }}
                            </div>
                            <div class="stat-label text-sm text-surface-600">
                                Active Referrals
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number text-2xl font-bold text-blue-600">
                                ${{ referralStats.totalEarnings || 0 }}
                            </div>
                            <div class="stat-label text-sm text-surface-600">
                                Total Earnings
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Реферальная ссылка -->
                <div class="referral-link-section mb-6">
                    <h4 class="text-lg font-medium mb-3">Your Referral Link</h4>
                    <div class="flex items-center gap-3">
                        <div class="referral-link-display flex-1">
                            <InputText :value="referralLink" readonly class="text-sm"
                                style="background-color: var(--surface-100);" />
                        </div>
                        <Button type="button" icon="pi pi-copy" @click="copyReferralLink"
                            :label="linkCopySuccess ? 'Copied!' : 'Copy Link'"
                            :class="{ 'p-button-success': linkCopySuccess }" />
                    </div>
                </div>

                <!-- Список рефералов -->
                <div class="referrals-list" v-if="referrals.length > 0">
                    <h4 class="text-lg font-medium mb-3">Recent Referrals</h4>
                    <DataTable :value="referrals" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20]"
                        class="p-datatable-sm">
                        <Column field="username" header="Username">
                            <template #body="slotProps">
                                <div class="flex items-center gap-2">
                                    <Avatar :label="slotProps.data.username.charAt(0).toUpperCase()" size="small"
                                        class="bg-primary" />
                                    <span>{{ slotProps.data.username }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="email" header="Email">
                            <template #body="slotProps">
                                <span class="text-sm">{{ slotProps.data.email }}</span>
                            </template>
                        </Column>
                        <Column field="status" header="Status">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.status"
                                    :severity="getStatusSeverity(slotProps.data.status)" />
                            </template>
                        </Column>
                        <Column field="joined_at" header="Joined">
                            <template #body="slotProps">
                                <span class="text-sm">{{ formatDate(slotProps.data.joined_at) }}</span>
                            </template>
                        </Column>
                        <Column field="earnings" header="Earnings">
                            <template #body="slotProps">
                                <span class="font-medium text-green-600">
                                    ${{ slotProps.data.earnings || 0 }}
                                </span>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Пустое состояние -->
                <div v-else class="empty-state text-center py-8">
                    <i class="pi pi-users text-4xl text-surface-400 mb-4"></i>
                    <h5 class="text-lg font-medium mb-2">No Referrals Yet</h5>
                    <p class="text-surface-600 mb-4">
                        Share your referral link with friends and start earning rewards!
                    </p>
                    <Button type="button" label="Share Referral Link" icon="pi pi-share-alt"
                        @click="shareReferralLink" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { createReferralLink } from '@/utils/referral.js';
import { computed, ref } from 'vue';

// Props
const props = defineProps({
    userReferralCode: {
        type: String,
        required: true
    },
    referralStats: {
        type: Object,
        default: () => ({
            totalReferrals: 0,
            activeReferrals: 0,
            totalEarnings: 0
        })
    },
    referrals: {
        type: Array,
        default: () => []
    }
});

// Reactive data
const copySuccess = ref(false);
const linkCopySuccess = ref(false);

// Computed
const referralLink = computed(() => {
    if (!props.userReferralCode) return '';
    return createReferralLink(window.location.origin + '/register', props.userReferralCode);
});

// Methods
function copyReferralCode() {
    if (props.userReferralCode) {
        navigator.clipboard.writeText(props.userReferralCode);
        copySuccess.value = true;
        setTimeout(() => {
            copySuccess.value = false;
        }, 2000);
    }
}

function copyReferralLink() {
    if (referralLink.value) {
        navigator.clipboard.writeText(referralLink.value);
        linkCopySuccess.value = true;
        setTimeout(() => {
            linkCopySuccess.value = false;
        }, 2000);
    }
}

function shareReferralLink() {
    if (navigator.share && referralLink.value) {
        navigator.share({
            title: 'Join Stoxly with my referral link!',
            text: 'Start your investment journey with Stoxly using my referral link:',
            url: referralLink.value
        });
    } else {
        copyReferralLink();
    }
}

function getStatusSeverity(status) {
    switch (status) {
        case 'active':
            return 'success';
        case 'pending':
            return 'warning';
        case 'inactive':
            return 'danger';
        default:
            return 'info';
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
}
</script>

<style scoped>
.referral-info {
    max-width: 800px;
    margin: 0 auto;
}

.card {
    background: var(--surface-card);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--surface-border);
}

.card-content {
    padding: 1.5rem;
}

.stat-card {
    background: var(--surface-50);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    border: 1px solid var(--surface-border);
}

.stat-number {
    margin-bottom: 0.5rem;
}

.referral-code-display,
.referral-link-display {
    flex: 1;
}

.empty-state {
    color: var(--surface-600);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-content {
        padding: 1rem;
    }

    .stat-card {
        padding: 0.75rem;
    }
}
</style>