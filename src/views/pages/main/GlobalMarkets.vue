<template>
    <div class="gloval-markets-wrapper">
        <div class="container">
            <div class="block-title">Discover Opportunities Worldwide</div>
            <div class="block-description">
                Invest easily in thousands of assets—from stocks to commodities—across global markets at your
                fingertips.
            </div>

            <div class="top-companies-wrapper flex justify-between">
                <div class="top-companies">
                    <div class="top-title">Top Companies This Week</div>
                    <div class="company-details-wrapper" v-for="company in selectedAssets" :key="company.symbol">
                        <div class="company-details flex justify-between items-center">
                            <div class="company-title-wrapper">
                                <div class="companie-title">{{ company.name }}</div>
                                <div class="stock-name">{{ company.symbol }}</div>
                            </div>
                            <div class="trend-wrapper flex" v-if="company.change_percent"
                                :class="{ red: company.change_percent < 0, green: company.change_percent > 0 }">
                                <div class="trend">
                                    <div class="arrow" :class="{ hidden: company.change_percent > 0 }">
                                        <i class="fa-solid fa-arrow-trend-down"></i>
                                    </div>
                                    <div class="arrow" :class="{ hidden: company.change_percent < 0 }">
                                        <i class="fa-solid fa-arrow-trend-up"></i>
                                    </div>
                                </div>
                                <div class="profit">{{ company.change_percent ?? '0.00' }}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="categories">
                    <div class="categories-title category-title">Categories</div>
                    <div class="categories-wrapper" v-for="category in nonEmptyCategories" :key="category.category">
                        <div class="category-name company-details flex items-center text-semibold"
                            :class="{ active: category.category === selectedCategory }"
                            @click="selectedCategory = category.category">
                            {{ formatCategory(category.category) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import apiClient from '@/api/axios';
import { computed, onMounted, ref } from 'vue';

const rawData = ref([]);
const selectedCategory = ref('stocks'); // начальная категория


onMounted(async () => {
    const response = await apiClient.getAssetsDisplayed();
    rawData.value = response;
    console.log(rawData.value)
});

function formatCategory(name) {
    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

const nonEmptyCategories = computed(() =>
    rawData.value.filter(c => c.assets && c.assets.length > 0)
);

const selectedAssets = computed(() => {
    const found = rawData.value.find(c => c.category === selectedCategory.value);
    return found?.assets || [];
});


</script>

<style scoped>
.category-name.active {
    background-color: #2d3b52;
}

.profit {
    width: 60px;
    text-align: right;
}

.categories {
    height: 100%;
    width: 30%;
}

.top-companies-wrapper {
    margin-top: 40px;
}

.gloval-markets-wrapper {
    padding: 20px 0;
}

.trend {
    margin-right: 0px;
}

.red {
    color: #eb6c6d;
}

.green {
    color: green
}

.company-details {
    height: 64px;
    font-size: 14px;
    padding: 10px 20px;
    border: 1px solid #1d283a;
    background-color: #161a23;
}

.category-name {
    font-size: 18px;
}

.company-details:hover {
    cursor: pointer;
    background-color: #1a212e;
}

.category-title,
.top-title {
    font-size: 20px;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #1d283a;
    padding: 10px 15px;
}

.top-companies-wrapper {
    width: 100%;
}

.top-companies {
    width: 60%;
}
</style>