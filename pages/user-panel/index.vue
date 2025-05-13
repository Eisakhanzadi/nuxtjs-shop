<script setup lang="ts">
import UserPanel from "~/pages/user-panel.vue";

const showDetails = ref<boolean>(false)
</script>

<template>
  <section>
      <user-panel-title title="اطلاعات کاربری"/>
      <user-panel-info-user-info v-if="!showDetails" @showDetails="showDetails = true"/>
      <user-panel-info-edit-info @closeDetails="showDetails = false" v-else/>
  </section>
</template>

<style scoped>

</style>