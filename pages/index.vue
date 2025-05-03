<script setup lang="ts">
import {SwiperSlide} from "swiper/vue";

const {public: {baseUrl}} = useRuntimeConfig()
import topSlider from "~/assets/static images/homeSlider/1.jpg"
import p1 from "~/assets/static images/products/1.jpg"
import p11 from "~/assets/static images/products/2.jpg"
import p2 from "~/assets/static images/products/3.jpg"
import p22 from "~/assets/static images/products/4.jpg"
import p3 from "~/assets/static images/products/5.jpg"
import p33 from "~/assets/static images/products/6.jpg"
import p4 from "~/assets/static images/products/7.jpg"
import p44 from "~/assets/static images/products/8.jpg"
import p5 from "~/assets/static images/products/9.jpg"
import p55 from "~/assets/static images/products/10.jpg"
import p6 from "~/assets/static images/products/11.jpg"
import p66 from "~/assets/static images/products/12.jpg"

import cat1 from "~/assets/static images/categories/1.jpg"
import cat2 from "~/assets/static images/categories/2.jpg"
import cat3 from "~/assets/static images/categories/3.jpg"
import cat4 from "~/assets/static images/categories/4.jpg"
import cat5 from "~/assets/static images/categories/5.jpg"

import post1 from "~/assets/static images/weblog/1.jpg"
import post2 from "~/assets/static images/weblog/2.jpg"
import post3 from "~/assets/static images/weblog/3.jpg"
import post4 from "~/assets/static images/weblog/4.jpg"

const categoriesImages = [
  {
    id: 1,
    img: cat1
  },
  {
    id: 2,
    img: cat2
  },
  {
    id: 3,
    img: cat3
  },
  {
    id: 4,
    img: cat4
  },
  {
    id: 5,
    img: cat5
  },
]
const productsImages = [
  {
    id: 1,
    img_one: p1,
    img_two: p11,
  },
  {
    id: 2,
    img_one: p2,
    img_two: p22,
  },
  {
    id: 3,
    img_one: p3,
    img_two: p33,
  },
  {
    id: 4,
    img_one: p4,
    img_two: p44,
  },
  {
    id: 5,
    img_one: p5,
    img_two: p55,
  },
  {
    id: 6,
    img_one: p6,
    img_two: p66,
  },
]
const weblogsImages = [
  {
    id: 1,
    img: post1
  },
  {
    id: 2,
    img: post2
  },
  {
    id: 3,
    img: post3
  },
  {
    id: 4,
    img: post4
  },
]
const productImages = [
  {
    id: 1,
    image: p1,
    image_two: p11
  },
  {
    id: 2,
    image: p2,
    image_two: p22
  },
  {
    id: 3,
    image: p3,
    image_two: p33
  },
  {
    id: 4,
    image: p4,
    image_two: p44
  },
  {
    id: 5,
    image: p5,
    image_two: p55
  },
  {
    id: 6,
    image: p6,
    image_two: p66
  },
]
const {data:categories} = await useFetch(`${baseUrl}categories `)
const createCategories = computed(() => categories.value?.filter(category => category.children?.length > 0))
const {data:posts} = await useFetch(`${baseUrl}posts `)
const createDesktopPosts = computed(() =>posts.value?.posts?.data )
const {data:products} = await useFetch(`${baseUrl}products `)
const createDesktopNewProducts = computed(() =>products.value?.new_products?.response?.new_products )
const createDesktopMostSales = computed(() =>products.value.most_sales.response.mostSales )
console.log(createDesktopMostSales.value)
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
  <section v-if="createCategories" class="container  mx-auto md:px-10 flex flex-col gap-y-16 py-10">
    <div>
      <slider :breakpoints="topSliderConfig">
        <swiper-slide>
          <nuxt-link><figure class="overflow-hidden rounded-xl"><img class="w-full" :src="topSlider" alt=""></figure></nuxt-link>
        </swiper-slide>
      </slider>
    </div>
    <div v-if="createCategories">
      <slider >
        <swiper-slide v-for="(item,index) in createCategories[0].children.slice(0,5)" :key="item.id">
          <card-category :images="categoriesImages[index]" :data="item"/>
        </swiper-slide>
      </slider>
    </div>
    <div v-if="createDesktopNewProducts" >
      <slider-title class="mb-7" :data="{title:'پرفروش ترین ها' , url:'/products?most_sales'}" />
      <slider :breakpoints="weblogConfig" >
        <swiper-slide v-for="(item,index) in createDesktopNewProducts.slice(0,4)" :key="item.id">
          <card-product :product="item"/>
        </swiper-slide>
      </slider>
    </div>
    <div v-if="createDesktopMostSales" >
      <slider-title class="mb-10" :data="{title:'جدیدترین ها' , url:'/products?new_products'}" />
      <slider :breakpoints="weblogConfig" >
        <swiper-slide v-for="(item) in createDesktopMostSales.slice(0,4)" :key="item.id">
          <card-product :product="item"/>
        </swiper-slide>
      </slider>
    </div>
    <div v-if="createDesktopPosts" >
      <slider-title class="mb-10" :data="{title:'پست ها' , url:'/weblog-list'}" />
      <slider :breakpoints="weblogConfig" >
        <swiper-slide v-for="(item) in createDesktopPosts.slice(0,4)" :key="item.id">
          <card-weblog  :data="item"/>
        </swiper-slide>
      </slider>
    </div>
  </section>
</template>

<style scoped>

</style>
