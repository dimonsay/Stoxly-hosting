<script setup>
import { useLayout } from '@/layout/composables/layout';
import { CustomerService } from '@/service/CustomerService';
import { onMounted, reactive, ref, watch } from 'vue';

const { setPrimary, setSurface, isDarkTheme } = useLayout();

const customersTable = ref(null);
const customersTable1 = ref(null);
const customersTable2 = ref(null);
const selectedVisitorYear = ref(null);
const selectedRevenueMonth = ref(null);
const selectedOrderYear = ref(null);
const selectedCustomers1 = ref(null);
const selectedCustomerYear = ref(null);
const customerMax = ref('1232');
const customerMin = ref('284');
const customerAvg = ref('875');
const customerCarousel = ref(null);
const visitorChart = ref(null);
const visitorChartOptions = ref(null);
const countryChartOptions = ref(null);
const revenueChartOptions = ref(null);
const customerChartOptions = ref(null);
const customerChart = ref(null);
const growth = ref('$620,076');
const avgCustomer = ref('$1,120');

const chartData1 = reactive({
    growth: '$620,076',
    avgCustomer: '$1,120'
});
const chartData2 = reactive({
    customerAvg: '875',
    customerMin: '284',
    customerMax: '1232'
});

const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

const timelineEvents = ref([
    { transaction: 'Payment from #28492', amount: '+$250.00', date: 'June 13, 2020 11:09 AM', icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE' },
    { transaction: 'Process refund to #94830', amount: '-$570.00', date: 'June 13, 2020 08:22 AM', icon: 'pi pi-refresh', iconColor: '#FC6161', amountColor: '#FC6161' },
    { transaction: 'New 8 user to #5849', amount: '+$50.00', date: 'June 12, 2020 02:56 PM', icon: 'pi pi-plus', iconColor: '#0BD18A', amountColor: '#0BD18A' },
    { transaction: 'Payment from #3382', amount: '+$3830.00', date: 'June 11, 2020 06:11 AM', icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE' },
    { transaction: 'Payment from #4738', amount: '+$845.00', date: 'June 11, 2020 03:50 AM', icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE' },
    { transaction: 'Payment failed form #60958', amount: '$1450.00', date: 'June 10, 2020 07:54 PM', icon: 'pi pi-exclamation-triangle', iconColor: '#EC4DBC', amountColor: '#EC4DBC' },
    { transaction: 'Payment from #5748', amount: '+$50.00', date: 'June 09, 2020 11:37 PM', icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE' },
    { transaction: 'Removed 32 users from #5849', amount: '-$240.00', date: 'June 09, 2020 08:40 PM', icon: 'pi pi-minus', iconColor: '#FC6161', amountColor: '#FC6161' }
]);

const countryChart = ref({
    labels: ['RUS', 'Other', 'IND', 'AUS', 'JPN', 'USA', 'CHN'],
    datasets: [
        {
            data: [30, 18, 36, 54, 61, 90, 72],
            backgroundColor: ['#0F8BFD', '#545C6B', '#EC4DBC', '#EEE500', '#FC6161', '#00D0DE', '#873EFE'],
            hoverBackgroundColor: ['#0F8BFD', '#545C6B', '#EC4DBC', '#EEE500', '#FC6161', '#00D0DE', '#873EFE'],
            borderColor: 'transparent',
            fill: true
        }
    ]
});

const revenueChart = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            data: [37, 34, 21, 27, 10, 18, 15],
            borderColor: '#EEE500',
            pointBackgroundColor: '#EEE500',
            backgroundColor: 'rgba(238, 229, 0, 0.05)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'Revenue',
            data: [31, 27, 30, 37, 23, 29, 20],
            borderColor: '#00D0DE',
            pointBackgroundColor: '#00D0DE',
            backgroundColor: 'rgba(0, 208, 222, 0.05)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'Expenses',
            data: [21, 7, 13, 3, 19, 11, 6],
            borderColor: '#FC6161',
            pointBackgroundColor: '#FC6161',
            backgroundColor: 'rgba(253, 72, 74, 0.05)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'Customer',
            data: [47, 31, 35, 20, 46, 39, 25],
            borderColor: '#0F8BFD',
            pointBackgroundColor: '#0F8BFD',
            backgroundColor: 'rgba(15, 139, 253, 0.05)',
            fill: true,
            tension: 0.4
        }
    ]
});

const orderYear = ref([
    { name: '2021', code: '0' },
    { name: '2020', code: '1' }
]);
const visitorYear = ref([
    { name: '2020', code: '0' },
    { name: '2019', code: '1' }
]);
const customerYear = ref([
    { name: '2020', code: '0' },
    { name: '2019', code: '1' }
]);
const revenueMonth = ref([
    { name: 'January - July 2021', code: '0' },
    { name: 'August - December 2020', code: '1' }
]);

