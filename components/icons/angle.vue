<template>
  <svg data-v-9b716b42="" width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path data-v-9b716b42="" d="M19 8.5L12 15.5L5 8.5" stroke="#444" :stroke-width="strokeWidth" stroke-linecap="round"
          stroke-linejoin="round"></path>
  </svg>
</template>
<script setup>
 const {strokeWidth} = defineProps({
   strokeWidth:{
     default:1.5,
     type:Number
   }
 })
</script>
