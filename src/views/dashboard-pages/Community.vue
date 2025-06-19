<template>
    <div class="community-wrapper">
        <div class="comminty-title dashboard-title">Community Reviews</div>

        <div class="write-review-wrapper page-tile dashboard-tile flex flex-col gap-3   mb-5">
            <div class="review-title text-2xl font-semibold">Write a Review</div>

            <div class="starts-wrapper flex flex-col gap-3">
                <div class="stars-title grey text-xl">Rating</div>
                <div class="stars">
                    <i class="pi pi-star-fill mr-1" v-for="(star, index) in 5" :key="index"
                        :class="{ 'text-gold': index < review.mark }" @click="review.mark = index + 1"></i>
                </div>
            </div>

            <div class="review-text-wrapper flex flex-col gap-3">
                <div class="review-text-title grey text-xl">
                    Your Review
                </div>

                <Textarea type="text" v-model="review.text" style="min-height: 150px;" />
            </div>

            <div class="submit-btn invest-btn pointer" @click="submit()">Submit review</div>
        </div>

        <div class="platform-stats-wrapper page-tile dashboard-tile  flex-col flex gap-3  mb-5">
            <div class="platform-review-title text-2xl font-semibold">Platform Stats</div>

            <div class="platform-stats flex-col flex gap-3">
                <div class=" total-reviews-wrapper flex justify-between  text-xl">
                    <div class="total-reviews-title">Total Reviews</div>
                    <div class="total-reviews">{{ platformReview.total }}</div>
                </div>
                <div class="avarage-mark-wrapper flex justify-between  text-xl">
                    <div class="avarage-mark-title">Average Rating</div>
                    <div class="avarage-mark"> <i class="pi pi-star-fill text-gold"></i> {{ platformReview.avarage }}
                    </div>
                </div>
            </div>
        </div>

        <div class="customers-review-wrapper page-tile flex flex-col dashboard-tile gap-3  mb-5">
            <div class="customers-review-title text-2xl font-semibold  mb-5">Customer Reviews</div>

            <div class="customers-reviews flex flex-col gap-3">
                <div class="customer-review-wrapper flex justify-between bg-gray-700 p-5 rounded-xl"
                    v-for="review in customers.slice(0, loadCustomers)" :key="review.id">
                    <div class="about-review flex flex-col gap-3 text-xl">
                        <div class="customer-review-name font-semibold">{{ review.name }}</div>
                        <div class="customer-review-stars flex gap-1">
                            <i class="pi pi-star-fill text-gold" v-for="star in review.review" :key="star"></i>
                        </div>
                        <div class="customer-review-text grey">{{ review.text }}</div>
                    </div>
                    <div class="review-date grey">{{ review.date }}</div>
                </div>
                <div class="load-more-btn invest-btn pointer p-3" style="margin: 0 auto;" @click="loadMore()"
                    v-if="loadCustomers < customers.length">Load more
                </div>
            </div>


        </div>
    </div>






</template>

<style scoped>
.pi-star-fill:hover,
.text-gold {
    color: gold;
}
</style>

<script setup>
import { reactive, ref } from 'vue';

const platformReview = reactive({
    avarage: 4.5,
    total: 1200
})

function loadMore() {
    loadCustomers.value += 3;
}

const loadCustomers = ref(3);

const customers = reactive([
    { name: 'TradingPro123', review: 5, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 4, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 3, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 2, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 1, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 4, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 4, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 4, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
    { name: 'TradingPro123', review: 4, text: 'Excellent platform! The portfolio tracking is outstanding and the interface is very intuitive.', date: 'May 25, 2025' },
])

const review = reactive({
    mark: 0,
    text: '',
})

function submit() {

}
</script>