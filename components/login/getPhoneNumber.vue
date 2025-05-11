<script setup lang="ts">
const emit = defineEmits(['changeStep']);
const {$toast} = useNuxtApp()
const phoneNumber = ref<string>("")
function handleSubmit(){
  if (phoneNumber.value.length != 11 || (phoneNumber.value[0]!=0 || phoneNumber.value[1]!=9)) {
    console.log(phoneNumber.value.length)
    $toast('شماره وارد شده صحیح نمیباشد' , {type:'error'});
  }else{
    emit('changeStep',2,phoneNumber.value)
  }
}
</script>

<template>
  <form class="w-full" action="" @submit.prevent="handleSubmit">
    <div class=" flex flex-col justify-center items-center gap-6">
      <label class="text-xs font-light text-center " for="phone-number">لطفا شماره تماس خود را وارد کنید</label>
      <div class="w-full">
        <input v-model="phoneNumber" id="phone-number" class="text-sm text-center py-3.5 px-2 w-full border outline-0 border-black placeholder:text-xs" type="text" placeholder="لطفا شماره موبایل خود را وارد کنید.">
        <button class="border w-full mt-3 text-white border-black bg-black transition ease-linear duration-200 text-center py-3.5 hover:bg-white hover:text-black " type="submit">ورود</button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>