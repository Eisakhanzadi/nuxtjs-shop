<script setup lang="ts">
import UserPanel from "~/pages/user-panel.vue";

const showDetails = ref<boolean>(false)
</script>

<template>
<section>
  <user-panel-title title="اطلاعات کاربری"/>
  <user-panel-user-info v-if="!showDetails" @showDetails="showDetails = true"/>
</section>
</template>

<style scoped>

</style>