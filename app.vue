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
</script>
<style scoped>
.app{
  background: var(--bg-primary);
  min-height: 100vh;
}
</style>
