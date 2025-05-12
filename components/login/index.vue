<script setup lang="ts">
const emit = defineEmits(['close'])
const steps = ref<number>(1)
const phoneNumber = ref<number | string>("")
const userType = ref<string>("login")

onMounted(() => {
  if (process.client)
    document.body.classList.add('overflow-hidden')
})
onBeforeUnmount(() => {
  if (process.client)
    document.body.classList.remove('overflow-hidden')
})

function changeStep(step: number, phone: string , statusType:string) {
  userType.value =statusType
  step == 1 ? steps.value-- : steps.value++
  phoneNumber.value = String(phone)
}
</script>

<template>
  <div class="p-7">
    <div class="pb-5 border-b flex items-center justify-center">
      <button @click="emit('close')"
              class="font-bold hover:text-black w-fit h-fit p-1 text-2xl text-color-999 ml-auto ">&Cross;
      </button>
      <p class="text-[15px] text-center ml-auto font-bold">ورود به سایت </p>
    </div>
    <div class=" w-2/3 md:w-8/12 mx-auto flex flex-col justify-center items-center py-7">
      <client-only>
        <keep-alive>
          <login-get-phone-number @changeStep="changeStep" v-if="steps==1"/>
        </keep-alive>
        <login-get-sms-token @successLogin="emit('close')" @changeStep="changeStep" :userType="userType" :mobile="phoneNumber" v-if="steps==2"/>
      </client-only>
    </div>
  </div>
</template>

<style scoped>

</style>