<script setup lang="ts">
</script>

<template>
<div class="grid gap-3">
  <loader-skeleton class="w-full h-[200px] lg:h-[350px] " />
  <div class="flex gap-1.5 items-center">
    <loader-skeleton v-for="item in 3" :key="item" class="w-5 h-5 rounded-full" />
  </div>
  <loader-skeleton class="w-full h-4" />
  <loader-skeleton class="w-3/4 h-4" />
  <loader-skeleton class="w-1/4 h-4 mt-1"  />
</div>
</template>

<style scoped>

</style>