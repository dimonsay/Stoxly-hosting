<template>
    <div class="market-overwie-wrapper">
        <div class="container">
            <div class="market-overwie">
                <div class="title-wrapper">
                    <div class="block-title">Market Overview</div>
                    <div class="block-description">Top assets and their price dynamics</div>
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
import apiClient from '@/api/axios';
import { onMounted, reactive } from 'vue';

const indexes = reactive([]);

onMounted(async () => {
    await loadMarketData();
});

async function loadMarketData() {
    try {
        const data = await apiClient.getPriceHistory();

        // Преобразуем данные API в формат для графиков
        const marketData = data.slice(0, 3).map(asset => ({
            title: asset.asset_symbol,
            profit: parseFloat(asset.change_percent),
            data: [
                parseFloat(asset.price1),
                parseFloat(asset.price2),
                parseFloat(asset.price3),
                parseFloat(asset.price4),
                parseFloat(asset.change_percent)
            ]
        }));

        indexes.splice(0, indexes.length, ...marketData);
    } catch (err) {
        console.error('Error loading market data:', err);
        // Заглушка при ошибке API
        const fallbackData = [
            {
                title: 'NVDA',
                profit: 1.45,
                data: [0.2, 0.6, 0.5, 0.7, 1.45]
            },
            {
                title: 'TSLA',
                profit: 0.79,
                data: [0.5, 0.65, 0.72, 0.9, 0.79]
            },
            {
                title: 'NKE',
                profit: 0.27,
                data: [12.0, 23.0, 32.0, 43.0, 0.27]
            }
        ];
        indexes.splice(0, indexes.length, ...fallbackData);
    }
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            displayColors: false,
            callbacks: {
                title: () => '',
                label: (tooltipItem) => `${tooltipItem.formattedValue}%`,
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