const initChart = async () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    visitorChart.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Plan',
                data: [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
                borderColor: ['#FC6161'],
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                type: 'line',
                fill: false,
                barPercentage: 0.5,
                stepped: true
            },
            {
                label: 'Growth actual',
                data: [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
                backgroundColor: documentStyle.getPropertyValue('--primary-color'),
                fill: true,
                barPercentage: 0.5
            }
        ]
    };
    visitorChartOptions.value = {
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: textColor
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        hover: {
            mode: 'index'
        },
        scales: {
            y: {
                ticks: {
                    color: textColor
                },
                min: 500,
                max: 900,
                grid: {
                    display: false
                }
            },
            x: {
                ticks: {
                    color: textColor
                },
                barPercentage: 0.5,
                grid: {
                    display: false
                }
            }
        }
    };
    countryChartOptions.value = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };

    revenueChartOptions.value = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        responsive: true,
        hover: {
            mode: 'index'
        },
        scales: {
            x: {
                ticks: {
                    color: textColor
                }
            },
            y: {
                ticks: {
                    color: textColor,
                    min: 0,
                    max: 60,
                    stepSize: 5
                }
            }
        }
    };
    customerChartOptions.value = {
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                ticks: {
                    color: textColor
                },
                display: false
            },
            x: {
                ticks: {
                    color: textColor
                },
                grid: {
                    display: false
                }
            }
        }
    };
    customersTable.value = await CustomerService.getCustomersLarge();
    customersTable.value.forEach((customer) => (customer.date = new Date(customer.date)));

    customersTable1.value = await CustomerService.getCustomersLarge();
    customersTable1.value.forEach((customer) => (customer.date = new Date(customer.date)));

    customersTable2.value = await CustomerService.getCustomersLarge();
    customersTable2.value.reverse().forEach((customer) => (customer.date = new Date(customer.date)));

    selectedVisitorYear.value = visitorYear.value[0];
    selectedOrderYear.value = orderYear.value[0];
    selectedCustomerYear.value = customerYear.value[0];
    selectedRevenueMonth.value = revenueMonth.value[0];

    customerCarousel.value = [
        { user: '9,673 Users', value: '$8,362,478', image: 'nasa' },
        { user: '9,395 Users', value: '$7,927,105', image: 'beats' },
        { user: '7,813 Users', value: '$6,471,594', image: 'gopro' },
        { user: '7,613 Users', value: '$5,697,883', image: 'north' },
        { user: '98,673 Users', value: '$7,653,311', image: 'mc' },
        { user: '5,645 Users', value: '$4,567,823', image: 'dell' },
        { user: '5,153 Users', value: '$5,342,678', image: 'wwf' },
        { user: '4,338 Users', value: '$5,867,391', image: 'bmw' },
        { user: '4,170 Users', value: '$4,647,233', image: 'pepsi' },
        { user: '3,765 Users', value: '$4,123,876', image: 'netflix' },
        { user: '3,490 Users', value: '$3,688,362', image: 'deloitte' },
        { user: '2,976 Users', value: '$3,978,478', image: 'pg' }
    ];
    customerChart.value = {
        labels: ['January', 'March', 'May', 'Agust', 'October', 'December'],
        datasets: [
            {
                data: [10, 25, 48, 35, 54, 70],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [18, 35, 23, 30, 59, 65],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [20, 47, 46, 46, 61, 70],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [17, 34, 18, 48, 67, 68],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-600'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [9, 37, 47, 50, 60, 62],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [8, 48, 40, 52, 72, 75],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [10, 18, 50, 47, 63, 80],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [20, 36, 39, 58, 59, 85],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [30, 45, 35, 50, 54, 81],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [28, 35, 52, 56, 60, 77],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [40, 40, 38, 45, 68, 86],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-600'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [50, 23, 27, 34, 65, 90],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [29, 27, 29, 42, 55, 84],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [10, 37, 47, 29, 59, 80],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [10, 54, 42, 38, 63, 83],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [25, 44, 50, 56, 65, 92],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [30, 43, 48, 45, 73, 78],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            },
            {
                data: [29, 47, 54, 60, 77, 86],
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                fill: true,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            }
        ]
    };
};

onMounted(() => {
    initChart();
});

watch([setPrimary, setSurface, isDarkTheme], () => {
    initChart();
});

