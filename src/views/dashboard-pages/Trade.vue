<template>
    <div class="trade-wrapper">
        <div class="trade-titlee dashboard-title">Trade</div>

        <div class="trading-controls-wrapper page-tile dashboard-tile">
            <div class="trading-controls-title mb-5 text-2xl font-semibold">Trading controls</div>

            <div class="controls-items flex gap-3 ">
                <div class="control-item pointer hover tex-xl" @click="changeControl(control)" v-for="(status, control) in controls" :key="control"
                :class="{'bg-blue' : status}"
                >
                    {{ control.charAt(0).toUpperCase()+control.slice(1) }}
                </div>
            </div>
    </div>

    <component class="mt-10" :is="currentComponent"  v-if="controls[selectedCategory]" />

</div>

</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import MarketsBlock from './trade-components/MarketsBlock.vue';
import OrdersBlock from './trade-components/OrdersBlock.vue';
import PositionsBlock from './trade-components/PositionsBlock.vue';
import TransactionsBlock from './trade-components/TransactionsBlock.vue';
import WalletBlock from './trade-components/WalletBlock.vue';


const components = {
  markets: MarketsBlock,
  orders: OrdersBlock,
  positions: PositionsBlock,
  transaction: TransactionsBlock,
  wallet: WalletBlock
}


const selectedCategory = ref('markets')
const currentComponent = computed(() => {
  return components[selectedCategory.value];
});

const controls = reactive({
    markets : true,
    positions : false, 
    orders : false,
    transaction : false, 
    wallet : false
})

function changeControl(control) {
  Object.keys(controls).forEach(key => {
    controls[key] = false
  })
  
  controls[control] = true
  selectedCategory.value = control
}

</script>

<style scoped>
.control-item{
    padding: 5px 10px;
    border-radius: 4px;
}
.bg-blue{
    background-color: #33c3f0;
}
</style>