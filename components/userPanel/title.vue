<script setup lang="ts">
const {title} = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class=" pb-5 ">
    <h5 class="block text-center" v-if="title">{{ title }}</h5>
    <div class="divider mt-2"></div>
  </div>
</template>

<style scoped>
.divider {
  height: 1px;
  background-image: linear-gradient(90deg, #fff, var(--color-da) 40%, #fff);
}
</style>