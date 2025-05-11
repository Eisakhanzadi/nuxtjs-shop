<script setup lang="ts">
const steps = ref<number>(1)
const phoneNumber = ref<number|null>(null)
onMounted(() => {
  if (process.client)
    document.body.classList.add('overflow-hidden')
})
onBeforeUnmount(()=>{
  if (process.client)
    document.body.classList.remove('overflow-hidden')
})
function changeStep(step: number ,phone:string) {
  steps.value=step
  phoneNumber.value = Number(phone)
}
</script>

<template>
<div class="p-7">
  <div class="pb-5 border-b ">
    <p class="text-sm text-center font-bold">ورود به سایت </p>
  </div>
  <div class="w-3/4 mx-auto flex flex-col justify-center items-center py-7">
    <client-only>

    <login-get-phone-number @changeStep="changeStep" v-if="steps==1"/>
    <login-get-sms-token v-if="steps==2"/>
    </client-only>
  </div>
</div>
</template>

<style scoped>

</style>