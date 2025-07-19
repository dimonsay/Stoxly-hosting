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
        <div class="wallet-balance-wrapper page-tile " v-if="user?.balance_in_orders">
            <div class="wallet-balance-title mb-2 grey">
                <i class="pi pi-arrow-right-arrow-left wallet-logo blue"></i>
                Balance in orders
            </div>
            <div class="wallet-balance-number text-2xl font-semibold">{{
                formatVolume(user.balance_in_orders) }}</div>
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
                <!-- Deposit Type -->
                <div>
                    <label class="text-sm text-white mb-2">Deposit Type</label>
                    <Select v-model="depositData.depositType" :options="depositTypeOptions" option-label="label"
                        option-value="value" class="w-full rounded-lg text-white focus:outline-none"
                        placeholder="Select deposit type" />
                </div>

                <!-- Credit Card Fields -->
                <div v-if="depositData.depositType === 'credit_card'" class="space-y-4">
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
                            maxlength="19" class="w-full py-2 rounded-lg text-white focus:outline-none"
                            placeholder="•••• •••• •••• ••••" />
                        <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">{{ errors.cardNumber }}</p>
                    </div>

                    <!-- Expiry Date -->
                    <div class="flex-col">
                        <div class="flex gap-4 items-center">
                            <div class="flex-1">
                                <label class="text-sm text-white mb-1">Month</label>
                                <InputNumber type="number" v-model="depositData.cardMonth" maxlength="2"
                                    @input="clearError('expireDate')" class="w-full text-white focus:outline-none"
                                    placeholder="MM" />
                            </div>
                            <div class="flex-1">
                                <label class="text-sm text-white mb-1">Year</label>
                                <InputNumber type="number" v-model="depositData.cardYear" maxlength="2"
                                    ref="yearInputRef" @input="clearError('expireDate')"
                                    class="w-full text-white focus:outline-none" placeholder="YY" />
                            </div>
                        </div>
                        <p v-if="errors.expireDate" class="text-red-500 text-sm mt-1">{{ errors.expireDate }}</p>
                    </div>

                    <!-- CVV -->
                    <div>
                        <label class="text-sm text-white mb-1">CVV</label>
                        <InputNumber type="number" v-model="depositData.cardCVV" maxlength="4"
                            @input="clearError('cardCVV')" class="w-full py-2 rounded-lg text-white focus:outline-none"
                            placeholder="•••" />
                        <p v-if="errors.cardCVV" class="text-red-500 text-sm mt-1">{{ errors.cardCVV }}</p>
                    </div>
                </div>

                <!-- Bank Transfer Fields -->
                <div v-if="depositData.depositType === 'bank_transfer'" class="space-y-4">
                    <!-- Bank Info Display -->
                    <div v-if="depositConfig?.iban" class="bg-gray-700/50 p-4 rounded-lg flex flex-col text-lg">
                        <h4 class="text-white font-medium mb-2">Bank Account Details</h4>
                        <div class="text-gray-300 text-sm space-y-2 w-full flex flex-col">
                            <div class="flex items-center gap-2">
                                <strong>IBAN:</strong>
                                <span class="font-mono break-all select-all">{{ depositConfig.iban }}</span>
                                <Button icon="pi pi-copy" @click="copyToClipboard(depositConfig.iban)" class="p-1 px-2"
                                    size="small" severity="secondary" />
                            </div>
                            <div v-if="depositConfig.holder_name" class="flex items-center gap-2">
                                <strong>Holder:</strong>
                                <span class="font-mono break-all select-all">{{ depositConfig.holder_name }}</span>
                                <Button icon="pi pi-copy" @click="copyToClipboard(depositConfig.holder_name)"
                                    class="p-1 px-2" size="small" severity="secondary" />
                            </div>
                        </div>
                    </div>

                    <!-- User IBAN Input -->
                    <div>
                        <label class="text-sm text-white mb-1">Your IBAN</label>
                        <InputText v-model="depositData.iban"
                            class="w-full py-2 rounded-lg text-white focus:outline-none"
                            placeholder="Enter your IBAN" />
                        <p v-if="errors.iban" class="text-red-500 text-sm mt-1">{{ errors.iban }}</p>
                    </div>

                    <!-- User Holder Name Input -->
                    <div>
                        <label class="text-sm text-white mb-1">Account Holder Name</label>
                        <InputText v-model="depositData.holderName"
                            class="w-full py-2 rounded-lg text-white focus:outline-none"
                            placeholder="Enter account holder name" />
                        <p v-if="errors.holderName" class="text-red-500 text-sm mt-1">{{ errors.holderName }}</p>
                    </div>
                </div>

                <!-- Crypto Fields -->
                <div v-if="depositData.depositType === 'crypto'" class="space-y-4">


                    <div>
                        <label class="text-sm text-white mb-2">Cryptocurrency Address</label>
                        <Select v-model="depositData.selectedCryptoAddress" :options="cryptoAddressOptions"
                            option-label="label" option-value="value"
                            class="w-full rounded-lg text-white focus:outline-none"
                            placeholder="Select cryptocurrency address" />
                        <p v-if="errors.selectedCryptoAddress" class="text-red-500 text-sm mt-1">{{
                            errors.selectedCryptoAddress }}</p>
                    </div>

                    <!-- Display selected crypto address info -->
                    <div v-if="depositData.selectedCryptoAddress"
                        class="bg-gray-700/50 p-4 rounded-lg flex flex-col items-center gap-4 text-lg">
                        <h4 class="text-white font-medium mb-2 text-center">Deposit Address</h4>
                        <div class="text-gray-300 space-y-1 w-full flex flex-col gap-3">
                            <QrcodeVue :value="selectedCryptoOption.address || ''" :size="120"
                                class="bg-white rounded p-1 mx-auto" />
                            <div class="flex items-center gap-2 mt-2 justify-center">
                                <span class="font-mono break-all select-all text-center">{{ selectedCryptoOption.address
                                    }}</span>
                                <Button icon="pi pi-copy" @click="copyToClipboard(selectedCryptoOption.address)"
                                    class="p-1 px-2" size="small" severity="secondary" />
                            </div>
                            <div class="text-center w-full"><strong>Network:</strong> {{ selectedCryptoOption.network }}
                            </div>
                            <div v-if="selectedCryptoOption.comment" class="text-center w-full">
                                <strong>Comment:</strong> {{ selectedCryptoOption.comment }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Amount (common for all types) -->
                <div v-if="depositData.depositType">
                    <label class="text-sm text-white mb-1 mt-5">Amount ($)</label>
                    <InputNumber prefix="$" type="number" v-model="depositData.depositAmount" maxlength="4"
                        @input="clearError('deposit')" class="w-full py-2 rounded-lg text-white focus:outline-none"
                        placeholder="$0.00" />
                    <p v-if="errors.deposit" class="text-red-500 text-sm mt-1">{{ errors.deposit }}</p>
                </div>

                <!-- Verification Code -->
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
                        :disabled="!depositData.depositType"
                        class="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
            </div>
        </Dialog>

    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import { InputNumber, InputText, Select } from 'primevue';
import QrcodeVue from 'qrcode.vue';
import { computed, reactive, ref, watch } from 'vue';

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
    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1

    if (year < currentYear) return false
    if (year == currentYear && month < currentMonth) return false

    return true
}

