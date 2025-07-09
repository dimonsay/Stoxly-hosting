<template>
    <div class="trading-markets-wrapper page-tile dashboard-tile flex flex-col gap-5">
        <div class="flex">
            <div class="trading-market-categorie pointer text-xl" v-for="item in categories" :key="item.value"
                :class="{ 'active-categorie': selectedCategory === item.value }" @click="selectedCategory = item.value">
                {{ item.label }}
            </div>
        </div>


        <div class="trade-block-title flex justify-between items-center">
            <div class="category-title text-xl font-semibold">
                {{categories.find(cat => cat.value === selectedCategory)?.label || ''}} Market Overview
            </div>

            <IconField style="display: flex; align-items: center; position: relative;">
                <InputIcon class="pi pi-search"
                    style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);" />
                <InputText v-model="search" type="text" autocomplete="off" placeholder="Search..." class="block mb-5"
                    style="max-width: 320px; min-width: 270px; padding-left: 40px;" />
            </IconField>

        </div>

        <div class="filtered-items flex flex-col gap-5 ">
            <div class="filtered-item flex flex-col align-center justify-between p-5 bg-gray-700 rounded-xl select-none"
                v-for="item in instruments" :key="item.symbol">
                <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-3">
                        <div class="filtered-item-name text-xl font-semibold">{{ item.name.toUpperCase() }}</div>
                        <div class="filtered-item-symbol grey">{{ item.symbol.toUpperCase() }}</div>
                    </div>

                    <div class="flex flex-col gap-3 text-right">
                        <div class="filtered-item-toBuy text-green-500">
                            Price to buy: ${{ Number(item.price).toFixed(2) }}
                        </div>
                        <div class="filtered-item-toSell text-red-500">
                            Price to sell: ${{ Number(item.price).toFixed(2) }}
                        </div>
                    </div>

                </div>

                <div class="buttons-wrapper grid grid-cols-2 text-center gap-4 mt-2">
                    <div class="buy-btn button-item pointer p-2 bg-green-600 rounded hover:bg-green-600/80"
                        @click="openTradePopup(item, 'buy')">Buy</div>
                    <div class="sell-btn button-item pointer p-2 bg-red-600 hover:bg-red-600/80 rounded"
                        @click="openTradePopup(item, 'sell')">Sell</div>
                </div>
            </div>
            <Dialog v-model:visible="showTradePopup" modal
                :header="`Confirm ${tradeType === 'buy' ? 'Purchase' : 'Sale'}`" :style="{ width: '600px' }"
                :draggable="false" :modal="false">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-3">
                        <div class="dialog-title flex flex-col gap-2">


                            <div class="popup-details flex justify-between text-lg font-semibold flex-col">
                                <div class="popup-name">Name: {{ selectedItem?.name }}</div>
                                <div class="popup-symbol">Symbol: {{ selectedItem?.symbol }}</div>
                                <div class="popup-price">Price: ${{ Number(selectedItem?.price).toFixed(2) }}
                                </div>

                                <div>
                                    Quantity:
                                    <InputNumber size="small" v-model="tradeQuantity" :min="1" :step="1" showButtons />
                                </div>

                                <div class="total-price text-lg my-3">Total price : ${{
                                    Number(tradeQuantity
                                        *
                                        selectedItem.price).toFixed(2) }}</div>
                            </div>


                        </div>




                    </div>

                    <Button :label="tradeType === 'buy' ? 'Confirm Purchase' : 'Confirm Sale'" class=""
                        @click="confirmTrade" />
                    <Button label="Cancel" class="p-button-secondary" @click="showTradePopup = false" />
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
</style>

<script setup>
import apiClient from '@/api/axios';
import { InputNumber, InputText } from 'primevue';
import { onMounted, ref, watch } from 'vue';

const categories = ref([]);
const selectedCategory = ref('');
const search = ref('');
const instruments = ref([]);
const instrumentsLoad = ref(8);

const showTradePopup = ref(false);
const selectedItem = ref(null);
const tradeType = ref('buy');
const tradeQuantity = ref(1);

function openTradePopup(item, type) {
    selectedItem.value = item;
    tradeType.value = type;
    tradeQuantity.value = 1;
    showTradePopup.value = true;
}

async function confirmTrade() {
    if (!selectedItem.value || tradeQuantity.value < 1) return;

    if (tradeType.value === 'buy') {
        await buyAsset(selectedItem.value.id, tradeQuantity.value);
    } else {
        await sellAsset(selectedItem.value.id, tradeQuantity.value);
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
    await fetchInstruments();
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
        await apiClient.buyAsset(id, quantity);
        emit('update-balance');
    } catch (error) {
        console.error('Ошибка при покупке:', error);
    }
};

const sellAsset = async (id, quantity = 1) => {
    try {
        await apiClient.sellAsset(id, quantity);
        emit('update-balance');
    } catch (error) {
        console.error('Ошибка при продаже:', error);
    }
};
</script>
