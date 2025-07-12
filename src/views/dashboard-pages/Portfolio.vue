<template>
  <div class="portfolio-wrapper">
    <div class="dashboard-title">Portfolio</div>

    <div class="portfolio-charts-wrapper">
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col items-center bg-none dashboard-tile page-tile">
          <div class="font-semibold text-xl mb-4 text-left w-full">Portfolio Distribution</div>

          <div class="flex flex-col items-center dashboard-tile page-tile">

            <!-- Диаграмма -->
            <div class="h-[320px]">
              <Chart type="doughnut" :data="portfolioData" :options="portfolioOptions"
                style="width: 100%; height: 100%;" />
            </div>

            <!-- Отступ между кругом и легендой -->
            <div class="h-6"></div> <!-- можно регулировать тут -->

            <!-- Кастомная легенда -->
            <div class="flex flex-wrap justify-center gap-4 mt-2 text-xl">
              <div v-for="(label, index) in portfolioData.labels" :key="label.value"
                class="flex items-center space-x-2">
                <span class="w-4 h-4 rounded-full "
                  :style="{ backgroundColor: portfolioData.datasets[0].backgroundColor[index] }"></span>
                <div class="text-lg">{{ label.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="portfolio-summary">
          <div v-for="(categoryData, categoryKey) in data" :key="categoryKey"
            class="category-block p-4 rounded bg-gray-800 mb-2 flex items-center justify-between">
            <div class="flex flex-col">
              <div class="text-xl font-semibold">{{ formatCategoryName(categoryKey) }}</div>
              <div class="text-sm text-gray-400">
                Invested: ${{ parseFloat(categoryData.total_current_value).toFixed(2) }}
              </div>
            </div>

            <div class="text-blue-400 text-20 text-base">
              Share : {{ getCategoryPercent(categoryKey) }}%
            </div>
          </div>
        </div>
      </div>


      <div class="portfolio-assets-wrapper mt-6 ">
        <div class="filter-wrapper flex justify-between items-center mb-5 gap-5">
          <div class="portfolio-search w-full">
            <IconField iconPosition="left" class="w-full" style="min-width: 270px;">
              <InputIcon class="pi pi-search text-gray-500" />
              <InputText v-model="search.search" type="text" autocomplete="off" @input="fetchCurrentPortfolio"
                placeholder="Search Assets..." class="w-full" />
            </IconField>
          </div>

          <div class="filter-portfolio">
            <IconField iconPosition="left" class="w-full md:w-56">
              <InputIcon class="pi pi-filter text-gray-500" />
              <Dropdown v-model="search.filter" :options="portfolioData.labels" optionLabel="label" optionValue="value"
                placeholder="Category" class="w-full pl-6" @change="fetchCurrentPortfolio" />
            </IconField>
          </div>
        </div>

        <div class="current-holding-wrapper page-tile dashboard-tile">
          <div class="current-holding-title text-2xl font-semibold mb-5">Current holding</div>

          <!-- Состояние когда нет акций -->
          <div v-if="currentPortfolio.length === 0" class="empty-portfolio text-center py-8">
            <div class="empty-icon mb-4">
              <i class="pi pi-chart-line text-6xl text-gray-500"></i>
            </div>
            <div class="empty-title text-xl font-semibold mb-2">No stocks in your portfolio</div>
            <div class="empty-description text-gray-400 mb-6">Start building your investment portfolio by purchasing
              your first stocks</div>
            <button @click="router.push('/dashboard/trade')"
              class="start-trading-btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Start Trading
            </button>
          </div>

          <!-- Состояние когда есть акции -->
          <div v-else>
            <div class="text-sm text-gray-400 mb-3">Click on any asset to go to trade</div>

            <div class="holding-assets-wrapper flex flex-col gap-2">
              <div
                class="bg-gray-700 holding-asset-item flex px-8 py-3 rounded  items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors"
                v-for="asset in currentPortfolio" @click="goToTrade(asset.symbol, asset.category)">
                <div class="flex-col flex gap-1">
                  <div class="asset-symbol text-xl font-semibold">{{ asset.symbol }}</div>
                  <div class="asset-name text-gray-400">{{ asset.name }}</div>
                  <div class="asset-quntity text-gray-400">{{ Math.floor(asset.quantity) }} Shares</div>
                </div>

                <div class="item-changes flex flex-col text-right">
                  <div class="asset-total text-xl font-semibold">${{ formatValue(asset.total_value) }}</div>

                  <div class="asset-change-percents" :class="{
                    'text-green-500': Number(asset.change_percent) > 0,
                    'text-red-500': Number(asset.change_percent) < 0,
                  }">
                    {{
                      Number(asset.change_percent) === 0 || isNaN(Number(asset.change_percent))
                        ? '0.00'
                        : Number(asset.change_percent).toFixed(2)
                    }}%
                  </div>

                  <div class="asset-category text-gray-400">{{ formatCategoryName(asset.category) }}</div>
                </div>

                <!-- Удалено: стрелка и кнопка Sell -->

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import apiClient from '@/api/axios';
import { generateTradeLink } from '@/utils/tradeLinks';
import Chart from 'primevue/chart';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = reactive({});

const currentPortfolio = ref([]);

const search = reactive({
  search: '',
  filter: ''
})


function formatValue(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

async function fetchCurrentPortfolio() {
  try {
    const response = await apiClient.getCurrentPortfolio(search.search, search.filter);
    currentPortfolio.value = [...response];  // именно так
  } catch (error) {
    console.error('Ошибка при получении портфеля:', error);
  }
}

const allAssets = ref([]);

const portfolioOptions = reactive({
  cutout: '75%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: () => '',
        label: (tooltipItem) => {
          // tooltipItem.label — это объект {label, value}, поэтому берем tooltipItem.label.label
          let label = tooltipItem.label;
          if (typeof label === 'object' && label !== null && 'label' in label) {
            label = label.label;
          }
          const value = tooltipItem.formattedValue || '';
          return [`${label}`, `$${value}`];
        },
        labelPointStyle: () => ({
          pointStyle: 'line',
          radius: 0,
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
          rotation: 0,
        }),
      },
    },
  },
  maintainAspectRatio: false,
});

