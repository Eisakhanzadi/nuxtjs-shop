<script setup lang="ts">
const emit = defineEmits(['changeStep']);
const {public: {baseUrlTwo}} = useRuntimeConfig()
const {$toast} = useNuxtApp()
const phoneNumber = ref<string>("")
const loading = ref<boolean>(false)
const input = ref<HTMLInputElement | null>(null)

function handleSubmit() {
  if (phoneNumber.value.length != 11 || (phoneNumber.value[0] != 0 || phoneNumber.value[1] != 9)) {
    console.log(phoneNumber.value.length)
    $toast('شماره وارد شده صحیح نمیباشد', {type: 'error'});
  } else {
    loginUser()
  }
}

onMounted(() => input.value.focus())

async function loginUser() {
  const formData = new FormData()
  formData.append("mobile", phoneNumber.value)
  formData.append("sdlkjcvisl", "uikjdknfs")
  try {
    loading.value = true
    const {data,status,error} = await useFetch(`${baseUrlTwo}customer/register-login`, {
      method: 'POST',
      body: formData,
    })
    await getToken(formData)
    if (status.value === "success") {
      emit('changeStep', 2, phoneNumber.value , data.value?.data?.status)
    }
    if (error.value){
      $toast.success(data.value.message , {type: 'error'});
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

async function getToken(formData: FormData) {
  const {error, data} = await useFetch(`${baseUrlTwo}customer/send/token`, {
    method: 'POST',
    body: formData,
  })
  if (error.value) {
    console.log(error.value)
  }
}
</script>

<template>
  <form class="w-full" action="" @submit.prevent="handleSubmit">
    <div class=" flex flex-col justify-center items-center gap-6">
      <label class="text-xs font-light text-center " for="phone-number">لطفا شماره تماس خود را وارد کنید</label>
      <div class="w-full">
        <input v-model="phoneNumber"
               :class="{'border-green-500 !bg-[rgb(0 255 0 / 18%)]':phoneNumber.length == 11 && (phoneNumber[0]==0 && phoneNumber[1]==9)}"
               inputmode="numeric" ref="input" id="phone-number"
               class="text-sm text-center py-3.5 px-2 w-full border outline-0 border-black placeholder:text-xs placeholder:font-light"
               type="text" placeholder="لطفا شماره موبایل خود را وارد کنید.">
        <button :disabled="loading"
                class="border w-full mt-3 flex items-center justify-center border-black bg-black transition ease-linear duration-200 text-center py-3.5 group  hover:bg-white "
                type="submit">
          <loader-spinner v-if="loading"/>
          <span class="text-white group-hover:text-black" v-else>ورود</span>
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>