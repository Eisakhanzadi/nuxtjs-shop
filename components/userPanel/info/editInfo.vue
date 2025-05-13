<script setup>
import errorSlicer from "~/composables/errorSlicer";
import CartNumber from "~/components/userPanel/address/cartNumber.vue";
import separatorCartNumber from "~/composables/sepratorCartNumber.js";
const {$toast} = useNuxtApp()
const cartsNumbers = ref(null)
const emit = defineEmits(['closeDetails'])
const user = useGetUserStore()
const file = ref(null)
const {public: {configHeader, baseURL}} = useRuntimeConfig()
const productImagesBase64 = ref()




const {profile} = defineProps({
  profile: {
    type: Object,
    default: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      national_code: "",
      card_number: [],
      birth_date: "",
      gender: "",
      file: "",
      newsletter: false,
      foreign_national: false
    }
  }
})
let cardBanck=ref((profile.card_number !=null && profile.card_number.length)?profile.card_number:"")
function setInputValue(event){
  console.log(event);
  console.log(profile.card_number);
  console.log(cardBanck.value);

  cardBanck.value=event.cardNumber
}

const params = reactive({
  first_name: profile.first_name ?? "" ,
  last_name: profile.last_name ?? "" ,
  email: profile.email ?? '',
  password: 123456,
  national_code: profile.national_code ?? '',
  card_number: separatorCartNumber(profile?.card_number ?? ''),
  birth_date: profile.birth_date ?? '',
  gender: profile.gender === null ? 'male' : profile.gender,
  file: profile.file,
  img:'',
  newsletter: profile.newsletter ?? false,
  foreign_national: profile.foreign_national ?? false
})
const paramsError = reactive({
  first_name: false,
  last_name: false,
  email: false,
  national_code: false,
  card_number: false,
  birth_date: false,
  gender: false,
})

function resultGender(status) {
  params.gender = status.gender
}

/* start otp input functions  */

function selectInput(id) {
  paramsError.card_number = false
  let input1 = cartsNumbers.value[0];
  let input2 = cartsNumbers.value[1];
  let input3 = cartsNumbers.value[2];
  let input4 = cartsNumbers.value[3];
  if (cartsNumbers.value[id].value) {
    return cartsNumbers.value[id].select();
  }
  // درصورت خالی بودن ورودی ها
  if (input1 == "" || input1.length != 4) {
    return cartsNumbers.value[0].focus();
  } else if (input2 == "" || input2.length != 4) {
    return cartsNumbers.value[1].focus();
  } else if (input3 == "" || input3.length != 4) {
    cartsNumbers.value[2].focus();
  } else if (input4 == "" || input4.length != 4) {
    return cartsNumbers.value[3].focus();
  } else {
    cartsNumbers.value[id].select();
  }
  console.log(cartsNumbers.value[id])
}

function changeCart(event) {
  let number = Number.parseInt(event.target.dataset.num);
  if (event.target.value.length == event.target.maxLength) {
    if (number == 4) {
      // اگر اخرین اینپوت بود
      return;
    } else {
      cartsNumbers.value[number + 1].select();
    }
  }
}

function clearCart(event) {
  // در صورت پاک کرن بین اینپوت ها حرکت کند
  if (event.key == "Backspace") {
    if (!event.target.value.length) {
      let number = Number.parseInt(event.target.dataset.num);
      cartsNumbers.value[(number - 1)].select();
    }
  }
}

