<template>
  <div class="app">
    <NuxtRouteAnnouncer/>
    <nuxt-layout name="default">
      <nuxt-page/>
    </nuxt-layout>
  </div>
</template>
<script setup>
 definePageMeta({
   layout: 'default',
 })
 const jwt = useCookie('jwt').value
 useHead({
   titleTemplate: (title) => {
     return title ? `فروشگاه لباس | ${title}` : 'فروشگاه لباس'
   }
 })
</script>
<style scoped>
.app{
  background: var(--bg-primary);
  min-height: 100vh;
}
</style>
