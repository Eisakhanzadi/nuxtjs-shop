<script setup lang="ts">
import VOtpInput from "vue3-otp-input";
import {useGetUserStore} from "~/stores/user";
const {public:{baseUrlTwo}} = useRuntimeConfig()
const {$toast} = useNuxtApp()
const emit = defineEmits(['changeStep','successLogin'])
const {mobile,userType} = defineProps({
  mobile:{
    required: true,
    type:String||Number,
    default:""
  },
  userType:{
    required: true,
    type:String,
    default:"login"
  }
})
const token = ref<number | string>("")
const loading = ref<boolean>(false)
const userStore = useGetUserStore()
async function handleRegisterLogin(){
  loading.value = true
  const formData:FormData = new FormData()
  formData.append("mobile",mobile)
  formData.append("type",userType)
  formData.append("sms_token",Number(token.value))
  try{
    const {data,status,error} = await useFetch(`${baseUrlTwo}customer/verify`,{
      method:"POST",
      body:formData
    })
    if (status.value === "success"){
      const user = data.value?.data.data
      userStore.user = user
      userStore.userStatus = {
        isLogin: true,
        mobile:user.mobile,
        fullName: user.user.full_name,
        token: user.access_token,
        carts:user.user.carts
      }
      useCookie('jwt' ).value = user.access_token
     userType === 'login' ? $toast.success(' خوش برگشتی 😘' ,{type:'success'}) : $toast.success( 'به فروشگاه خودتون خوش آمدید 😍 ' , {type:'success' })
      emit('successLogin' )
      return navigateTo('/user-panel')
    }
    if (error.value){
      $toast.success(data.value.message)
    }
  }catch (e){
    console.log(e)
  }finally {
    loading.value = false
  }
}
</script>

<template>
  <client-only>
    <form @submit.prevent="handleRegisterLogin" class="flex w-full  flex-col items-center justify-center "> {{token}}
      <div>
        <p class="text-sm flex items-center gap-1.5 text-nowrap mb-5 ">
          <icons-alert class="scale-125 mb-1"/>
          <span> کد 4 رقمی ارسال شده به شماره همراه خود را وارد کنید</span>
        </p>
      </div>
      <div class="flex items-center justify-evenly w-full my-5 ">
        <span class="text-sm">{{mobile}}</span>
        <button @click="emit('changeStep' , 1)" class="text-green-500 text-xs flex gap-1.5"> <icons-edit/> ویرایش شماره</button>
      </div>
      <div class="flex">
        <v-otp-input
            dir="ltr"
            ref="otpInput"
            input-classes="otp-input"
            :conditionalClass="['one', 'two', 'three', 'four']"
            separator=" "
            inputType="letter-numeric"
            :num-inputs="4"
            v-model:value="token"
            :should-auto-focus="true"
            :should-focus-order="true"
            @on-change=""
            @on-complete="handleRegisterLogin"
            :placeholder="['', '', '', '']"
        />
      </div>
      <div class="w-full mt-5">
        <button :disabled="loading" class="border w-full mt-3 flex items-center justify-center border-black bg-black transition ease-linear duration-200 text-center py-3.5 group  hover:bg-white " type="submit">
          <loader-spinner v-if="loading" />
          <span class="text-white group-hover:text-black" v-else>ورود</span>
        </button>
      </div>
    </form>
  </client-only>
</template>

<style>
.otp-input {
  width: 55px;
  height: 55px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

.otp-input.is-complete {
  background-color: rgb(0 255 0 / 18%);
  border: 1px solid rgb(0 255 0 / 90%);
  color: var(--color-444);
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>