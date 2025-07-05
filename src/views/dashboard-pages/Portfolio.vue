<template>
  <div class="portfolio-wrapper">
    <div class="dashboard-title">Portfolio</div>

    <div class="portfolio-charts-wrapper">
      <div class="portfolio-charts-title mb-10">Portfolio Distribution</div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col items-center bg-none dashboard-tile page-tile">
          <div class="font-semibold text-xl mb-4 text-left w-full mb-4">Portfolio Distribution</div>
          <Chart type="doughnut" :data="portfolioData" :options="portfolioOptions"></Chart>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.portfolio-wrapper {
  min-height: 100vh;
}
</style>

<script setup>
import apiClient from '@/api/axios';
import Chart from 'primevue/chart';
import { onMounted, reactive } from 'vue';


const portfolioOptions = reactive({});
const portfolioData = reactive({});

onMounted(() => {
  const documentStyle = getComputedStyle(document.documentElement);

  Object.assign(portfolioOptions, {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
        }
      }
    }
  });

  Object.assign(portfolioData, {
    datasets: [
      {
        labels: ['Stocks', 'Etfs', 'Bonds'],
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-indigo-500'),
          documentStyle.getPropertyValue('--p-purple-500'),
          documentStyle.getPropertyValue('--p-teal-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-indigo-400'),
          documentStyle.getPropertyValue('--p-purple-400'),
          documentStyle.getPropertyValue('--p-teal-400')
        ]
      }
    ]
  });
});

onMounted(async () => {
  const data = await apiClient.getUserAssets()

  console.log(data)
})


</script>