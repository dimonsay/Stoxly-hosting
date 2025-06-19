<template>
    <div class="markets-news-wrapper">
        <div class="container flex justify-between">
            <div class="lates-news-wrapper">
                <div class="pageTitle">
                    Latest News
                </div>

                <div class="news-wrapper flex flex-col">
                    <div class="news page-tile tile-hover flex flex-col justify-between" v-for="news in news">
                        <div class="top flex justify-between mb10" style="align-items: center;">
                            <div class="news-category">{{ news.category }}</div>
                            <div class="news-date grey">{{ news.date }}</div>
                        </div>
                        <div class="news-title mb10">{{ news.title }}</div>
                        <div class="news-description grey mb10">{{ news.description }}</div>

                        <div class="read-more flex blue mb10" style="align-items: center;">
                            <div class="text">Read more</div>
                            <i class="pi pi-arrow-right"></i>
                        </div>
                    </div>

                    <div class="load-more bc-blue pointer" @click="loadMore">Load more</div>
                </div>
            </div>

            <div class="indexes-wrapper page-tile">
                <div class="pageTitle ">Major indexes</div>

                <div class="index underlined flex justify-between" style="align-items: center;"
                    v-for="index in indexes">
                    <div class="index-name">{{ index.index }}</div>
                    <div class="price-trend flex flex-col">
                        <div class="index-price"> {{ formatVolume(index.price) }}</div>
                        <div class="index-trend flex" style="align-items: center;"
                            :class="{ 'green': index.trend > 0 }">
                            <div class="plus" :class="{ 'hidden': index.trend < 0 }">+</div>
                            <div class="minus" :class="{ 'hidden': index.trend > 0 }">-</div>
                            {{ index.trend }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.index-name {
    font-size: 1.2rem;
}

.index-trend {
    justify-content: flex-end;
}

.load-more {
    text-align: center;
    padding: 10px;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 8px;
}

.load-more:hover {
    color: #33c3f0;
    background-color: transparent;
    outline: 1px solid #33c3f0;
    box-shadow: 0em 0 0.6em #33c3f0;
}

.mb10 {
    margin-bottom: 10px;
}

.news {
    margin-bottom: 20px;
}

.news-title {
    font-size: 1.4rem;
    font-weight: bold;
}

.news-description {
    font-size: 1.1rem;
}

.news-category {
    padding: 3px 15px;
    background-color: #1d283a;
    border-radius: 6px;
}

.read-more .text {
    font-size: 1.1rem;
    margin-right: 5px;
}

.pi-arrow-right {
    font-size: .8rem;
    transition: transform ease-in-out .3s;
}

.news:hover .text {
    transition: ease-in-out .3s;
    text-decoration: underline solid 1px;
}

.news:hover .pi-arrow-right {
    transform: rotate(180deg);
}

.indexes-wrapper {
    max-height: fit-content;
}

.index {
    padding: 10px 0;
    margin-top: 10px;
    min-width: 300px;
}

.underlined {
    border-bottom: .5px solid #616161;
}

.lates-news-wrapper {
    width: 65%;
}

.pageTitle {
    font-size: 2rem !important;
}
</style>

<script setup>
import { reactive } from 'vue';

function loadMore() {
    return 0;
}

const indexes = reactive([
    { index: 'S&P 500', price: 5284.25, trend: 1.3 },
    { index: 'Nasdaq', price: 16589.10, trend: 1.8 },
    { index: 'Dow Jones', price: 39425.67, trend: 0.9 },
    { index: 'FTSE 100', price: 8145.30, trend: 0.7 },
    { index: 'Nikkei 225', price: 38750.80, trend: 1.5 },
    { index: 'DAX', price: 18325.45, trend: 1.1 },
])

const news = reactive([
    { title: 'Global Markets Rally on Economic Data', description: 'Stock markets worldwide surge after positive economic indicators and central bank announcements.', category: 'Global Markets', date: 'May 15, 2025' },
    { title: 'Tech Sector Leads as AI Investments Grow', description: 'Technology companies see significant gains as artificial intelligence adoption accelerates across industries.', category: 'Technology', date: 'May 14, 2025' },
    { title: 'Energy Transition Reshaping Commodities Market', description: 'Renewable energy momentum continues to impact traditional energy commodities and create new investment opportunities.', category: 'Energy', date: 'May 13, 2025' },
    { title: 'Central Banks Signal Rate Strategy Shift', description: 'Major central banks indicate potential policy changes that could impact global bond and currency markets.', category: 'Economics', date: 'May 12, 2025' },
    { title: 'Emerging Markets Show Strong Growth Potential', description: 'Analysts highlight opportunities in select emerging markets based on economic reforms and growth forecasts.', category: 'Emerging Markets', date: 'May 11, 2025' },
    { title: 'Supply Chain Innovations Drive Logistics Sector', description: 'Companies implementing advanced supply chain technologies report improved efficiency and reduced costs.', category: 'Logistics', date: 'May 10, 2025' },
])

const formatVolume = (volume) => {
    return volume.toLocaleString('en-US');
};

</script>