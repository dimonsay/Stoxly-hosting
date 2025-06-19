<template>
    <div class="portfolio-wrapper">
        <div class="dashboard-title">Portfolio</div>

        <div class="portfolio-charts-wrapper">
            <div class="portfolio-charts-title mb-10">Portfolio Distribution</div>

            <div class="col-span-12 xl:col-span-6">
            <div class="card flex flex-col items-center">
                <div class="font-semibold text-xl mb-4">Doughnut</div>
                <Chart  type="doughnut" :data="portfolioData" :options="portfolioOptions"></Chart>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import Chart from 'primevue/chart';
import { onMounted, reactive } from 'vue';


const portfolioOptions = reactive({});
const portfolioData = reactive({});

onMounted(() => {
  const documentStyle = getComputedStyle(document.documentElement);
  
  Object.assign(portfolioOptions, {
    plugins: {
      legend: {
        position : 'bottom',
        labels: {
          usePointStyle: true,
        }
      }
    }
  });

  Object.assign(portfolioData, {
    datasets: [
      {
        labels : ['Stocks', 'Etfs', 'Bonds'],
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


</script>