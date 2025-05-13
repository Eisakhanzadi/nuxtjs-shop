<script setup lang="ts">
const {product} = defineProps({
  product: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <article v-if="product && Object.keys(product).length > 0" class="group">
    <nuxt-link :to="`/product-detail/${product.id}/${product.title}`">
      <div class="relative overflow-hidden">
        <div class="relative">
          <figure class="opacity-100  group-hover:opacity-0 transition ease-linear duration-200  ">
            <nuxt-img class="hidden lg:inline-block w-full" format="webp" quality="80" loading="lazy" :src="product?.major_image?.conversions?.lg" :alt="product.title"/>
            <nuxt-img class="inline-block lg:hidden w-full" format="webp" quality="80" loading="lazy" :src="product?.major_image?.conversions?.md" :alt="product.title"/>
          </figure>
          <figure class=" opacity-0  group-hover:opacity-100 absolute inset-0 w-full h-full transition ease duration-200" v-if="product?.images?.length">
            <img :src="product?.images[product?.images?.length-1].url" :alt="product.title">
          </figure>
        </div>
        <div class="hidden md:flex w-fit group-hover:translate-x-0 transition ease-linear duration-300 flex-col items-center justify-center absolute top-1 right-1 translate-x-full">
          <ul>
            <li class="mt-1 cursor-default scale-[0.8] hover:scale-110 transition ease-in duration-200" v-for="item in 5" :key="item">
              <icons-star />
            </li>
          </ul>
          <button class="p-1 mt-2 hover:animate-pulse"><icons-heart/></button>
        </div>
        <div class="hidden md:flex w-full group-hover:translate-y-0 transition ease duration-300 flex-col items-center justify-center absolute bottom-2 translate-y-[50px]" >
          <button class="text-center text-xs lg:text-sm bg-white py-2 w-1/2 rounded-lg">
            مشاهده بیشتر
          </button>
        </div>
      </div>
      <div class="overflow-hidden ">
        <div class="flex color-range flex-wrap gap-1 items-center w-full overflow-x-auto py-2" v-if="product?.color_ranges?.length">
          <figure class="p-0.5 overflow-hidden !border-1 border-black" v-for="item in product.color_ranges">
            <nuxt-img class="w-6 h-6 md:w-8 md:h-8 rounded-full " quality="80" format="webp" loading="lazy" :src="item.image" :alt="item.title"/>
          </figure>
        </div>
        <div class="title" v-if="product?.title"><h4>{{product.title}}</h4></div>
        <div class="price mt-2">
          <span class="price-number">{{separatePrice(product.price)}}</span>
          <span class="text-sm mr-1">تومان</span>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<style scoped>
.color-range{
  figure{
    img {
      padding: 3px;
    border: 1px solid var(--color-999);
    border-radius: 100%;
    }
  }
}
</style>
