<template>
    <div class="market-overwie-wrapper">
        <div class="container">
            <div class="market-overwie">
                <div class="title-wrapper">
                    <div class="block-title">Market Overview</div>
                    <div class="block-description">Main indexes and their dynamic</div>
                </div>
                <div class="indexes-wrapper flex justify-between">
                    <div class="index" v-for="index in indexes" :key="index.title" style="text-align: left;">
                        <div class="index-title">{{ index.title }}</div>
                        <div class="index-profit" :class="{ red: index.profit < 0, green: index.profit > 0 }">
                            {{ index.profit }} %
                        </div>
                        <Chart type="line" :data="{
                            labels: ['', '', '', '', ''],
                            datasets: [
                                {
                                    data: index.data,
                                    borderColor: '#42A5F5',
                                    backgroundColor: 'rgba(66, 165, 245, 0.2)',
                                    fill: true,
                                    tension: 0.3,
                                    pointRadius: 4,
                                    pointHoverRadius: 6
                                }
                            ]
                        }" :options="chartOptions" style="height: 150px; width: 320px;" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const indexes = reactive([
    {
        title: 'S&P 500',
        profit: 1.23,
        data: [0.5, 0.8, 1.0, 1.2, 1.23]
    },
    {
        title: 'NASDAQ',
        profit: 1.87,
        data: [1.1, 1.3, 1.5, 1.6, 1.87],
    },
    {
        title: 'Dow Jones',
        profit: 1.1,
        data: [0.1, 0.15, 0.5, 1, 1.1]
    }
]);

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
                label: (tooltipItem) => `${tooltipItem.formattedValue}%`, // или $ если надо
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
    }
};
</script>


<style scoped>
.canvas {
    width: 100%;
}

.red {
    color: #eb6c6d;
}

.green {
    color: green
}

.indexes-wrapper {
    margin-top: 40px;
}

.index {
    width: 30%;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #33c4f05b;
}

.index-title {
    font-weight: bold;
    font-size: 1.5rem;
}

.profit-trend {
    margin-top: 10px;
    height: 100px;
    background-color: green;
    border-radius: 4px;
}
</style>