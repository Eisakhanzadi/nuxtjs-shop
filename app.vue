<template>
  <div class="app">
    <NuxtRouteAnnouncer/>
    <nuxt-layout>
      <nuxt-page/>
    </nuxt-layout>
  </div>
</template>
<style scoped>
.app{
  background: var(--bg-primary);
  min-height: 100vh;
}
</style>
