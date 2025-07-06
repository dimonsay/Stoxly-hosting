<template>
    <div class="table-wrapper">
        <div class="container">
            <div class="top-wrapper ">
                <div class="table-title-wrapper flex justify-between" style="align-items: center !important;">
                    <div class="block-title">Stock Market Table</div>
                    <IconField style="display: flex; align-items: center;">
                        <InputIcon class="pi pi-search" style="position: absolute; left: 10px;" />
                        <InputText v-model="search" type="text" autocomplete="off" placeholder="Search stocks..."
                            class="block mb-5" @blur="validateUsername(search)" @input="searchAssets('stocks', 8)"
                            :class="{ 'error-border': search }"
                            style="max-width: 320px; min-width: 270px; padding-left: 40px;" />
                    </IconField>
                </div>

            </div>
            <div class="stocks-wrapper">
                <div class="stocks-filters-wrapper flex justify-between">
                    <div class="filter-name filter">Name</div>
                    <div class="filter-symbol filter">Symbol</div>
                    <div class="filter-open	 filter">Open</div>
                    <div class="filter-volume filter">Volume</div>
                    <div class="filter-change filter">Change</div>
                    <div class="filter-change-percentage filter">Change %</div>
                </div>

                <div class="stocks-data-wrapper">
                    <div class="stock-item flex justify-between" v-for="stock in stocks">
                        <div class="stock-name">{{ stock.name }}</div>
                        <div class="stock-symbol">{{ stock.symbol }}</div>
                        <div class="stock-open">${{ stock.open_price }}</div>
                        <div class="stock-volume" style="text-align: center;">{{ formatVolume(stock.volume) }}</div>
                        <div class="stock-change flex" style="justify-content: center; align-items: center;"
                            :class="{ 'red': stock.change_percent < 0, 'green': stock.change_percent > 0 }">
                            <i class="pi pi-arrow-up arrow" :class="{ 'hidden': stock.change_percent < 0 }"></i>
                            <i class="pi pi-arrow-down arrow" :class="{ 'hidden': stock.change_percent > 0 }"></i>
                            {{ stock.change }}
                        </div>
                        <div class="stock-change-percentage flex"
                            :class="{ 'red': stock.change_percent < 0, 'green': stock.change_percent > 0 }">
                            <div class="plus" :class="{ 'hidden': stock.change_percent < 0 }">+</div>
                            {{ stock.change_percent }} %
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-tiles-wrapper flex justify-between" style="align-items: center;">
                <div class="flex justify-between" style="flex-direction: column; min-width: 270px; min-height: 200px;"
                    :class="['page-tile', tile.name], 'flex'" v-for="tile in tiles">
                    <div class="tile-name">{{ tile.name }}</div>

                    <div class="data-wrapper flex justify-between" style="flex-direction: column;">
                        <div class="data-name pointer" v-for="data in tile.data" style="color: #33c3f0;">{{ data.name }}
                            ({{
                                data.symbol }})</div>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script setup>
import apiClient from '@/api/axios';
import { onMounted, reactive, ref } from 'vue';

const search = ref('')
const stocks = reactive([])
const tiles = ref([])

onMounted(async () => {
    searchAssets('stocks', 8);
    loadCategoriesAndSearch();
});

async function loadCategoriesAndSearch() {
    try {
        const response = await apiClient.getCategories();
        const categories = response.categories;

        tiles.value = categories.map(cat => ({
            category: cat.value,
            name: cat.label,
            data: []
        }));

        console.log(tiles)

        await Promise.all(
            tiles.value.map(async (tile) => {
                const results = await apiClient.searchAssets('', tile.category, 3);
                tile.data = Array.isArray(results) ? results : [];
            })
        );



    } catch (err) {
        console.error('Ошибка при загрузке категорий и данных:', err);
    }
}

function formatCategoryName(category) {
    return category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


async function searchAssets(category, items) {
    try {
        const data = await apiClient.searchAssets(search.value, category, items);

        if (!Array.isArray(data)) {
            console.error('Expected array from API, got:', data);
            return;
        }

        stocks.splice(0, stocks.length, ...data);
    } catch (err) {
        console.error(err);
    }
}


const formatVolume = (volume) => {
    const safeVolume = Number(volume || 0); // если null или undefined → 0
    return safeVolume.toLocaleString('en-US');
};


</script>

<style scoped>
.data-wrapper {
    min-height: 100px;
}

.data-name {
    font-size: 16px;
    font-weight: 600;
}

.tile-name {
    font-size: 1.6rem;
    font-weight: bold;
}

.tile-description {
    font-size: 16px;
    color: #D1D5DB;
}

.page-tiles-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    margin-top: 5%;
}

.stock-item:hover {
    cursor: pointer;
    background-color: #252a36;
    transition: ease-in-out 0.15s;
}

.arrow {
    font-size: 10px;
}

.filter {
    font-weight: bold;
    font-size: 16px;
}

.stock-item {
    padding: 10px 20px;
    border-bottom: 1px solid #1d283a;
    font-size: 15px;
}

.filter-name,
.stock-name {
    width: 20%;
}

.stock-symbol {
    color: #33c3f0;
}

.filter-symbol,
.stock-symbol {
    width: 10%;
}

.filter-last-price,
.stock-last-price {
    width: 15%;
}

.filter-volume,
.stock-volume {
    text-align: center;
    width: 20%;
}

.filter-change,
.stock-change {
    text-align: center;
    width: 10%;
}

.filter-change-percentage,
.stock-change-percentage {
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 10%;
}

.stocks-filters-wrapper {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #161a23;
    border-bottom: 1px solid #1d283a;
}

.block-title {
    font-size: 30px;
}

.p-inputicon {
    margin-top: calc(-2.3 * (var(--p-icon-size) / 2));
}
</style>