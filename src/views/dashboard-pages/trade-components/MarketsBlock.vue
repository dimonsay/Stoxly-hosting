<template>
    <div class="trading-markets-wrapper page-tile dashboard-tile flex flex-col gap-5">
        <div class="flex">
            <div class="trading-market-categorie pointer text-xl" v-for="item in categories" :key="item.value"
                :class="{ 'active-categorie': selectedCategory === item.value }" @click="selectedCategory = item.value">
                {{ item.label }}
            </div>
        </div>

        <div class="trade-block-title flex justify-between items-center trade-block-title-row">
            <div class="category-title text-xl font-semibold mb-2">
                {{categories.find(cat => cat.value === selectedCategory)?.label || ''}} Market Overview
            </div>
            <IconField style="display: flex; align-items: center; position: relative; margin-bottom: 0;">
                <InputIcon class="pi pi-search"
                    style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);" />
                <InputText v-model="search" type="text" autocomplete="off" placeholder="Search..." class="block mb-5"
                    style="max-width: 320px; min-width: 270px; padding-left: 40px;" />
            </IconField>
        </div>

        <div class="filtered-items flex flex-col gap-5 ">
            <div class="filtered-item flex flex-col align-center justify-between p-5 bg-gray-700 rounded-xl select-none"
                v-for="item in instruments" :key="item.symbol">
                <!-- Desktop: symbol сверху, name под ним, справа buy/sell; Mobile: как было -->
                <div class="flex flex-col md:flex-row md:items-stretch md:justify-between w-full mobile-asset-row">
                    <!-- Левая колонка: symbol сверху, name под ним -->
                    <div
                        class="flex flex-col md:justify-between md:items-start gap-1 w-full md:w-auto md:min-w-[180px]">
                        <div class="filtered-item-name text-xl font-semibold mobile-asset-name">
                            {{ item.name.toUpperCase() }}
                        </div>
                        <div class="filtered-item-symbol grey mobile-asset-symbol md:mb-2">
                            {{ item.symbol.toUpperCase() }}
                        </div>
                    </div>
                    <!-- Правая колонка: buy сверху, sell снизу (только для десктопа) -->
                    <div
                        class="hidden md:flex flex-col justify-center items-end md:ml-8 md:w-auto w-full mt-2 md:mt-0 text-center">
                        <div class="buy-btn button-item pointer p-2 bg-green-600 rounded hover:bg-green-600/80 min-w-[150px] w-full md:w-[150px] mb-2"
                            @click="openTradePopup(item, 'buy')">Buy: ${{
                                Number(item.price_buy).toFixed(2) }}</div>
                        <div class="sell-btn button-item pointer p-2 bg-red-600 hover:bg-red-600/80 rounded min-w-[150px] w-full md:w-[150px]"
                            @click="openTradePopup(item, 'sell')">Sell: ${{
                                Number(item.price_sell).toFixed(2) }}</div>
                    </div>
                </div>
                <!-- Кнопки для мобильной версии (снизу карточки) -->
                <div class="flex md:hidden mobile-asset-buttons mt-3">
                    <div class="buy-btn button-item pointer p-2 bg-green-600 rounded hover:bg-green-600/80 w-full"
                        @click="openTradePopup(item, 'buy')">Buy: ${{ Number(item.price_buy).toFixed(2) }}</div>
                    <div class="sell-btn button-item pointer p-2 bg-red-600 hover:bg-red-600/80 rounded w-full ml-2"
                        @click="openTradePopup(item, 'sell')">Sell: ${{ Number(item.price_sell).toFixed(2) }}</div>
                </div>
            </div>
            <Dialog v-model:visible="showTradePopup" modal
                :header="`${tradeType === 'buy' ? 'Purchase' : 'Sale'} ${selectedItem?.name || ''}`"
                :style="{ width: dialogWidth }" :draggable="false" :modal="false">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-3">
                        <div class="dialog-title flex flex-col gap-2">
                            <div class="popup-details flex justify-between text-lg font-semibold flex-col">

                                <div
                                    class="asset-wrapper flex items-center justify-between dashboard-tile page-tile mb-5 !px-5">
                                    <div class="flex flex-col gap-2 justify-between">
                                        <div class="popup-name">{{ selectedItem?.name }}</div>
                                        <div class="popup-symbol">{{ selectedItem?.symbol }}</div>
                                    </div>

                                    <div class="flex flex-col gap-2 text-right justify-between">

                                        <div class="popup-price">
                                            Price: ${{ Number(tradeType === 'buy' ? selectedItem?.price_buy :
                                                selectedItem?.price_sell).toFixed(2) }}
                                        </div>
                                        <div class="text-sm text-gray-400" v-if="tradeType === 'sell'">
                                            Available to sell: {{ maxSell }}
                                        </div>
                                    </div>

                                </div>



                                <div>
                                    Quantity:
                                    <InputNumber size="small" v-model="tradeQuantity" :min="1"
                                        :max="tradeType === 'sell' ? maxSell : null" :step="1" showButtons />
                                </div>

                                <div class="total-price text-lg my-3">Total price : ${{
                                    Number(tradeQuantity
                                        *
                                        (tradeType === 'buy' ? selectedItem.price_buy : selectedItem.price_sell)).toFixed(2)
                                }}</div>
                            </div>
                        </div>

                    </div>

                    <div class="flex flex-col gap-2">
                        <Button :label="tradeType === 'buy' ? 'Confirm Purchase' : 'Confirm Sale'" class=""
                            @click="confirmTrade" />
                        <Button label="Cancel" class="p-button-secondary" @click="showTradePopup = false" />

                        <!-- Ссылки для шаринга -->
                        <div class="share-links flex gap-2 justify-center mt-3 pt-3 border-t border-gray-600">
                            <span class="cursor-pointer text-blue-400 hover:text-blue-300 text-sm"
                                @click="copyTradeLink(selectedItem.symbol)">
                                Share Asset Link
                            </span>
                        </div>
                    </div>
                    <div v-if="buyError" class="text-red-500 text-sm mb-2 text-center">
                        {{ buyError }}
                    </div>
                </div>
            </Dialog>
        </div>


        <div class="load-more-btn invest-btn text-xl p-2 w-full pointer text-center"
            v-if="instruments.length > instrumentsLoad" @click="loadMore">Load more</div>
    </div>
