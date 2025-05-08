<script setup lang="ts">
import {useProductsStore} from "~/stores/products";

const showGridItemCount = ref(3)

const store = useProductsStore()
onBeforeMount(async () => {
  await store.fetchProducts()
})
const products = computed(() => store.getProducts)
</script>

<template>
  <section class="container mx-auto grid grid-cols-4 gap-5 py-10" v-if="products">
    <aside class="col-span-1 hidden lg:block">

    </aside>
    <main class="col-span-3 grid gap-5 ">
      <section class="col-span-1 flex gap-3 ">
        <form-items-show-count
            @change-count="showGridItemCount = $event"
        />
        <form-ckeckbox @getStatus=""/>
        <div></div>
      </section>
      <section
          class=" products-items grid  grid-cols-2 gap-x-5 gap-y-10"
          :class="` lg:grid-cols-${showGridItemCount}`"
          :style="{gridTemplateColumns: `repeat(${showGridItemCount}, 1fr)`}"
      >
        <template v-if="products?.products?.data?.length && !store.loading">
          <card-product
              v-for="product in products?.products?.data"
              :key="product.id"
              :product="product"
          />
        </template>
        <loader-product-card
            v-else
            v-for="item in 9 "
            :key="item"
        />
      </section>
    </main>
  </section>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .products-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>