function preventText(e){
  if (((e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) && e.keyCode != 8 && e.keyCode != 9 )
  {
    e.preventDefault();
  }
}
/* end otp input functions  */

/*start form validation */
function handleForm() {
  if (params.first_name === null || params.first_name.length < 2) {
    paramsError.first_name = true
  }
  if (params.last_name === null || params.last_name.length < 3) {
    paramsError.last_name = true
  }
  if (params.birth_date === null || !params.birth_date.toString().length) {
    paramsError.birth_date = true
  }
  if (params.gender === null || !params.gender.length) {
    paramsError.gender = true
  }
  if (!params.foreign_national) {
    if (params.national_code === null || (params.national_code.toString().length != 10)) {
      paramsError.national_code = true
    }
  }
  if (!params.foreign_national && (params.national_code !== null && (params.national_code.toString().length == 10))) {
  } else {
    paramsError.national_code = true
  }
  if (params.email.length && params.email.length < 12 && !params.email.includes('@')) {
    paramsError.email = true
  } else {
    paramsError.email = false
  }
  if ((params.card_number.join().length && !isNaN(Number(params.card_number.join()))) && params.card_number.join().toString().length !== 16) {
    paramsError.card_number = true
  } else {
    paramsError.card_number = false
  }
  if ((params.first_name !== null && params.first_name.length > 2) &&
      (params.last_name !== null && params.last_name.length > 3) &&
      (params.birth_date !== null && params.birth_date.toString().length) &&
      (params.gender !== null && params.gender.length)
  ) {
    sendProfileData()
  }
}

async function sendProfileData() {
  console.log(params)
  const formData = new FormData()
  formData.append('national_code', params.national_code)
  formData.append('gender', params.gender)
  formData.append('first_name', params.first_name)
  formData.append('last_name', params.last_name)
  formData.append('birth_date', params.birth_date)
  formData.append('foreign_national', params.foreign_national ? 1 : 0)
  formData.append('newsletter', params.newsletter ? 1 : 0)
  formData.append('_method', 'PATCH')
  if (cardBanck.value.length == 16) {
    // formData.append('card_number', params.card_number.join())
    formData.append('card_number', cardBanck.value)
  }
  if (params.email.length) {
    formData.append('email', params.email)
  }
  if (params.file != null && params.file.length) {
    formData.append('image', params.file)
  }
  await $fetch(`${baseURL}/customer/profile`, {
    method:'POST' ,
    headers: configHeader,
    body: formData
  }).then(response=>{
    if(response.success){
      user.setUser()
      $toast.success(response.message)
      emit('closeDetails')
    }else{
      throw new Error(response.message)
    }
  }).catch(e=>{
    errorSlicer(e.message)
  })
}

/*end form validation*/

/* start convert iamge to base 64 */
async function addImagesBase64(file) {
  console.log(file)
  params.img = (await toBase64(file))
}
async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  });
}
/* end convert iamge to base 64 */

</script>

