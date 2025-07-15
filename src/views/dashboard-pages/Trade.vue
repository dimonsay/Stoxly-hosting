<template>
  <div class="trade-wrapper">
    <div class="trade-titlee dashboard-title">Trade</div>

    <div class="trading-controls-wrapper page-tile dashboard-tile mb-10">
      <div class="trading-controls-title mb-5 text-2xl font-semibold">Trading controls</div>

      <div class="controls-items flex gap-3 ">
        <router-link v-for="control in navTabs" :key="control.value"
          :to="{ name: control.routeName, query: $route.query }" class="control-item pointer tex-xl"
          :class="{ 'bg-blue': $route.name === control.routeName }">
          {{ control.label }}
        </router-link>
      </div>
    </div>

    <router-view @update-balance="onUpdateBalance" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const $route = useRoute();

const navTabs = [
  { label: 'Markets', value: 'markets', routeName: 'trade-markets' },
  { label: 'Orders', value: 'orders', routeName: 'trade-orders' },
  { label: 'Positions', value: 'positions', routeName: 'trade-positions' },
  { label: 'Transaction', value: 'transaction', routeName: 'trade-transaction' },
  { label: 'Wallet', value: 'wallet', routeName: 'trade-wallet' },
];

const emit = defineEmits(['update-balance']);
function onUpdateBalance() {
  emit('update-balance');
}
</script>

<style scoped>
.control-item {
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.bg-blue {
  background-color: #33c3f0;
}

@media (max-width: 768px) {
  .controls-items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 4px;
  }

  .control-item {
    min-width: 90px;
    font-size: 1rem;
    text-align: center;
  }

  .trading-controls-wrapper {
    padding: 1.25rem !important;
  }
}
</style>