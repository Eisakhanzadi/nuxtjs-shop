<script setup lang="ts">
const {menus} = defineProps({
  menus:{
    type:Array,
    default:[]
  }
})
</script>

<template>
<div class="bg-white z-50 mega-menu p-5 rounded-xl" v-if="menus?.length">
  <div class="h-full">
    <mega-menu-create-menu-items :menus="menus"/>
  </div>
</div>
</template>

<style scoped>
.mega-menu{
  height: 80vh;

}
</style>
