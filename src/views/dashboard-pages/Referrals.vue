<template>
    <div class="referrals-wrapper flex flex-col gap-8">
        <div class="dashboard-title">Referrals</div>
        <div class="referrals-info-wrapper">
            <div class="referrals-info flex gap-4">
                <div class="total-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-users mr-8 blue icon"></i>
                        <div>
                            <div class="dashboard-count text-3x; font-medium">{{ referrals.referrals ?
                                referrals.referrals.length : 0 }}</div>
                            <div class="referrals-title grey">Total referrals</div>
                        </div>
                    </div>
                </div>

                <div class="active-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-users mr-8 green icon"></i>
                        <div>
                            <div class="tile-count text-3x; font-medium">{{ referrals.active }}</div>
                            <div class="referrals-title grey">Active referrals</div>
                        </div>
                    </div>
                </div>

                <div class="earned-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-dollar mr-8 blue icon"></i>
                        <div>
                            <div class="tile-count text-3x; font-medium">${{ referrals.totalEarned() }}</div>
                            <div class="referrals-title grey">Total Earned</div>
                        </div>
                    </div>
                </div>

                <div class="earned-referrals page-tile dashboard-tile w-1/4">
                    <div class="flex items-center">
                        <i class="pi pi-gift mr-8 orange icon"></i>
                        <div>
                            <div class="tile-count text-3x; font-medium">${{ referrals.pending }}</div>
                            <div class="referrals-title grey">Pending Rewards</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="referral-link-wrapper  page-tile dashboard-tile">
            <div class="link-title-wrapper flex justify-between items-center mb-5">
                <div class="link-title text-3xl font-semibold ">Your Referral Link</div>
            </div>

            <div class="flex align-center gap-3">
                <div class="referral-link bc-dark-grey padding pointer" :class="{ 'copied': copied }"
                    @click="copyToClipboard(link)" style="width: 100%;">
                    {{ link }}
                </div>
                <div class="clipboard text-2xl pointer" @click="copyToClipboard(link)">
                    <i class="pi pi-clone bc-blue text-lg clone-padding rounded-lg "
                        :class="{ 'hidden copied-btn': copied }"></i>
                    <i class="pi pi-check green bc-blue text-lg clone-padding rounded-lg"
                        :class="{ 'hidden ': !copied, 'copied-btn': copied }"></i>
                </div>
            </div>
        </div>

        <div class="view-referrals-wrapper flex gap-2 flex-col dashboard-tile page-tile" v-if="referrals.referrals">
            <div class="view-title text-3xl font-bold mb-5">Referrals</div>
            <div class="view-referral flex items-center justify-between page-tile bg-gray-700"
                v-for="referral in referrals.referrals">
                <div class="flex flex-col">
                    <div class="name-wrapper flex gap-4 text-lg font-semibold">
                        <div class="name">{{ referral.name }}</div>
                        <div class="surname">{{ referral.surname }}</div>
                    </div>
                    <div class="joined grey">{{ referral.joined }}</div>
                </div>
                <div class="status flex flex-col">
                    <div class="earned text-right text-lg font-semibold">${{ referral.earned }}</div>
                    <div class="status"
                        :class="{ 'orange': referral.status === 'Pending', 'green': referral.status === 'Active' }">{{
                            referral.status }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

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

.orange {
    color: orange;
}

.icon {
    font-size: 2.2rem;
}
</style>

<script setup>

import { reactive, ref } from 'vue';

const copied = ref(false)

const link = ref('https://stoxly.com/STOXLY2024')

const referrals = reactive({
    active: 6,
    earned: 200,
    pending: 30,
    referrals: [
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 2 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 22 },
        { name: 'Max', surname: 'Suit', status: 'Pending', joined: 'May 12, 2024', earned: 0 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 2 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 22 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 2 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 2 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 2 },
        { name: 'Max', surname: 'Suit', status: 'Active', joined: 'May 12, 2024', earned: 2 },
    ],
    /**
     * 
     */
    totalEarned() {
        return this.referrals.reduce((total, referral) => {
            return total + referral.earned;
        }, 0);
    },

})

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

</script>