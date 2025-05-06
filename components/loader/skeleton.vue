<template>
  <div class="skeleton"></div>
</template>
<script setup>
let {bgColor}=defineProps({
  bgColor:{
    type:String,
    default:"linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)"
  }
})
</script>
<style scoped>
.skeleton{
  background:  v-bind(bgColor);
  border-radius: 25px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
