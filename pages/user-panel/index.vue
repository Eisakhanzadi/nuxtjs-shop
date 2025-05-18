<script setup lang="ts">

const store = useGetUserStore()
const userStore = computed(()=>store.getUser)
const showDetails = ref<boolean>(false)
</script>

<template>
  <section> {{userStore}}
      <user-panel-title title="اطلاعات کاربری"/>
    <div v-if="userStore?.user">
      <user-panel-info-user-info :data="useStore?.user" v-if="!showDetails" @showDetails="showDetails = true"/>
      <user-panel-info-edit-info :data="useStore?.user" @closeDetails="showDetails = false" v-else/>
    </div>
  </section>
</template>

<style scoped>

</style>