function changeRevenueChart(event) {
    const dataSet1 = [
        [37, 34, 21, 27, 10, 18, 15],
        [31, 27, 30, 37, 23, 29, 20],
        [21, 7, 13, 3, 19, 11, 6],
        [47, 31, 35, 20, 46, 39, 25]
    ];
    const dataSet2 = [
        [31, 27, 30, 37, 23, 29, 20],
        [47, 31, 35, 20, 46, 39, 25],
        [37, 34, 21, 27, 10, 18, 15],
        [21, 7, 13, 3, 19, 11, 6]
    ];
    if (event.value.code === '1') {
        revenueChart.value.datasets[0].data = dataSet2[parseInt('0')];
        revenueChart.value.datasets[1].data = dataSet2[parseInt('1')];
        revenueChart.value.datasets[2].data = dataSet2[parseInt('2')];
        revenueChart.value.datasets[3].data = dataSet2[parseInt('3')];
    } else {
        revenueChart.value.datasets[0].data = dataSet1[parseInt('0')];
        revenueChart.value.datasets[1].data = dataSet1[parseInt('1')];
        revenueChart.value.datasets[2].data = dataSet1[parseInt('2')];
        revenueChart.value.datasets[3].data = dataSet1[parseInt('3')];
    }
}

function changeVisitorChart(event) {
    const dataSet1 = [
        [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
        [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780]
    ];
    const dataSet2 = [
        [580, 580, 620, 620, 620, 680, 680, 680, 730, 730, 730, 730],
        [550, 592, 600, 605, 630, 649, 660, 690, 710, 720, 730, 780]
    ];
    if (event.value.code === '1') {
        chartData1.growth = '$581,259';
        chartData1.avgCustomer = '$973';
        visitorChart.value.datasets[0].data = dataSet2[parseInt('0')];
        visitorChart.value.datasets[1].data = dataSet2[parseInt('1')];
    } else {
        chartData1.growth = '$620,076';
        chartData1.avgCustomer = '$1,120';
        visitorChart.value.datasets[0].data = dataSet1[parseInt('0')];
        visitorChart.value.datasets[1].data = dataSet1[parseInt('1')];
    }
}
const changeCustomerChart = (event) => {
    const dataSet1 = [
        [10, 25, 48, 35, 54, 70],
        [18, 35, 23, 30, 59, 65],
        [20, 47, 46, 46, 61, 70],
        [17, 34, 18, 48, 67, 68],
        [9, 37, 47, 50, 60, 62],
        [8, 48, 40, 52, 72, 75],
        [10, 18, 50, 47, 63, 80],
        [20, 36, 39, 58, 59, 85],
        [30, 45, 35, 50, 54, 81],
        [28, 35, 52, 56, 60, 77],
        [40, 40, 38, 45, 68, 86],
        [50, 23, 27, 34, 65, 90],
        [29, 27, 29, 42, 55, 84],
        [10, 37, 47, 29, 59, 80],
        [10, 54, 42, 38, 63, 83],
        [25, 44, 50, 56, 65, 92],
        [30, 43, 48, 45, 73, 78],
        [29, 47, 54, 60, 77, 86]
    ];
    const dataSet2 = [
        [10, 25, 48, 35, 54, 70],
        [20, 47, 46, 46, 61, 70],
        [17, 34, 18, 48, 67, 68],
        [50, 23, 27, 34, 65, 90],
        [8, 48, 40, 52, 72, 75],
        [9, 37, 47, 50, 60, 62],
        [10, 18, 50, 47, 63, 80],
        [30, 45, 35, 50, 54, 81],
        [10, 37, 47, 29, 59, 80],
        [28, 35, 52, 56, 60, 77],
        [25, 44, 50, 56, 65, 92],
        [18, 35, 23, 30, 59, 65],
        [20, 36, 39, 58, 59, 85],
        [29, 27, 29, 42, 55, 84],
        [40, 40, 38, 45, 68, 86],
        [30, 43, 48, 45, 73, 78],
        [10, 54, 42, 38, 63, 83],
        [29, 47, 54, 60, 77, 86]
    ];
    if (event.value.code === '1') {
        chartData2.customerAvg = '621';
        chartData2.customerMin = '198';
        chartData2.customerMax = '957';
        customerChart.value.datasets[0].data = dataSet2[parseInt('0')];
        customerChart.value.datasets[1].data = dataSet2[parseInt('1')];
        customerChart.value.datasets[2].data = dataSet2[parseInt('2')];
        customerChart.value.datasets[3].data = dataSet2[parseInt('3')];
    } else {
        chartData2.customerAvg = '875';
        chartData2.customerMin = '284';
        chartData2.customerMax = '1232';
        customerChart.value.datasets[0].data = dataSet1[parseInt('0')];
        customerChart.value.datasets[1].data = dataSet1[parseInt('1')];
        customerChart.value.datasets[2].data = dataSet1[parseInt('2')];
        customerChart.value.datasets[3].data = dataSet1[parseInt('3')];
    }
};
const recentSales = (event) => {
    if (event.value.code === '0') {
        customersTable.value = customersTable1.value;
    } else {
        customersTable.value = customersTable2.value;
    }
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

<template>
    1
</template>

<style lang="scss" scoped>
:deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
        flex-direction: row !important;

        .p-timeline-event-content {
            text-align: left !important;
        }
    }

    .p-timeline-event-opposite {
        flex: 0;
        padding: 0;
    }

    .p-card {
        margin-top: 1rem;
    }
}
</style>
