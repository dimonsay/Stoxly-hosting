<template>
    <div class="markets-news-wrapper">
        <div class="container flex justify-between">
            <div class="lates-news-wrapper">
                <div class="pageTitle">
                    Latest News
                </div>

                <div class="news-wrapper flex flex-col">
                    <div v-if="isLoading && displayedNews.length === 0" class="loading-message">
                        Loading news...
                    </div>
                    <div v-else-if="displayedNews.length === 0" class="no-news-message">
                        No news available
                    </div>
                    <div class="news page-tile tile-hover flex flex-col justify-between" v-for="news in displayedNews">
                        <div class="top flex justify-between mb10" style="align-items: center;">
                            <div class="news-category">{{ news.category.name }}</div>
                            <div class="news-date grey">{{ formatDate(news.created_at) }}
                            </div>
                        </div>
                        <div class="news-title mb10">{{ news.title }}</div>
                        <div class="news-description grey mb10">{{ truncateText(news.text) }}</div>

                        <div class="read-more flex blue mb10" style="align-items: center;" @click="openNews(news)">
                            <div class="text">Read more</div>
                            <i class="pi pi-arrow-right"></i>
                        </div>
                    </div>

                    <div v-if="hasMoreNews" class="load-more bc-blue pointer" @click="loadMore"
                        :class="{ 'loading': isLoading }">
                        {{ isLoading ? 'Loading...' : 'Load more' }}
                    </div>
                </div>
            </div>

            <div class="indexes-wrapper page-tile">
                <div class="pageTitle ">Market Prices</div>

                <div class="index underlined flex justify-between" style="align-items: center;"
                    v-for="asset in priceHistory">
                    <div class="index-name">{{ asset.asset_symbol }}</div>
                    <div class="price-trend flex flex-col">
                        <div class="index-price"> {{ formatVolume(asset.current_price) }}</div>
                        <div class="index-trend flex" style="align-items: center;"
                            :class="{ 'green': parseFloat(asset.change_percent) > 0 }">
                            <div class="plus" :class="{ 'hidden': parseFloat(asset.change_percent) < 0 }">+</div>
                            <div class="minus" :class="{ 'hidden': parseFloat(asset.change_percent) > 0 }">-</div>
                            {{ asset.change_percent }}%
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

.load-more.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.load-more.loading:hover {
    color: inherit;
    background-color: inherit;
    outline: none;
    box-shadow: none;
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

.loading-message,
.no-news-message {
    text-align: center;
    padding: 20px;
    font-size: 1.1rem;
    color: #666;
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const allNews = reactive([])
const displayedNews = reactive([])
const currentPage = ref(1)
const newsPerPage = 3
const isLoading = ref(false)
const priceHistory = reactive([])

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// Вычисляемое свойство для проверки наличия еще новостей
const hasMoreNews = computed(() => {
    return displayedNews.length < allNews.length;
});

onMounted(async () => {
    // Загружаем новости и цены независимо друг от друга
    loadAllNews();
    loadPriceHistory();
});

async function loadAllNews() {
    isLoading.value = true;
    try {
        const data = await apiClient.getNews();
        allNews.splice(0, allNews.length, ...data);
        // Показываем первые 3 новости
        displayedNews.splice(0, displayedNews.length, ...allNews.slice(0, newsPerPage));
    } catch (err) {
        console.error('Error loading news:', err);
        // Временно используем заглушку при ошибке API
        const fallbackNews = [
            {
                id: 1,
                title: 'Market Update: Tech Stocks Rally',
                text: 'Technology stocks showed strong performance today with major gains across the sector. Investors are optimistic about upcoming earnings reports.',
                category: { name: 'Market News' },
                created_at: '2025-07-13T10:00:00Z'
            },
            {
                id: 2,
                title: 'Cryptocurrency Market Analysis',
                text: 'Bitcoin and other cryptocurrencies experienced significant volatility this week. Analysts suggest this could be due to regulatory developments.',
                category: { name: 'Crypto' },
                created_at: '2025-07-12T15:30:00Z'
            },
            {
                id: 3,
                title: 'Federal Reserve Policy Update',
                text: 'The Federal Reserve announced new monetary policy measures aimed at stabilizing the economy. Markets reacted positively to the news.',
                category: { name: 'Economy' },
                created_at: '2025-07-11T14:20:00Z'
            },
            {
                id: 4,
                title: 'Earnings Season Preview',
                text: 'Major companies are preparing to release their quarterly earnings reports. Analysts expect strong performance from tech and healthcare sectors.',
                category: { name: 'Earnings' },
                created_at: '2025-07-10T09:15:00Z'
            },
            {
                id: 5,
                title: 'Global Market Trends',
                text: 'International markets showed mixed results this week. European markets gained while Asian markets faced some challenges.',
                category: { name: 'Global' },
                created_at: '2025-07-09T16:45:00Z'
            }
        ];
        allNews.splice(0, allNews.length, ...fallbackNews);
        displayedNews.splice(0, displayedNews.length, ...fallbackNews.slice(0, newsPerPage));
    } finally {
        isLoading.value = false;
    }
}

function loadMore() {
    if (isLoading.value) return;

    isLoading.value = true;

    // Вычисляем следующую порцию новостей
    const nextStart = displayedNews.length;
    const nextEnd = nextStart + newsPerPage;
    const nextNews = allNews.slice(nextStart, nextEnd);

    // Добавляем новые новости к отображаемым
    displayedNews.push(...nextNews);

    isLoading.value = false;
}

async function loadPriceHistory() {
    try {
        const data = await apiClient.getPriceHistory();
        priceHistory.splice(0, priceHistory.length, ...data);
    } catch (err) {
        console.error('Error loading price history:', err);
        // Временно используем заглушку при ошибке API
        const fallbackData = [
            { asset_symbol: 'NVDA', current_price: '159.53', change_percent: '1.45' },
            { asset_symbol: 'TSLA', current_price: '318.13', change_percent: '0.79' },
            { asset_symbol: 'NKE', current_price: '76.60', change_percent: '0.27' },
            { asset_symbol: 'NEO-USD', current_price: '5.61', change_percent: '0.87' },
            { asset_symbol: 'BTC.B-USD', current_price: '109158.00', change_percent: '0.48' }
        ];
        priceHistory.splice(0, priceHistory.length, ...fallbackData);
    }
}

const openNews = (newsItem) => {
    router.push({
        name: 'NewsDetails',
        params: { id: newsItem.id }
    });
};







const formatVolume = (volume) => {
    return volume.toLocaleString('en-US');
};

</script>