const errMessage = ref('')
const depositError = ref(false)
const showDeposit = ref(false)
const depositConfig = ref(null)

const depositData = reactive({
    depositType: '',
    cardType: 'visa',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    cryptoType: '',
    walletAddress: '',
    depositAmount: '',
    // Новые поля для bank transfer
    iban: '',
    holderName: '',
    // Новое поле для crypto
    selectedCryptoAddress: null
})

const verificationCode = reactive({
    deposit_id: '',
    code: ''
})

const awaitingCode = ref(false)

const depositTypeOptions = [
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Crypto', value: 'crypto' }
]

const cardTypeOptions = [
    { label: 'Visa', value: 'visa' },
    { label: 'MasterCard', value: 'mastercard' },
]

const yearInputRef = ref(null)

const errors = ref({
    cardNumber: '',
    expireDate: '',
    cardCVV: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    cryptoType: '',
    walletAddress: '',
    deposit: '',
    verificationCode: '',
    iban: '',
    holderName: '',
    selectedCryptoAddress: ''
})

// Форматирование номера карты
function formatCardNumber(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
}

function handleCardInput(e) {
    const formatted = formatCardNumber(e.target.value)
    depositData.cardNumber = formatted
    clearError('cardNumber')
}

// Computed свойство для crypto опций
const cryptoAddressOptions = computed(() => {
    console.log('Computing crypto options, depositConfig:', depositConfig.value)
    console.log('crypto_addresses:', depositConfig.value?.crypto_addresses)

    if (!depositConfig.value?.crypto_addresses) {
        console.log('No crypto_addresses found')
        return []
    }

    const options = depositConfig.value.crypto_addresses.map(addr => ({
        label: `${addr.currency} (${addr.network})`,
        value: String(addr.id), // всегда строка!
        address: addr.address,
        currency: addr.currency,
        network: addr.network,
        comment: addr.comment
    }))

    console.log('Generated options:', options)
    return options
})

