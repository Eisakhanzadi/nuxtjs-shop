<script setup>
const {fill} = defineProps({
  fill:{
    type:String,
    default:"none"
  }
})
</script>
<template>
  <svg data-v-7caa044c="" width="25" height="25" viewBox="0 0 24 24" :fill="fill" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M11.761 20.8538C9.5904 19.5179 7.57111 17.9456 5.73929 16.1652C4.45144 14.8829 3.47101 13.3198 2.8731 11.5954C1.79714 8.25031 3.05393 4.42083 6.57112 3.28752C8.41961 2.69243 10.4384 3.03255 11.9961 4.20148C13.5543 3.03398 15.5725 2.69398 17.4211 3.28752C20.9383 4.42083 22.2041 8.25031 21.1281 11.5954C20.5302 13.3198 19.5498 14.8829 18.2619 16.1652C16.4301 17.9456 14.4108 19.5179 12.2402 20.8538L12.0051 21L11.761 20.8538Z"
          stroke="#444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M15.7393 7.05301C16.8046 7.39331 17.5615 8.34971 17.6561 9.47499" stroke="#444" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
</template>

