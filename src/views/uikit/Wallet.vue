<template>
    <div class="wallet-wrapper flex flex-col align-center gap-4" style="text-align: center; min-width: 420px;">
        <div class="wallet-title text-3xl font-bold">Wallet</div>
        <div class="wallet-balance-wrapper page-tile">
            <div class="wallet-balance-title mb-2 grey">
                <i class="pi pi-wallet wallet-logo blue"></i>
                Available balance
            </div>
            <div class="wallet-balance-number text-2xl font-semibold"> {{ formatVolume(user?.free_balance) }}</div>
        </div>
        <div class="wallet-balance-wrapper page-tile " v-if="user?.orders_balance">
            <div class="wallet-balance-title mb-2 grey">
                <i class="pi pi-arrow-right-arrow-left wallet-logo blue"></i>
                Balance in orders
            </div>
            <div class="wallet-balance-number text-2xl font-semibold">{{
                formatVolume(user.orders_balance) }}</div>
        </div>
        <div class="wallet-balance-wrapper page-tile ">
            <div class="wallet-balance-title mb-2 grey">
                <i class="fa-solid fa-arrow-trend-up wallet-logo blue"></i>
                Portfolio balance
            </div>
            <div class="wallet-balance-number text-2xl font-semibold">{{ formatVolume(user?.invested_balance) }}</div>
        </div>
        <div class="wallet-balance-wrapper page-tile">
            <div class="wallet-balance-title mb-2 grey">
                <i class="pi pi-dollar wallet-logo blue"></i>
                Total account balance
            </div>
            <div class="wallet-balance-number text-2xl font-semibold">
                {{ formatVolume(user.total_balance) }}
            </div>
        </div>

        <div class="deposit-btn btn text-xl font-medium pointer">Deposit</div>
        <div class="withdraw-btn btn text-xl font-medium pointer">Withdraw</div>
    </div>


</template>

<style scoped>
.page-tile {
    background-color: #1d283a;
}

.wallet-logo {
    margin-right: 8px;
    font-size: 1.2rem;
}

.wallet-balance-title {
    font-size: 1.3rem;
}

.wallet-balance-title {
    justify-content: center;
    text-align: center;
    display: flex;
    align-items: center;
}

.deposit-btn {
    background-color: #33c3f0;
}

.withdraw-btn:hover {
    background-color: #1c3c4c;
}

.withdraw-btn {
    border: 1px solid #33c3f0;
}

.btn {
    padding: 15px 30px;
    border-radius: 8px;
}

.wallet-wrapper {
    position: sticky;
    top: 80px;
    /* настрой под твой layout, например, под фиксированный header */
    z-index: 10;
    /* если нужно поверх других элементов */
}
</style>

<script setup>

defineProps({
    user: {
        type: Object,
        required: true
    }
});

const formatVolume = (volume) => {
    return '$' + Number(volume || 0).toLocaleString('en-US');
};

</script>