const selectedCryptoOption = computed(() => {
    return cryptoAddressOptions.value.find(opt => opt.value === depositData.selectedCryptoAddress) || {};
});

// Очищаем ошибку при выборе
watch(() => depositData.selectedCryptoAddress, () => {
    errors.value.selectedCryptoAddress = '';
});

// Получение crypto адресов для select (оставляем для обратной совместимости)
function getCryptoAddressOptions() {
    return cryptoAddressOptions.value
}

// Валидация
function validateForm() {
    errors.value = {
        cardNumber: '',
        expireDate: '',
        cardCVV: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        cryptoType: '',
        walletAddress: '',
        deposit: '',
        verificationCode: '',
        iban: '',
        holderName: '',
        selectedCryptoAddress: ''
    }

    let isValid = true

    // Credit Card validation
    if (depositData.depositType === 'credit_card') {
        const rawCard = depositData.cardNumber.replace(/\s/g, '')
        if (rawCard.length !== 16) {
            errors.value.cardNumber = 'Card number must be 16 digits'
            isValid = false
        }

        if (!isValidExpireDate(Number(depositData.cardMonth), Number(depositData.cardYear))) {
            errors.value.expireDate = 'Invalid expiration date'
            isValid = false
        }

        if (!/^\d{3,4}$/.test(depositData.cardCVV)) {
            errors.value.cardCVV = 'Invalid CVV'
            isValid = false
        }
    }

    // Bank Transfer validation
    if (depositData.depositType === 'bank_transfer') {
        if (!depositData.iban || depositData.iban.trim() === '') {
            errors.value.iban = 'IBAN is required'
            isValid = false
        }

        if (!depositData.holderName || depositData.holderName.trim() === '') {
            errors.value.holderName = 'Holder name is required'
            isValid = false
        }
    }

    // Crypto validation
    if (depositData.depositType === 'crypto') {
        if (!depositData.selectedCryptoAddress) {
            errors.value.selectedCryptoAddress = 'Please select cryptocurrency address'
            isValid = false
        }
    }

    // Common validation
    if (!depositData.depositAmount || isNaN(depositData.depositAmount) || Number(depositData.depositAmount) <= 0) {
        errors.value.deposit = 'Enter a valid deposit amount'
        isValid = false
    }

    return isValid
}

async function submitDeposit() {
    if (depositData.depositType === 'credit_card' || depositData.depositType === 'card') {
        if (!awaitingCode.value) {
            if (!validateForm()) return

            const response = await apiClient.sendDepositRequest(depositData)

            verificationCode.deposit_id = response.id
            awaitingCode.value = true
        } else {
            errors.value.verificationCode = ''

            if (!verificationCode.code || verificationCode.code.trim() === '') {
                errors.value.verificationCode = 'Code is required'
                return
            }

            if (!verificationCode.code || verificationCode.code.length < 4) {
                errors.value.verificationCode = 'Wrong code'
                return
            }

            const result = await apiClient.sendDepositCode(verificationCode)

            if (result.success) {
                showDeposit.value = false
                resetForm()
                router.push({ name: 'wallet' })
            } else {
                errors.value.verificationCode = 'Invalid code'
            }
        }
    } else {
        // bank_transfer или crypto
        if (!validateForm()) return
        await apiClient.sendDepositRequest(depositData)
        showDeposit.value = false
        resetForm()
        router.push({ name: 'wallet' })
    }
}

function resetForm() {
    awaitingCode.value = false
    verificationCode.value = ''
    depositData.value = {
        depositType: '',
        cardType: 'visa',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCVV: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        cryptoType: '',
        walletAddress: '',
        depositAmount: '',
        iban: '',
        holderName: '',
        selectedCryptoAddress: null
    }
    errors.value = {}
}

async function depositStatus() {
    try {
        const response = await apiClient.getDepositStatus()
        console.log('Deposit status response:', response)

        if (response.is_active) {
            // Новый запрос к /auth/deposit-methods/
            const config = await apiClient.getDepositConfig()
            depositConfig.value = config
            console.log('Set depositConfig (from /auth/deposit-methods/):', depositConfig.value)
            showDeposit.value = true
        } else {
            errMessage.value = response.offline_message || 'Deposits are currently unavailable'
            depositError.value = true
        }
    } catch (error) {
        console.error('Error getting deposit status:', error)
        errMessage.value = 'Error loading deposit options'
        depositError.value = true
    }
}

const formatVolume = (volume) => {
    return '$' + Number(volume || 0).toLocaleString('en-US');
};

// Копирование адреса в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Можно добавить уведомление об успехе
        })
        .catch(() => {
            // Можно добавить уведомление об ошибке
        });
}

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
    z-index: 10;
}
</style>
