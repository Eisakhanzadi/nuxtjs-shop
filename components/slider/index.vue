<template>
  <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :pagination="{
      clickable: true,
    }"
      :breakpoints=breakpoints
      class="mySwiper"
  >
    <swiper-slide v-for="item in 50" :key="item">Slide {{ item }}</swiper-slide>
  </swiper>
</template>
<script setup>
const {pagination} = defineProps({
      pagination: {
        type: Boolean,
        default: false
      },
      breakpoints: {
        type: Object,
        default: {
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }
    },
})
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import required modules
import {Pagination} from 'swiper/modules';

const modules = [
  pagination ? Pagination : ""
]
</script>
