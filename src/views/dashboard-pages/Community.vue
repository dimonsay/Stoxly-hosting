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
                <div class="error-show text-red-500">
                    <div class="rating-error " v-if="reviewErrors.rating">{{ reviewErrors.rating }}</div>
                </div>
            </div>

            <div class="review-text-wrapper flex flex-col gap-3">
                <div class="review-text-title grey text-xl">
                    Your Review
                </div>

                <Textarea type="text" v-model="review.text" style="min-height: 150px;"
                    @input="reviewErrors.text = ''" />
            </div>

            <div class="error-show text-red-500">
                <div class="rating-error " v-if="reviewErrors.text">{{ reviewErrors.text }}</div>
            </div>

            <div v-if="toast.show" class="toast text-green-500" :class="toast.type">
                {{ toast.message }}
            </div>

            <div v-if="serverError" class="text-red-500 text-sm mb-2 text-center">
                {{ serverError }}
            </div>

            <div class="submit-btn invest-btn pointer" @click="sendReview()">Submit review</div>
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
                    <div class="avarage-mark"> <i class="pi pi-star-fill text-gold"></i> {{
                        platformReview.average_rating }}
                    </div>
                </div>
            </div>
        </div>

        <div class="customers-review-wrapper page-tile flex flex-col dashboard-tile gap-3  mb-5">
            <div class="customers-review-title text-2xl font-semibold  mb-5">Customer Reviews</div>

            <div class="customers-reviews flex flex-col gap-3">
                <div class="customer-review-wrapper flex justify-between bg-gray-700 p-5 rounded-xl"
                    v-for="review in customers.slice(0, loadCustomers)" :key="review.id">
                    <!-- Мобильная версия: имя и оценка в одну строку -->
                    <div class="about-review flex flex-col gap-3 text-xl w-full">
                        <div class="flex items-center justify-between w-full mb-1">
                            <div class="customer-review-name font-semibold">{{ review.user.first_name + ' ' +
                                review.user.last_name }}</div>
                            <div class="customer-review-stars flex items-center gap-1 ml-2">
                                <i class="pi pi-star-fill text-gold"></i>
                                <span class="ml-1 text-base font-semibold">{{ review.rating }}</span>
                            </div>
                        </div>
                        <div class="customer-review-text grey">{{ review.text }}</div>
                        <!-- Дата в самом низу -->
                        <div class="review-date grey mt-2">{{ formatDate(review.created_at) }}</div>
                    </div>
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

/* Мобильная версия: кнопка на всю ширину и отзыв с переносом */
@media (max-width: 768px) {
    .submit-btn.invest-btn {
        width: 100% !important;
        display: block;
        margin-left: 0 !important;
        margin-right: 0 !important;
        text-align: center;
    }

    .customer-review-text {
        word-break: break-word;
        white-space: pre-line;
        font-size: 1rem;
        line-height: 1.4;
        max-width: 100vw;
    }

    .customers-reviews {
        gap: 0.5rem !important;
    }

    .customers-review-wrapper.page-tile,
    .customer-review-wrapper {
        padding: 10px !important;
    }

    .customer-review-wrapper {
        flex-direction: column;
        align-items: flex-start;
    }


    .review-date {
        font-size: 0.9rem;
        margin-top: 0rem !important;
        text-align: left;
    }

    .about-review {
        width: 100%;
    }

    .customer-review-stars {
        min-width: 48px;
        justify-content: flex-end;
    }
}
</style>

<script setup>
import apiClient from '@/api/axios';
import { onMounted, reactive, ref } from 'vue';

const reviewErrors = reactive({
    text: '',
    rating: ''
})

const toast = reactive({
    show: false,
    message: '',
    type: ''  // например, 'success' или 'error'
});

const serverError = ref('');

const customers = reactive([])
const loadCustomers = ref(3);

async function fetchReviews() {
    try {
        const reviewsStats = await apiClient.getReviewsStats()
        platformReview.total = reviewsStats.count;
        platformReview.average_rating = reviewsStats.average_rating;
        if (reviewsStats.results) {
            customers.splice(0, customers.length, ...reviewsStats.results);
        }
    } catch (err) {
        console.warn(err)
    }
}

async function sendReview() {
    reviewErrors.text = '';
    reviewErrors.rating = '';
    serverError.value = '';
    let hasErrors = false;

    if (review.text.trim().length < 10) {
        reviewErrors.text = 'The text of the review must contain a minimum of 10 characters.';
        hasErrors = true;
    }

    if (typeof review.mark !== 'number' || review.mark < 1 || review.mark > 5) {
        reviewErrors.rating = 'Select a rating from 1 to 5.';
        hasErrors = true;
    }

    console.log('Отправляем отзыв:', {
        text: review.text,
        rating: review.mark,
    });

    if (hasErrors) return;

    try {
        const response = await apiClient.sendReview({
            text: review.text,
            rating: review.mark
        })

        review.mark = 0;
        review.text = ''

        if (response.status === 201) {
            toast.message = 'Feedback has been sent.';
            toast.type = 'success';
            toast.show = true;

            review.text = '';
            review.mark = 0;

            setTimeout(() => {
                toast.show = false;
            }, 2000);

            // После успешной отправки — обновить отзывы
            await fetchReviews();
        } else if (response.data?.error) {
            serverError.value = response.data.error;
        } else if (response.data?.message) {
            serverError.value = response.data.message;
        }

    } catch (err) {
        serverError.value = err.response?.data?.error || err.response?.data?.message || err.message || 'Ошибка отправки отзыва';
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const platformReview = reactive({
    average_rating: 0,
    total: 0
})

function loadMore() {
    loadCustomers.value += 3;
}

const review = reactive({
    mark: 0,
    text: '',
})

onMounted(async () => {
    await fetchReviews();
})
</script>