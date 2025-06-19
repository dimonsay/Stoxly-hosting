<template>
    <div class="about-wrapper">
        <div class="container">
            <div class="main-wrapper flex justify-between">
                <div class="story flex-col justify-between">
                    <div class="pageTitle">Our Story</div>
                    <div class="pageDescription flex flex-col grey">
                        <div class="">Founded in 2018, Stoxly emerged from a simple observation: investing in global
                            markets was unnecessarily complex and inaccessible to most people. Our founders, with
                            decades of combined experience in finance and technology, set out to change this reality.
                        </div>
                        <div class="">Founded in 2018, Stoxly emerged from a simple observation: investing in global
                            markets was unnecessarily complex and inaccessible to most people. Our founders, with
                            decades of combined experience in finance and technology, set out to change this reality.
                        </div>
                        <div class="">Founded in 2018, Stoxly emerged from a simple observation: investing in global
                            markets was unnecessarily complex and inaccessible to most people. Our founders, with
                            decades of combined experience in finance and technology, set out to change this reality.
                        </div>
                    </div>
                </div>

                <div class="values flex-col flex justify-between">
                    <div class="pageTitle">Our Values</div>
                    <div class="pageDescription flex flex-col grey">
                        <div class="value">
                            <div class="value-title blue">Accessibility</div>
                            <div class="value-description grey">Making investing possible for everyone, regardless of
                                location or experience level.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue bold">Transparency</div>
                            <div class="value-description grey">Providing clear information about fees, risks, and
                                investment performance.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Security</div>
                            <div class="value-description grey">Implementing the highest standards of data protection
                                and financial security.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Education</div>
                            <div class="value-description grey">Empowering users with knowledge and tools to make
                                informed investment decisions.</div>
                        </div>
                        <div class="value">
                            <div class="value-title blue">Innovation</div>
                            <div class="value-description grey">Continuously improving our platform with the latest
                                technology and features.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="journey-wrapper">
                <div class="pageTitle">Our Journey</div>

                <div class="journey flex" style="align-items: center;" v-for="journey in journey">
                    <div class="year">{{ journey.year }}</div>
                    <div class="achievement flex flex-col">
                        <div class="achievement-title" style="font-weight: bold;">{{ journey.achievement }}</div>
                        <div class="achievement-description grey">{{ journey.description }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-wrapper {
    padding: 40px 0;
}

.journey-wrapper {
    padding-bottom: 20px;
}

.journey {
    padding: 10px 0;
}

.year {
    background-color: #33c3f0;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    width: 80px;
    text-align: center;
}

.achievement-title {
    font-size: 1.4rem;
}

.value-title {
    font-weight: bold;
    font-size: 1.4rem;
}

.value {
    margin: 5px 0 !important;
}

.pageDescription {
    max-width: 600px;
}

.pageDescription * {
    margin: 10px 0;
}
</style>

<script setup>
import { reactive } from 'vue';


const journey = reactive([
    { year: 2018, achievement: 'Company Founded', description: 'Stoxly was established with the mission to make global investments accessible to everyone.' },
    { year: 2019, achievement: 'First Platform Launch', description: 'Released our first trading platform with support for major global stock markets.' },
    { year: 2020, achievement: 'Expansion to Crypto & ETFs', description: 'Added support for cryptocurrency trading and expanded our ETF offerings.' },
    { year: 2021, achievement: 'Global Expansion', description: 'Expanded operations to 30+ countries and added support for 15 languages.' },
])

</script>