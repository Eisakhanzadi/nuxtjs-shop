<script setup lang="ts">
const {data} = defineProps({
  data:{
    type:Object,
    default:{
      title:'لینک' ,
      url:"/products"
    }
  }
})
</script>

<template>
  <div class="flex justify-between items-center">
    <div><h3 class="font-bold text-lg md:text-2xl">{{data.title}}</h3></div>
    <div>
      <button class="border-2 border-black pb-1.5 border-t-0 border-x-0 text-sm px-0.5" @click="()=>navigateTo(data.url)">مشاهده بیشتر</button>
    </div>
  </div>
</template>

<style scoped>

</style>