const portfolioData = reactive({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ],
});

const totalInvested = computed(() => {
  if (!data) return 0;
  return Object.values(data).reduce((sum, category) => {
    const invested = parseFloat(category.total_current_value);
    return sum + (isNaN(invested) ? 0 : invested);
  }, 0);
});

function getCategoryPercent(categoryKey) {
  if (!data || !data[categoryKey]) return '0.00';
  const invested = parseFloat(data[categoryKey].total_current_value);
  if (isNaN(invested) || totalInvested.value === 0) return '0.00';
  return ((invested / totalInvested.value) * 100).toFixed(2);
}

const formatCategoryName = (key) => {
  if (!key || typeof key !== 'string') return '';
  return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const colorVars = [
  '--p-indigo-500',
  '--p-purple-500',
  '--p-teal-500',
  '--p-cyan-500',
  '--p-orange-500',
  '--p-pink-500',
  '--p-green-500',
];

onMounted(async () => {
  const documentStyle = getComputedStyle(document.documentElement);


  try {
    const fetchedData = await apiClient.getUserAssets();

    const assetsData = [];
    Object.entries(fetchedData).forEach(([categoryName, categoryData]) => {
      categoryData.assets.forEach((asset) => {
        assetsData.push({
          ...asset,
          category: categoryName, // 👈 ДОБАВЛЯЕМ КАТЕГОРИЮ
        });
      });
    });
    allAssets.value = assetsData;

    // Изначально показываем все

    // Заполняем data (статистика для графика)
    Object.keys(data).forEach((key) => delete data[key]);
    Object.entries(fetchedData).forEach(([key, value]) => {
      data[key] = value;
    });

    const categories = Object.keys(data);
    const newLabels = categories.map(cat => ({
      label: formatCategoryName(cat),
      value: cat
    }));
    const newData = [];
    const newBgColors = [];
    const newHoverColors = [];


    categories.forEach((cat, index) => {


      const invested = parseFloat(data[cat].total_current_value);
      newData.push(isNaN(invested) ? 0 : invested);

      const colorVar = colorVars[index % colorVars.length];
      const baseColor = documentStyle.getPropertyValue(colorVar) || '#888';
      const hoverColor = baseColor.replace('500', '400');

      newBgColors.push(baseColor.trim());
      newHoverColors.push(hoverColor.trim());
    });

    portfolioData.labels = newLabels;
    portfolioData.datasets = [
      {
        data: newData,
        backgroundColor: newBgColors,
        hoverBackgroundColor: newHoverColors,
      },
    ];

  } catch (err) {
    console.error('Ошибка загрузки портфеля:', err);
  }

  fetchCurrentPortfolio()
});

// Функция для перехода к торговле конкретной акцией
const goToTrade = (symbol, category = null) => {
  console.log('Переход к торговле:', { symbol, category });
  const tradeLink = generateTradeLink(symbol, null, category);
  console.log('Сгенерированная ссылка:', tradeLink);
  router.push(tradeLink);
};

// Функция для быстрого перехода к продаже акции
const goToSell = (symbol, category = null) => {
  const sellLink = generateTradeLink(symbol, 'sell', category);
  router.push(sellLink);
};

</script>
