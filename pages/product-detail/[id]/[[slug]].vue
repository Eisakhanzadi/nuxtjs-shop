<script setup lang="ts">
const breadcrumb = [
  {
    name:"محصولات",
    url:"/product-category"
  },
  {
    name:"",
    url:""
  },
]
const store = useProductsStore()
</script>

<template>
<section>
  <LazyBreadcrumb :data="breadcrumb" />
</section>
</template>

<style scoped>

</style>