</template>


<style scoped>
.trading-market-categorie {
    padding: 5px 10px;
    border-radius: 4px;
}

.active-categorie {
    background-color: #33c3f0;
}

.p-dialog-mask.p-component-overlay {
    background-color: transparent !important;
}

.button-item {
    transition: ease-in-out 0.3s;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {

    .trading-market-categories,
    .trading-markets-wrapper>.flex {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 15px;
    }

    .trading-market-categorie {
        min-width: 90px;
        text-align: center;
        margin-bottom: 4px;
    }

    .trading-market-instruments {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .trading-market-instrument {
        padding: 15px;
    }

    .trading-market-instrument-title {
        font-size: 1.1rem;
    }

    .trading-market-instrument-symbol {
        font-size: 0.9rem;
    }

    .trading-market-instrument-price {
        font-size: 1rem;
    }

    .trading-market-instrument-change {
        font-size: 0.9rem;
    }

    .trading-market-instrument-buttons {
        flex-direction: column;
        gap: 8px;
    }

    .trading-market-instrument-button {
        width: 100%;
        padding: 8px;
        font-size: 0.9rem;
    }

    .mobile-asset-row {
        flex-direction: row !important;
        align-items: center !important;
        gap: 8px;
        display: flex !important;
        justify-content: space-between !important;
    }

    .mobile-asset-name {
        font-size: 1rem !important;
        font-weight: 600;
        margin-right: 0;
        display: block;
    }

    .mobile-asset-symbol {
        font-size: 0.92rem !important;
        color: #33c3f0 !important;
        font-weight: 500;
        display: block;
    }

    .mobile-asset-buttons {
        flex-direction: row;
        gap: 8px !important;
        margin-top: 8px !important;
        width: 100%;
    }

    .buy-btn,
    .sell-btn {
        width: 100% !important;
        min-width: 0 !important;
        font-size: 0.98rem !important;
        padding: 10px 0 !important;
        text-align: center !important;
    }

    .trade-block-title-row {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 8px !important;
    }

    .category-title {
        margin-bottom: 0 !important;
    }
}

@media screen and (min-width: 769px) {
    .mobile-asset-buttons {
        flex-direction: column;
        gap: 8px;
        margin-top: 0;
        align-items: flex-end;
    }

    .buy-btn,
    .sell-btn {
        width: 150px !important;
        min-width: 150px !important;
    }
}

@media screen and (max-width: 480px) {
    .trading-market-categories {
        gap: 6px;
        margin-bottom: 12px;
    }

    .trading-market-categorie {
        padding: 6px 10px;
        font-size: 0.8rem;
    }

    .trading-market-instrument {
        padding: 12px;
    }

    .trading-market-instrument-title {
        font-size: 1rem;
    }

    .trading-market-instrument-symbol {
        font-size: 0.8rem;
    }

    .trading-market-instrument-price {
        font-size: 0.9rem;
    }

    .trading-market-instrument-change {
        font-size: 0.8rem;
    }

    .trading-market-instrument-button {
        padding: 6px;
        font-size: 0.8rem;
    }
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { InputNumber, InputText } from 'primevue';
import { computed, onMounted, ref, watch } from 'vue';

// Props для получения параметров из URL
const props = defineProps({
    symbol: {
        type: String,
        default: null
    },
    action: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: null
    }
});

const categories = ref([]);
const selectedCategory = ref('');
const search = ref('');
const instruments = ref([]);
const instrumentsLoad = ref(8);

const showTradePopup = ref(false);
const selectedItem = ref(null);
const tradeType = ref('buy');
const tradeQuantity = ref(1);

const maxSell = ref(0);
const buyError = ref('');

const hasOpenedFromUrl = ref(false);

async function openTradePopup(item, type) {
    selectedItem.value = item;
    tradeType.value = type;
    tradeQuantity.value = 1;
    showTradePopup.value = true;
    buyError.value = '';

    if (type === 'sell') {
        try {
            const response = await apiClient.getCurrentPortfolio('', '', 100, 1, item.asset_id);
            maxSell.value = Number(response[0]?.quantity || 0);
        } catch (error) {
            console.error('Ошибка при получении количества в портфеле:', error);
            maxSell.value = 0;
        }
    } else {
        maxSell.value = 0;
    }
}

async function confirmTrade() {
    buyError.value = '';
    if (!selectedItem.value || tradeQuantity.value < 1) return;

    if (tradeType.value === 'buy') {
        const result = await buyAsset(selectedItem.value.asset_id, tradeQuantity.value);
        if (result && result.error) {
            buyError.value = result.error;
            return; // Не закрываем попап
        }
    } else {
        if (tradeQuantity.value <= maxSell.value && maxSell.value > 0) {
            const result = await sellAsset(selectedItem.value.asset_id, tradeQuantity.value);
            if (result && result.error) {
                buyError.value = result.error;
                return;
            }
        } else {
            buyError.value = 'Недостаточно количества для продажи';
            return; // Не закрываем попап
        }
    }

    showTradePopup.value = false;
}

const emit = defineEmits(['update-balance']);

const fetchCategories = async () => {
    try {
        const data = await apiClient.getCategory();
        categories.value = data.categories;
        if (categories.value.length > 0) {
            selectedCategory.value = categories.value[0].value; // 👈 not label!
        }
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
    }
};

const fetchInstruments = async () => {
    try {
        const result = await apiClient.searchAssets(search.value, selectedCategory.value, instrumentsLoad.value);
        instruments.value = result;
    } catch (error) {
        console.error('Ошибка при получении инструментов:', error);
    }
};

onMounted(async () => {
    await fetchCategories();

    // Если указана категория, устанавливаем её
    if (props.category) {
        const categoryExists = categories.value.find(cat => cat.value === props.category);
        if (categoryExists) {
            selectedCategory.value = props.category;
        }
    }

    await fetchInstruments();

    // Обработка параметров из URL
    if (props.symbol && !hasOpenedFromUrl.value) {
        search.value = props.symbol.toUpperCase();
        await fetchInstruments();

        if (props.action && (props.action === 'buy' || props.action === 'sell')) {
            const targetInstrument = instruments.value.find(item =>
                item.symbol.toUpperCase() === props.symbol.toUpperCase()
            );
            if (targetInstrument) {
                setTimeout(() => {
                    if (!hasOpenedFromUrl.value) {
                        openTradePopup(targetInstrument, props.action);
                        hasOpenedFromUrl.value = true;
                    }
                }, 500);
            }
        }
    }
});

watch([selectedCategory, search], () => {
    fetchInstruments();
});

const loadMore = async () => {
    instrumentsLoad.value += 4;
    await fetchInstruments();
};

const buyAsset = async (id, quantity = 1) => {
    try {
        const response = await apiClient.buyAsset(id, quantity);
        emit('update-balance');
        return response;
    } catch (error) {
        if (error.response?.data?.error) {
            return { error: error.response.data.error };
        }
        if (error.response?.data?.message) {
            return { error: error.response.data.message };
        }
        return { error: error.message || 'Ошибка при покупке' };
    }
};

const sellAsset = async (id, quantity = 1) => {
    try {
        const response = await apiClient.sellAsset(id, quantity);
        emit('update-balance');
        return response;
    } catch (error) {
        if (error.response?.data?.error) {
            return { error: error.response.data.error };
        }
        if (error.response?.data?.message) {
            return { error: error.response.data.message };
        }
        return { error: error.message || 'Ошибка при продаже' };
    }
};

const copyTradeLink = async (symbol) => {
    // Используем выбранную категорию, а не props
    const link = `/dashboard/trade/markets?symbol=${encodeURIComponent(symbol)}&category=${encodeURIComponent(selectedCategory.value)}`;
    const fullUrl = `${window.location.origin}${link}`;

    try {
        await navigator.clipboard.writeText(fullUrl);
        showCopyNotification();
    } catch (error) {
        // fallback
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification();
    }
};

// Простое уведомление о копировании
const showCopyNotification = () => {
    // Создаем временное уведомление
    const notification = document.createElement('div');
    notification.textContent = 'Ссылка скопирована!';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(notification);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
};

// Адаптивная ширина для Dialog
const dialogWidth = computed(() => {
    if (window.innerWidth <= 768) {
        return '95vw';
    }
    return '600px';
});
</script>
