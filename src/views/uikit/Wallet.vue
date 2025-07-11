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

        <div class="deposit-btn btn text-xl font-medium pointer" @click="depositStatus">Deposit</div>
        <div class="withdraw-btn btn text-xl font-medium pointer">Withdraw</div>

        <Dialog style="min-width: 550px;" v-model:visible="depositError"
            header="At this time, we cannot accept deposits" :modal="true" :draggable="false">
            {{ errMessage }}
        </Dialog>

        <Dialog v-model:visible="showDeposit" header="Deposit" :modal="true" :draggable="false"
            style="min-width: 700px;" class="rounded-2xl">
            <div class="p-6 bg-[#1d283a] rounded-2xl flex flex-col gap-4 shadow-md">
                <!-- Card Type -->
                <div>
                    <label class="text-sm text-white mb-2">Card Type</label>
                    <Select v-model="depositData.cardType" :options="cardTypeOptions" option-label="label"
                        option-value="value" class="w-full rounded-lg text-white focus:outline-none" />
                </div>

                <!-- Card Number -->
                <div>
                    <label class="text-sm text-white mb-1">Card Number</label>
                    <InputText type="text" :value="depositData.cardNumber" @input="onCardInput" inputmode="numeric"
                        maxlength="19" class="w-full  py-2 rounded-lg   text-white focus:outline-none"
                        placeholder="•••• •••• •••• ••••" />
                    <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">{{ errors.cardNumber }}</p>
                </div>

                <!-- Expiry Date -->
                <div class="flex-col">
                    <!-- Month -->
                    <div class="flex gap-4 items-center ">
                        <div class="flex-1">
                            <label class="text-sm text-white mb-1">Month</label>
                            <InputNumber type="number" v-model="depositData.cardMonth" maxlength="2"
                                @input="clearError('expireDate')" class="w-full  text-white focus:outline-none"
                                placeholder="MM" />
                        </div>

                        <!-- Year -->
                        <div class="flex-1">
                            <label class="text-sm text-white mb-1">Year</label>
                            <InputNumber type="number" v-model="depositData.cardYear" maxlength="2" ref="yearInputRef"
                                @input="clearError('expireDate')" class="w-full  text-white focus:outline-none"
                                placeholder="YY" />
                        </div>
                    </div>
                    <p v-if="errors.expireDate" class="text-red-500 text-sm mt-1">{{ errors.expireDate }}</p>

                </div>



                <!-- CVV -->
                <div>
                    <label class="text-sm text-white mb-1">CVV</label>
                    <InputNumber type="number" v-model="depositData.cardCVV" maxlength="4"
                        @input="clearError('cardCVV')" class="w-full py-2 rounded-lg   text-white focus:outline-none"
                        placeholder="•••" />
                    <p v-if="errors.cardCVV" class="text-red-500 text-sm mt-1">{{ errors.cardCVV }}</p>
                </div>

                <!-- amount -->

                <div>
                    <label class="text-sm text-white mb-1 mt-5">Amount ($)</label>
                    <InputNumber prefix="$" type="number" v-model="depositData.depositAmount" maxlength="4"
                        @input="clearError('deposit')" class="w-full  py-2 rounded-lg   text-white focus:outline-none"
                        placeholder="$0.00" />
                    <p v-if="errors.deposit" class="text-red-500 text-sm mt-1">{{ errors.deposit }}</p>
                </div>

                <div class="verification-code" v-if="awaitingCode">
                    <label class="text-sm text-white mb-1 mt-5">Verification Code</label>
                    <InputText v-model="verificationCode.code" minlength="4" maxlength="6"
                        class="w-full py-2 rounded-lg text-white focus:outline-none"
                        placeholder="Enter the code sent to your email or phone" />
                    <p v-if="errors.verificationCode" class="text-red-500 text-sm mt-1">{{ errors.verificationCode }}
                    </p>
                </div>

                <!-- Submit Button -->
                <div class="pt-2 text-center w-full">
                    <Button :label="awaitingCode ? 'Send Code' : 'Deposit'" @click="submitDeposit"
                        class="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" />
                </div>
            </div>
        </Dialog>

    </div>


</template>

<script setup>
import apiClient from '@/api/axios';
import { InputNumber, InputText, Select } from 'primevue';
import { reactive, ref } from 'vue';


