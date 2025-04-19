<script setup lang="ts">
const {menus} = defineProps({
  menus:{
    type:Array,
    default:[]
  }
})
</script>

<template>
<div class="bg-white z-50 mega-menu p-5 rounded-xl shadow-lg" v-if="menus?.length">
  <div class="h-full">
    <mega-menu-create-menu-items :menus="menus"/>
  </div>
</div>
</template>

<style scoped>
.mega-menu{
  box-shadow: 0 0 5px rgba(0,0,0,0.15);
  height: 650px;
}
</style>
