<script setup lang="ts">
import topSlider from "~/assets/static images/homeSlider/1.jpg"

import {SwiperSlide} from "swiper/vue";
import {useHomeStore} from "~/stores/Home";

const store = useHomeStore()
const weblogStore = useWeblogStore()
await store.fetchHome()
await weblogStore.fetchWeblogList()

const posts = computed(() => weblogStore.getWeblogList.mostViews)
const homeData = computed(() => store.getHome)
const mostSales = computed(() => store.getMostSales)
const mostDiscount = computed(() => store.getMostDiscount)
const newProducts = computed(() => store.getNewProducts)

const topSliderConfig = {
  '300': {
    slidesPerView: 1,
    spaceBetween: 10,
  },
}
const weblogConfig = {
  '300': {
    slidesPerView: 1.5,
    spaceBetween: 15,
  },
  '400': {
    slidesPerView: 2.3,
    spaceBetween: 10,
  },
  '600': {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  '900': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
}
</script>

<template>
  <section class="container  mx-auto md:px-10 flex flex-col gap-y-16 py-10">
    <div>
      <slider :breakpoints="topSliderConfig">
        <swiper-slide>
          <nuxt-link>
            <figure class="overflow-hidden rounded-xl"><img class="w-full" :src="topSlider" alt=""></figure>
          </nuxt-link>
        </swiper-slide>
      </slider>
    </div>
    <div>
      <div v-if="homeData?.special_categories?.length && !store.loading">
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in homeData.special_categories" :key="item.id">
            <card-category :data="item"/>
          </swiper-slide>
        </slider>
      </div>
      <div v-else>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in 8" :key="item">
            <div class="flex flex-col justify-center items-center gap-3">
              <loader-skeleton class="w-auto h-24"/>
              <loader-skeleton class="w-auto h-6"/>
            </div>
          </swiper-slide>
        </slider>
      </div>
    </div>
    <div>
      <div v-if="mostSales?.length && !store.loading">
        <slider-title class="mb-7" :data="{title:'پرفروش ترین ها' , url:'/products?most_sales'}"/>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in mostSales" :key="item.id">
            <card-product :product="item"/>
          </swiper-slide>
        </slider>
      </div>
      <div v-if="!mostSales?.length && store.loading">
        <div class="flex justify-between items-center">
          <loader-skeleton class="w-1/3 md:w-1/5 h-5"/>
          <loader-skeleton class="w-1/3 md:w-1/5 h-5"/>
        </div>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in 8" :key="item">
            <loader-product-card/>
          </swiper-slide>
        </slider>
      </div>
    </div>
    <div>
      <div v-if="newProducts?.length && !store.loading">
        <slider-title class="mb-10" :data="{title:'جدیدترین ها' , url:'/products?new_products'}"/>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in newProducts" :key="item.id">
            <card-product :product="item"/>
          </swiper-slide>
        </slider>
      </div>
      <div v-if="!newProducts?.length && store.loading">
        <div class="flex justify-between items-center">
          <loader-skeleton class="w-1/3 md:w-1/5 h-5"/>
          <loader-skeleton class="w-1/3 md:w-1/5 h-5"/>
        </div>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in 8" :key="item">
            <loader-product-card/>
          </swiper-slide>
        </slider>
      </div>
    </div>
    <div>
      <div v-if="posts?.length && !weblogStore.loading">
        <slider-title class="mb-10" :data="{title:'پست ها' , url:'/weblog-list'}"/>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in posts" :key="item.id">
            <card-weblog :data="item"/>
          </swiper-slide>
        </slider>
      </div>
      <div v-else>
        <div class="flex justify-between items-center">
          <loader-skeleton class="w-1/3 md:w-1/5 h-5"/>
          <loader-skeleton class="w-1/3 md:w-1/5 h-5"/>
        </div>
        <slider :breakpoints="weblogConfig">
          <swiper-slide v-for="(item) in 8" :key="item">
            <loader-weblog-card/>
          </swiper-slide>
        </slider>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
