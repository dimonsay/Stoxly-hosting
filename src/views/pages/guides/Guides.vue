<template>
    <div class="market-guides-wrapper">
        <div class="container">

            <div class="container-wrapper flex justify-between">
                <div class="guides-wrapper">
                    <div class="pageTitle">
                        Featured Guides
                    </div>

                    <div class="guides-tiles-wrapper grid">
                        <div class="guide-tile page-tile flex flex-col tile-hover" v-for="guide in guides"
                            @click="openGuide(guide)">
                            <div class="tile-icon top flex justify-between" style="align-items: center;">
                                <i class="pi pi-book blue"></i>
                                <div class="level" :class="{
                                    'bc-green': capitalize(guide.category) == 'Beginner',
                                    'bc-violet': capitalize(guide.category) == 'Advanced',
                                    'bc-dark-blue': capitalize(guide.category) == 'Intermediate',
                                }">{{ capitalize(guide.category) }}</div>
                            </div>

                            <div class="guide flex flex-col">
                                <div class="guide-title">{{ guide.title }}</div>
                                <div class="guide-description grey">{{ guide.text }}</div>
                            </div>

                            <div class="categories grey">
                                <div class="category" v-for="category in guide.tags">
                                    {{ category.name }}
                                </div>
                            </div>

                            <div class="read-guide blue flex" style="margin-top: 20px; align-items: center;">
                                <div class="text">Read guide</div>
                                <i class="pi pi-arrow-right" style="font-size: 12px; margin-left: 5px;"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="right flex flex-col">
                    <div class="articles-wrapper page-tile w450">
                        <div class="page-title ">Popular Articles</div>

                        <div class="articles flex mb10" style="align-items: center;" v-for="article in articles">
                            <i class="pi pi-arrow-right blue"></i>
                            <div class="article-description grey pointer"> {{ capitalize(article.title) }}</div>
                        </div>
                    </div>
                    <div class="path-wrapper w450 page-tile">
                        <div class="page-title ">Learning Paths</div>

                        <div class="path-wrapper flex flex-col">
                            <div class="path flex flex-col underlined" v-for="path in pathes">
                                <div class="path-title mb5">{{ path.title }}</div>
                                <div class="path-description grey mb5">{{ path.description }}</div>
                                <div class="view-path blue flex pointer" style="align-items: center;">
                                    <div class="text-path" style="margin-right: 10px;">View path</div>
                                    <div class="pi pi-arrow-right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.mb5 {
    margin-bottom: 5px;
}

.mb10 {
    margin-bottom: 10px;
}

.article-description {
    font-size: 1.2rem;
}

.page-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.path {
    padding: 5px 0;
}

.path-title {
    font-size: 1.2rem;
    font-weight: 600;
}

.underlined {
    border-bottom: .5px solid #616161;
}

.article-description:hover,
.view-path:hover .text-path {
    text-decoration: 1px underline solid #33c3f0 !important;
}

.w450 {
    width: 420px;
    margin: 0 auto;
    margin-top: 10px;
}

.articles-title {
    font-size: 1.4rem;
    font-weight: bold;
}

.pi-arrow-right {
    font-size: 12px;
    margin-right: 10px;
}

.guides-wrapper {
    width: 65%;
}

.right {
    margin-top: 3rem;
    width: 40%;
}

.read-guide {
    max-width: fit-content;
    font-size: 1.2rem;
}

.read-guide:hover .text {
    transition: ease-in-out .3s;
    text-decoration: underline solid 1px;
}

.pi-arrow-right {
    transition: transform 0.3s ease-in-out;
}

.read-guide:hover .pi-arrow-right {
    transform: rotate(180deg);
}

.pi-book {
    font-size: 1.4rem;
}

.bc-dark-blue {
    background-color: #1d4ed8;
}

.guides-tiles-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: 2rem;
}

.level {
    border-radius: 8px;
    padding: 3px 10px;
}

.guide-title {
    font-weight: bold;
    font-size: 1.4rem;
    padding: 10px 0;
}

.categories {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-content: flex-start;
    min-height: 2rem;
}

.category {
    border-radius: 4px;
    background-color: #1d283a;
    padding: 5px 10px;
    font-size: 12px;
}

.market-guides-wrapper {
    padding: 40px 0;
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const guides = reactive([]);
const articles = reactive([])

const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const openGuide = (guide) => {
    router.push({
        name: 'GuideDetails',
        params: { id: guide.id },
        state: guide
    });
};

onMounted(async () => {
    try {
        const data = await apiClient.getGuides();
        const popularData = await apiClient.getGuidesPopular();

        articles.splice(0, articles.length, ...popularData)
        guides.splice(0, guides.length, ...data);
    } catch (err) {
        console.error(err);
    }
});

const pathes = reactive([
    { title: 'New Investor', description: 'Perfect for those starting their investment journey' },
    { title: 'Active Trader', description: 'For those looking to enhance trading skills and strategies' },
    { title: 'Global Investor', description: 'Focus on international markets and global diversification' },
])

</script>