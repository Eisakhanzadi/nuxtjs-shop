<script setup lang="ts">
import {useProductsStore} from "~/stores/products";

const store = useProductsStore()
onBeforeMount(async ()=>{
 await store.fetchProducts()
})
const products = computed(()=>store.getProducts)
</script>

<template>
<section class="grid grid-cols-4 gap-5" v-if="products">
  <main class="col-span-3">

  </main>
  <aside class="col-span-1">

  </aside>
</section>
</template>

<style scoped>

</style>