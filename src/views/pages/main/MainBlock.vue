<template>
    <div class="main-block-wrapper">
        <div class="container">
            <div class="main-block flex justify-between">
                <div class="text-block">
                    <div class="main-block-title">
                        Invest<br />
                        Without <br />
                        Borders <br />
                    </div>
                    <div class="main-block-description">
                        Discover how easy it is to grow your wealth, even if you're new to investing. Start today and
                        take control of your financial future.
                    </div>

                    <div class="buttons-wrapper">
                        <div class="get-started-btn btn flex invest-btn"
                            style="text-align: center; align-items: center;">
                            <div class="button-title" @click="toAuth()">Get started</div>
                            <div class="arrow-btn-icon">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="portfolio-wrapper flex flex-col gap-5">
                    <div class="portfolio" style="width: 600px; max-width: 700px;">
                        <div class="portolio-title  text-2xl font-semibold mb-5">Portfolio value</div>
                        <div class="flex justify-between align-center mb-5">
                            <div class="portfolio-value-number">${{ formatValue(latestValue) }}</div>
                            <div class="portfolio-profit" :class="{ positive: profit >= 0, negative: profit < 0 }">
                                {{ profit.toFixed(2) }}%
                            </div>
                        </div>
                        <Chart type="line" :data="chartData" :options="chartOptions" class="portfolio-chart" />

                        <div class="assets-wrapper grid grid-cols-2 gap-2">
                            <div class="asset-item  border rounded-lg p-2 border-white/10 bg-white/5"
                                v-for="asset in assets">
                                <div class="asset-symbol">
                                    {{ asset.symbol }}
                                </div>
                                <div class="asset-price">
                                    ${{ Number(asset.price_buy).toFixed(2) }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/axios';
import router from '@/router';
import { Chart as ChartJS, registerables } from 'chart.js';
import { computed, onMounted, reactive, ref } from 'vue';

ChartJS.register(...registerables);

const assets = reactive([])

onMounted(async () => {
    const tickers = ['aapl', 'tsla', 'msft', 'nke'];

    for (const ticker of tickers) {
        const result = await apiClient.searchAssets(ticker, 'stocks');
        assets.push(...result); // добавляем в массив
    }

    console.log(assets);
})

const baseValues = [20200, 21350, 20930, 21220, 20800, 22000];
const portfolio = ref(
    baseValues.map(v => randomizeValue(v, 1))
);

function formatValue(value) {
    return new Intl.NumberFormat('en-US').format(value);
}

const latestValue = computed(() => portfolio.value[portfolio.value.length - 1]);

function randomizeValue(base, variancePercent = 1) {
    // variancePercent — процент вариации, например 1 = ±1%
    const variance = base * (variancePercent / 100);
    const randomOffset = (Math.random() * 2 - 1.5) * variance; // от -variance до +variance
    return +(base + randomOffset).toFixed(2); // округлить до 2 знаков
}

const profit = computed(() => {
    const len = portfolio.value.length;
    if (len < 2) return 0;
    const prev = portfolio.value[len - 2];
    const curr = portfolio.value[len - 1];
    return ((curr - prev) / prev) * 100;
});

const chartData = ref({
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Preview',
            data: portfolio,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
        }
    ]
});



const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            displayColors: false, // ✅ отключает квадрат
            callbacks: {
                title: () => '',
                label: (tooltipItem) => `$${tooltipItem.formattedValue}`, // или $ если надо
                labelPointStyle: () => ({
                    pointStyle: 'line',
                    radius: 0,
                    fillStyle: 'transparent',
                    strokeStyle: 'transparent',
                    rotation: 0
                })
            }
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            ticks: {
                color: 'white',
                font: {
                    size: 14
                }
            },
            title: {
                display: true
            }
        },
        y: {
            display: false
        }
    },
    elements: {
        point: {
            radius: 0,
            hoverRadius: 0
        }
    },

};

function toAuth() {
    router.push({ name: 'login' });
}
</script>


<style scoped>
canvas {
    max-width: 100%;
}

.main-stocks {
    width: 100%;
    margin-top: 10px;
}

.invest-btn {
    padding: 15px 30px !important;
}

.invest-btn:hover {
    cursor: pointer !important;
}

.stock-trend {
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid #3d4553;
    width: 200px;
    border-radius: 6px;
    background: linear-gradient(to right, #262f3d 100%, #283340 0%);
}

.portfolio-value-title {
    font-size: 1.2rem;
}

.portfolio-value-number {
    font-size: 1.4rem;
}

.portfolio {
    padding: 40px;
    background-color: #1d2837;
    width: 550px;
    border-radius: 30px;
    box-shadow: 0 0 1rem #33c3f0;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.trend {
    height: 200px;
    background-color: rgba(0, 128, 0, 0.562);
    margin-bottom: 10px;
    border-radius: 10px;
}

.portfolio-profit {
    border-radius: 12px;
    padding: 4px 12px;
    background-color: rgba(0, 128, 0, 0.384);
    border: 1px solid green;
}

.portfolio-title {
    font-size: 1.2rem;
    color: #dedfe0;
}

.portfolio-value {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.text-block {
    width: 40%;
}

.buttons-wrapper {
    margin-top: 40px;
}

.get-started-btn {
    align-items: center;
    width: fit-content;
}

.button-title {
    margin-right: 10px;
}

.main-block {
    padding: 40px;
}

.main-block-title {
    font-weight: bold;
    font-size: 4rem;
}

.main-block-description {
    color: #dedfe0;
    font-size: 1.4rem;
}

.portfolio-wrapper,
.portfolio {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
}

.portfolio-chart,
.portfolio canvas {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    height: 260px !important;
    box-sizing: border-box !important;
    margin: 0 auto !important;
    padding: 0 !important;
}

/* По умолчанию (десктоп/планшет) — 2 в ряд */
.assets-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
    .main-block {
        flex-direction: column;
        gap: 40px;
        padding: 20px;
    }

    .text-block {
        width: 100%;
        text-align: center;
    }

    .main-block-title {
        font-size: 2.5rem;
    }

    .main-block-description {
        font-size: 1.2rem;
    }

    .buttons-wrapper {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }

    .portfolio {
        width: 100%;
        padding: 25px;
        border-radius: 20px;
    }

    .portfolio-value-number {
        font-size: 1.2rem;
    }

    .portfolio-chart,
    .portfolio canvas {
        height: 180px !important;
    }

    .assets-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }
}

@media screen and (max-width: 480px) {
    .main-block {
        padding: 15px;
        gap: 20px;
    }

    .main-block-title {
        font-size: 2rem;
    }

    .main-block-description {
        font-size: 1rem;
    }

    .buttons-wrapper {
        margin-top: 20px;
    }

    .invest-btn {
        padding: 12px 24px !important;
        font-size: 0.9rem;
    }

    .portfolio {
        padding: 20px;
        border-radius: 15px;
    }

    .portfolio-value-number {
        font-size: 1rem;
    }

    .portolio-title {
        font-size: 1.1rem !important;
    }

    .portfolio-chart,
    .portfolio canvas {
        height: 120px !important;
    }
}

@media screen and (min-width: 769px) {
    .main-block {
        gap: 48px;
    }

    .portfolio-chart,
    .portfolio canvas {
        max-width: 550px !important;
        margin-left: auto !important;
        margin-right: auto !important;
    }

    .portfolio {
        max-width: 550px !important;
        margin-left: auto !important;
        margin-right: auto !important;
    }
}
</style>