defineProps({
    user: {
        type: Object,
        required: true
    }
});

function clearError(field) {
    errors.value[field] = ''
}

function onCardInput(e) {
    handleCardInput(e)
    clearError('cardNumber')
}

function isValidExpireDate(month, year) {
    if (!month || !year) return false
    if (month < 1 || month > 12) return false

    const now = new Date()
    const currentYear = now.getFullYear() % 100  // последние 2 цифры года
    const currentMonth = now.getMonth() + 1      // месяц от 1 до 12

    if (year < currentYear) return false
    if (year == currentYear && month < currentMonth) return false

    return true
}

const errMessage = ref('')
const depositError = ref(false)
const showDeposit = ref(false)

const depositData = reactive({
    cardType: 'visa',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
    depositAmount: ''
})

const verificationCode = reactive({
    deposit_id: '',
    code: ''
})

const awaitingCode = ref(false)

const cardTypeOptions = [
    { label: 'Visa', value: 'visa' },
    { label: 'MasterCard', value: 'mastercard' },
]

const yearInputRef = ref(null)

const errors = ref({
    cardNumber: '',
    expireDate: '',
    cardCVV: '',
    deposit: '',
    verificationCode: '',
})

// Форматирование номера карты
function formatCardNumber(value) {
    return value
        .replace(/\D/g, '')                 // удаляем всё кроме цифр
        .replace(/(.{4})/g, '$1 ')          // добавляем пробел каждые 4 цифры
        .trim()
}


function handleCardInput(e) {
    const formatted = formatCardNumber(e.target.value)
    depositData.cardNumber = formatted
    clearError('cardNumber')
}

// Валидация
function validateForm() {


    errors.value = {
        cardNumber: '',
        expireDate: '',
        cardCVV: '',
        deposit: '',
        verificationCode: ''
    }

    const rawCard = depositData.cardNumber.replace(/\s/g, '')

    if (rawCard.length !== 16) {
        errors.value.cardNumber = 'Card number must be 16 digits'
    }

    if (!isValidExpireDate(Number(depositData.cardMonth), Number(depositData.cardYear))) {
        errors.value.expireDate = 'Invalid expiration date'
    }

    if (!/^\d{3,4}$/.test(depositData.cardCVV)) {
        errors.value.cardCVV = 'Invalid CVV'
    }

    if (!depositData.depositAmount || isNaN(depositData.depositAmount) || Number(depositData.depositAmount) <= 0) {
        errors.value.deposit = 'Enter a valid deposit amount'
    }

    return Object.values(errors.value).every(e => e === '')
}

async function submitDeposit() {

    if (!awaitingCode.value) {
        if (!validateForm()) return

        const response = await apiClient.sendDepositRequest(depositData)

        verificationCode.deposit_id = response.id
        awaitingCode.value = true
    } else {
        console.log('send satus : ' + verificationCode.deposit_id)
        errors.value.verificationCode = ''

        if (!verificationCode.code || verificationCode.code.trim() === '') {
            errors.value.verificationCode = 'Code is required'
            return
        }

        if (!verificationCode.code || verificationCode.code.length < 4) {
            errors.value.verificationCode = 'Wrong code'
            return
        }

        console.log(verificationCode)

        const result = await apiClient.sendDepositCode(verificationCode)

        console.log(result)

        if (result.success) {
            showDeposit.value = false
            resetForm()
        } else {
            errors.value.verificationCode = 'Invalid code'
        }
    }
}

function resetForm() {
    awaitingCode.value = false
    verificationCode.value = ''
    depositData.value = {
        cardType: 'visa',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCVV: '',
        depositAmount: ''
    }
    errors.value = {}
}

async function depositStatus() {
    const response = await apiClient.getDepositStatus()

    if (response.is_active) {
        showDeposit.value = true
    }

    if (!response.is_active) {
        errMessage.value = response.offline_message
        depositError.value = true
    }
}

const formatVolume = (volume) => {
    return '$' + Number(volume || 0).toLocaleString('en-US');
};

</script>

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
    /* настрой под твой layout, например, под фиксированный header */
    z-index: 10;
    /* если нужно поверх других элементов */
}
</style>
