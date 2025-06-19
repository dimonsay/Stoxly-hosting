<template>
    <div class="card p-4" style="background-color: #1e1e1e;">
        <div class="flex align-items-center mb-3">
            <h3 class="text-white">Бесконечный биржевой график</h3>
            <Button icon="pi pi-pause" class="ml-auto p-button-rounded p-button-text p-button-plain"
                @click="toggleAnimation" v-tooltip="'Пауза/Продолжить'" />
        </div>

        <div class="relative overflow-hidden" style="height: 300px;">
            <!-- Горизонтальные линии сетки -->
            <div v-for="(line, idx) in gridLines" :key="'line-' + idx"
                class="absolute border-top-1 border-300 opacity-10" :style="{ top: `${line}%`, left: 0, right: 0 }">
            </div>

            <!-- Бегущая линия графика -->
            <div class="absolute w-full h-px bg-primary-500 opacity-50" style="top: 50%"></div>

            <!-- Контейнер для свечей -->
            <div class="absolute bottom-0 left-0 flex" style="height: 100%;">
                <div v-for="(candle, idx) in visibleCandles" :key="idx" class="relative mx-1"
                    :style="{ width: `${candleWidth}px`, height: '100%' }">
                    <!-- Тело свечи -->
                    <div class="absolute w-full" :style="{
                        height: `${candle.height}%`,
                        bottom: `${candle.bottom}%`,
                        'background-color': candle.color,
                        'border-radius': '2px'
                    }"></div>
                    <!-- Фитили -->
                    <div class="absolute left-1/2 transform-translate-x-n50 w-px" :style="{
                        height: `${candle.wickTop + candle.wickBottom}%`,
                        bottom: `${candle.bottom - candle.wickBottom}%`,
                        'background-color': candle.color
                    }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

// Конфигурация
const candleWidth = 12;
const maxVisibleCandles = 30;
const animationSpeed = 200; // мс между обновлениями
const dataPoints = 500; // Всего точек данных в памяти

// Состояние
const candlesData = ref([]);
const currentPosition = ref(0);
const isPlaying = ref(true);
const animationFrame = ref(null);

// Генерация начальных данных
const generateInitialData = () => {
    const data = [];
    let lastValue = 50;

    for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.5) * 10;
        lastValue = Math.min(90, Math.max(10, lastValue + change));

        const isUp = change >= 0;
        const height = Math.random() * 15 + 5;

        data.push({
            height,
            bottom: lastValue - height / 2,
            color: isUp ? '#4CAF50' : '#F44336',
            wickTop: Math.random() > 0.7 ? Math.random() * 10 : 0,
            wickBottom: Math.random() > 0.7 ? Math.random() * 10 : 0
        });
    }

    return data;
};

// Видимые свечи (вычисляемое свойство)
const visibleCandles = computed(() => {
    const start = currentPosition.value;
    const end = start + maxVisibleCandles;

    if (end <= dataPoints) {
        return candlesData.value.slice(start, end);
    } else {
        return [
            ...candlesData.value.slice(start),
            ...candlesData.value.slice(0, end - dataPoints)
        ];
    }
});

// Анимация
const animate = () => {
    if (!isPlaying.value) return;

    currentPosition.value = (currentPosition.value + 1) % dataPoints;
    animationFrame.value = setTimeout(animate, animationSpeed);
};

// Управление анимацией
const toggleAnimation = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        animate();
    } else {
        clearTimeout(animationFrame.value);
    }
};

// Инициализация
onMounted(() => {
    candlesData.value = generateInitialData();
    animate();
});

// Очистка
onBeforeUnmount(() => {
    clearTimeout(animationFrame.value);
});
</script>

<style>
/* Плавное появление/исчезновение свечей */
.candle-enter-active,
.candle-leave-active {
    transition: all 0.5s ease;
}

.candle-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.candle-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>