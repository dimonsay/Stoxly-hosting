<template>
    <Title title="Learn Investing"
        description="Enhance your investment knowledge with our educational resources, courses, and tools"
        class="block" />
    <div class="content-wrapper block">
        <div class="container">


            <div class="courses-content-wrapper" style="margin-bottom: 40px;">
                <div class="pageTitle">Featured Courses</div>
                <div class="courses-wrapper">
                    <div class="course page-tile flex flex-col" v-for="course in courses">
                        <div class="course-top flex justify-between mb10" style="align-items: center;">
                            <div class="course-title">{{ course.title }}</div>
                            <div class="course-level"
                                :class="{ 'bc-dark-blue': course.level == 'Intermediate', 'bc-violet': course.level == 'Advanced', 'bc-green': course.level == 'Beginner' }">
                                {{ course.level }}
                            </div>
                        </div>

                        <div class="course-description grey mb10">{{ course.description }}</div>

                        <div class="courses-levels-wrapper flex mb10" style="align-items: center;">
                            <i class="pi pi-book blue" style="margin-right: 5px;"></i>
                            <div class="courses-lessons">{{ course.lessons }} lessons</div>
                        </div>


                        <div class="start pointer mb10" style="width: 100%; text-align: center;">
                            Start Learning
                        </div>

                    </div>
                </div>
            </div>

            <div class="resources-wrapper">
                <div class="resources page-tile flex flex-col tile-hover">
                    <i class="pi pi-book blue logo"></i>
                    <div class="tile-title">E-books and Guides</div>

                    <div class="resourse-wrapper flex mb10" style="align-items: center;"
                        v-for="resourse in resources.books">
                        <div class="arrow pi pi-arrow-right blue"></div>
                        <div class="resourse-title">{{ resourse }}</div>
                    </div>

                    <div class="view-all blue">View all</div>
                </div>

                <div class="resources page-tile flex flex-col tile-hover">
                    <i class="pi pi-file blue logo"></i>
                    <div class="tile-title">Interactive Tools</div>

                    <div class="resourse-wrapper flex mb10" style="align-items: center;"
                        v-for="resourse in resources.interactive">
                        <div class="arrow pi pi-arrow-right blue"></div>
                        <div class="resourse-title">{{ resourse }}</div>
                    </div>

                    <div class="view-all blue">View all</div>
                </div>

                <div class="resources page-tile flex flex-col tile-hover">
                    <i class="fa fa-graduation-cap blue mb10 logo"></i>
                    <div class="tile-title mb10">Webinars</div>

                    <div class="resourse-wrapper flex mb10" style="align-items: center;"
                        v-for="resourse in resources.webinars">
                        <div class="arrow pi pi-arrow-right blue"></div>
                        <div class="resourse-title"> {{ resourse }} </div>
                    </div>

                    <div class="view-all blue">View all</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

import { reactive } from 'vue';
import Title from '../uikit/Title.vue';

const resources = reactive({
    books: [
        "Beginner's Guide to Stock Market",
        "ETF Investment Strategies",
        "Risk Management Handbook"
    ],
    webinars: [
        "Market Outlook 2025",
        "Cryptocurrency Investing",
        "Global Market Trends"
    ],
    interactive: [
        "Investment Calculator",
        "Risk Assessment Tool",
        "Portfolio Analyzer"
    ]
})

const courses = reactive([
    { title: 'Investment Fundamentals', level: 'Beginner', description: 'Master the basics of investing with this comprehensive introduction to financial markets and instruments.', lessons: 12 },
    { title: 'Technical Analysis', level: 'Intermediate', description: 'Learn how to analyze price charts and use technical indicators to identify potential trading opportunities.', lessons: 10 },
    { title: 'Fundamental Analysis', level: 'Intermediate', description: 'Discover how to evaluate companies through financial statements, industry analysis, and economic factors.', lessons: 8 },
    { title: 'Portfolio Management', level: 'Intermediate', description: 'Develop strategies for building and managing a diversified investment portfolio aligned with your goals.', lessons: 6 },
])

</script>

<style scoped>
.pi-arrow-right {
    font-size: .8rem;
    margin-right: 5px !important;
}

.resourse-wrapper:hover .resourse-title {
    cursor: pointer;
    text-decoration: underline solid 1px #33c3f0;
    color: #33c3f0;
}

.resourse-wrapper:hover .pi-arrow-right {
    margin-right: 10px !important;
}

.tile-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 10px 0;
}


.logo {
    font-size: 1.4rem;
}

.mb10 {
    margin-bottom: 10px;
}

.view-all:hover {
    text-decoration: solid underline 1px #33c3f0;
}

.courses-levels-wrapper,
.course-description {
    font-size: 1.1rem;
}

.course-level {
    padding: 3px 10px;
    border-radius: 8px;
}

.course-title {
    font-weight: bold;
    font-size: 1.2rem;
}

.start {
    border-radius: 8px;
    color: #33c3f0;
    background-color: transparent;
    outline: 1px solid #33c3f0;
    padding: 10px 20px;
    font-weight: bold;
}

.start:hover {

    box-shadow: 0em 0 0.6em #33c3f0;
}

.courses-wrapper,
.resources-wrapper {
    width: 100%;
    display: grid;
}

.courses-content-wrapper,
.resources-wrapper {
    padding: 20px 0;
}

.resources-wrapper {
    grid-template-columns: repeat(3, 2fr);
    gap: 2rem;
}

.courses-wrapper {
    grid-template-columns: repeat(2, 2fr);
    gap: 2rem;
}

.bc-dark-blue {
    background-color: #1d4ed8;
}

.block:nth-child(even) {
    background-color: var(--odd-bg-color, #0f1729);
}

.block:nth-child(odd) {
    background-color: var(--even-bg-color, #1d283a);
}
</style>