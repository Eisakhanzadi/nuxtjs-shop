<script setup lang="ts">

</script>

<template>
  <div class="grid gap-2">
    <loader-skeleton class="w-full h-24 !rounded-lg"/>
    <loader-skeleton class="w-full h-4 !rounded-lg"/>
    <div class="flex items-center justify-between">
      <loader-skeleton class="w-1/3 h-4 !rounded-lg"/>
      <loader-skeleton class="w-1/3 h-4 !rounded-lg"/>
    </div>
    <loader-skeleton v-for="item in 3" :key="item" class="w-full h-4 mt-2 !rounded-lg"/>
  </div>
</template>

<style scoped>

</style>