<template>
  <div>
    <div class="edit-title pb-3 mb-5">
      <h5 class="text-sm md:text-base lg:text-lg font-bold ">اطلاعات حساب شخصی </h5>
    </div>
    <div>
      <form class="grid grid-cols-1 sm:grid-cols-2 w-full gap-5" @submit.prevent="handleForm">
        <div class="grid col-span-2 sm:col-span-1 gap-3">
          <div class="input-group flex flex-col items-start gap-2">
            <label class="text-color-999 text-sm after:content-['*'] after:text-red-500" for="name">نام : </label>
            <input @keydown="paramsError.first_name = false" v-model="params.first_name"
                   class="outline-0 border rounded text-color-444  px-3 py-2 w-full" id="name" type="text">
            <span class="error text-red-500 text-xs" v-if="paramsError.first_name">لطفا نام خود را وارد کنید</span>
          </div>
          <div class="input-group flex flex-col items-start gap-2">
            <label class="text-color-999 text-sm after:content-['*'] after:text-red-500" for="lastName">نام خانوادگی
              : </label>
            <input v-model="params.last_name" @keydown="paramsError.last_name = false"
                   class="outline-0 border rounded text-color-444  px-3 py-2 w-full" id="lastName"
                   type="text">
            <span class="error text-red-500 text-xs"
                  v-if="paramsError.last_name">لطفا نام خانوادگی خود را وارد کنید</span>
          </div>
          <div class="input-group flex flex-col items-start gap-2 order-1">
            <label class="text-color-999 text-sm" for="email">ایمیل : </label>
            <input v-model="params.email" @keyup="paramsError.email = false"
                   class="outline-0 border rounded text-color-444  px-3 py-2 w-full" id="email"
                   type="text">
            <span class="error text-red-500 text-xs" v-if="paramsError.email">لطفا ایمیل خود را وارد کنید</span>
          </div>
          <div class="input-group flex flex-col items-start gap-2" v-if="false">
            <label class="text-color-999 text-sm" for="password"> رمز عبور : </label>
            <input disabled v-model="params.password" class="outline-0 border rounded text-color-444  px-3 py-2 w-full"
                   id="password"
                   type="password">
          </div>
          <div v-if="!params.foreign_national" class="input-group flex flex-col items-start gap-2">
            <label class="text-color-999 text-sm after:content-['*'] after:text-red-500" for="nationCode"> کد ملی
              : </label>
            <input v-model="params.national_code" class="outline-0 border rounded text-color-444  px-3 py-2 w-full"
                   id="nationCode"
                   type="text">
            <span class="error text-red-500 text-xs" v-if="paramsError.national_code">لطفا کدملی خود را وارد کنید</span>
          </div>
        </div>
        <div class="grid col-span-2 sm:col-span-1 gap-3">
          <div class="input-group">
            <label class="after:content-['*'] after:text-red-500 text-color-999 text-sm">تاریخ تولد : </label>
            <client-only>
              <date-picker format="YYYY-MM-DD" class="w-full" color='black' v-model="params.birth_date"/>
            </client-only>
            <span class="error text-red-500 text-xs"
                  v-if="paramsError.birth_date">لطفا تاریخ تولد خود را وارد کنید</span>

          </div>
          <div class="input-group flex flex-col items-start gap-2">
            <label class="text-color-999 text-sm">  شماره کارت :</label>
            <cart-number :cardBanck="cardBanck" @inputValue="setInputValue"/>
            <span class="error text-red-500 text-xs"
                  v-if="paramsError.card_number">شماره کارت وارد شده صحیح نمیباشد </span>
          </div>
          <div class="input-groups  flex items-center my-5 sm:my-0">
            <div class="input-group flex  items-center  gap-3 ">
              <label class="text-color999 text-sm after:content-['*'] after:text-red-500" for="gender">جنسیت : </label>
              <multi-selection placeholder="مرد" @result="resultGender"
                               :options="{name:params.gender==='male' ? 'مرد' : 'زن' , id:params.gender=='male'? 1 : 2   ,gender:params.gender}"
                               :data="[ {name:'زن' , id:1 , gender:'female'} , {name:'مرد' , id:1 , gender:'male'} ]"/>
            </div>
            <div class="input-group mx-auto">
              <label for="file" class="text-white text-sm cursor-pointer bg-black rounded px-2 py-2">
                تصویر پروفایل
                <input id="file" accept="image/*" ref="file" type="file"
                       @change="async (e)=>await addImagesBase64(e.target.files[0])" hidden>
              </label>
            </div>
          </div>
          <span class="error text-red-500 text-xs" v-if="paramsError.gender">لطفا جنسیت خود را انتخاب کنید</span>
          <div
              class="border-b-0 border-x-0 border-t border-t-border-color border-solid pt-5 flex flex-col gap-1.5 items-start">
            <div class="input-group checkbox gap-1 ">
              <label for="newsletter" class="text-color999 text-sm  flex items-center">
                <input type="checkbox" v-model="params.newsletter" class="hidden" id="newsletter">
                <span class="check ml-1"></span>
                عضویت در خبر نامه
              </label>
            </div>
            <div class="input-group checkbox gap-1 ">
              <label for="citizenShip" class=" text-color999 text-sm flex items-center">
                <input type="checkbox" v-model="params.foreign_national" class="hidden" id="citizenShip">
                <span class="check ml-1"></span>
                تابعیت خارجی
              </label>
            </div>
          </div>
        </div>
        <div
            class="col-span-2 buttons border-b-0 border-x-0 border-t border-t-border-color border-solid pt-5 flex justify-start items-center gap-3 ">
          <button class="text-sm text-white border border-solid transition ease-in duration-150 hover:border-black hover:bg-white hover:text-black bg-black px-3 py-2">
            ثبت اطلاعات کاربری
          </button>
          <button type="button" @click="emit('closeDetails')"
                  class="text-sm  border-solid  border text-color-444 px-3 py-2">انصراف
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  .check {
    border: 1px solid var(--border-color);
    display: inline-block;
    border-radius: 20px;
    width: 25px;
    height: 16px;
    position: relative;
    transition: 0.3s;

    &:after {
      content: '';
      width: 12px;
      height: 12px;
      background-color: var(--color-666);
      position: absolute;
      top: 50%;
      right: 1%;
      border-radius: 30px;
      transform: translate(0, -50%);
      transition: 0.3s;
    }
  }

  input:checked + .check {
    background-color: cornflowerblue;

    &:after {
      background-color: white;
      transform: translate(-90%, -50%);
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>