<script setup lang="ts">
const {product, image} = defineProps({
  product: {
    type: Object,
    required: true
  },
  image: {
    type: Object
  }

})
</script>

<template>
  <article v-if="Object.keys(product).length > 0" class="">
    <nuxt-link :to="`/product-detail/${product.id}/${product.title}`">
      <div>
        <figure>
          <img class="hidden lg:inline-block" :src="product?.major_image?.conversions?.lg" :alt="product.title">
          <img class="inline-block lg:hidden" :src="product?.major_image?.conversions?.md" :alt="product.title">
        </figure>
      </div>
      <div>
        <div class="title" v-if="product?.title"><h4>{{product.title}}</h4></div>
        <div class="price">
          <span class="price-number">{{separatePrice(product.price)}}</span>
          <span class="text-sm mr-1">تومان</span>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<style scoped>

</style>
