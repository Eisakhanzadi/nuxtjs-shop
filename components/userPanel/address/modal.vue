<script setup>
import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.css' ;
const locationsStore = useAddressStore()
const {data, title, theme, area, currentArea} = defineProps({
  data: {
    type: Object,
    default: {
      id: "",
      province: "",
      city: "",
      first_name: "",
      last_name: "",
      postal_code: "",
      mobile: "",
      address: "",
    }
  },
  title: String,
  theme: {
    default: true,
    type: Boolean
  },
  area: Array,
  currentArea: {
    default: null,
    type: Object
  }
})
const emit = defineEmits(['close'])
const formArea = ref({
  provinces: {name: data?.city?.province?.name ?? "", id: data?.city?.province?.id ?? ""},
  cities: {name: data?.city?.name ?? '', id: data?.city?.id ?? ""}
})
/* start for ref fro showing error*/
const formError = reactive({
  name: false,
  lastName: false,
  phone: false,
  address: false,
  postalCode: false,
  provinces: false,
  city: false,
})
const name = ref(null)
const lastName = ref(null)
const phone = ref(null)
const address = ref(null)
const postalCode = ref(null)
const loading = ref(false)
/* end for ref fro showing error*/
const cities = ref("")
const registerModeCity = ref(currentArea?.cities?.length ? currentArea.cities : null)
const form = reactive({
  province: data.province,
  city: data.city ?? null,
  first_name: data.first_name,
  last_name: data.last_name,
  postal_code: data.postal_code,
  mobile: data.mobile,
  address: data.address,
})


function handleSubmit() {
  const item = {
    city: form.city.id,
    first_name: form.first_name,
    last_name: form.last_name,
    postal_code: form.postal_code,
    mobile: form.mobile,
    address: form.address,
  }
  if (form.first_name.length < 2) {
    formError.name = true
    name.value.classList.add('error')
  }
  if (registerModeCity.value === null) {
    formError.provinces = true
  }
  if (form.city === null || formArea.value.cities === null) {
    formError.city = true
  }
  if (form.last_name.length < 2) {
    formError.lastName = true
    lastName.value.classList.add('error')
  }
  if (form.mobile.toString().length != 11 && form.mobile[0] !== 0 && form.mobile[1] !== 9) {
    formError.phone = true
    phone.value.classList.add('error')
  }
  if (form.address.length < 5) {
    formError.address = true
    address.value.classList.add('error')
  }
  if (form.postal_code.toString().length !== 10) {
    formError.postalCode = true
    postalCode.value.classList.add('error')
  }
  if (form.address.length > 5 &&
      registerModeCity.value !== null &&
      (form.mobile.toString().length == 11 && form.mobile.toString()[0] == 0 && form.mobile.toString()[1] == 9) &&
      (form.first_name.length) > 2 &&
      form.city?.id && formArea.value.cities !== null &&
      form.last_name.length > 2) {
    if (form.postal_code.toString().length && form.postal_code.toString().length == 10) {
      if (title === "ویرایش آدرس") {
        item.id = data.id
        locationsStore.editAddress(item)
      } else {
        locationsStore.insertAddress(item)
      }
    }
  } else {
    return false
  }
}

function removeError(item, span) {
  if (item.value.length > 2) {
    item.classList.remove('error')
    formError[span] = false
  }
}

function setCityFromProvinceInRegisterMode(item) {
  registerModeCity.value = area.filter(pro => pro.id === item.id)[0].cities
  // currentArea.cities = null
  formArea.value.cities = null
}

function createCitiesFromProvinces(data) {
  formError.city = false
  form.city = data
}
</script>

<template>
  <div class="backdrop fixed inset-0 z-50 w-full h-full flex justify-center items-center" @click.self="emit('close')">
    <div class="modal-content bg-white w-11/12 sm:w-2/3 lg:w-5/12 rounded-xl overflow-hidden overflow-y-auto ">
      <div class="flex  justify-center items-center px-5 py-2.5 border-b-gray-300 relative modal-header">
        <div class=" ml-auto p-1.5 text-xl " @click="emit('close')">
          <button class="text-gray-600">&times;</button>
        </div>
        <div class=" ml-auto font-bold text-lg">{{ title }}</div>
      </div>
      <div class="divider"></div>
      <form action="" class=" sm:grid grid-cols-2 p-5 gap-x-5 gap-y-8" @submit.prevent="handleSubmit">
        <div>
          <label class="typo__label text-sm requiredItem after:content-['*'] after:text-red-500 after:mr-1 ">استان
            : </label>
          <div class="pt-1">
          <client-only>
            <Multiselect max-height="150" open-direction="bottom" v-model="formArea.provinces"
                         @select="setCityFromProvinceInRegisterMode" select-label="" track-by="name" label="name"
                         placeholder=" " :options="area" :searchable="true" :allow-empty="false" selectedLabel=" "
                         deselect-label="">
            </Multiselect>
          </client-only>
          </div>
          <span v-if="formError.provinces" class="text-xs mt-0.5 mr-0.5 text-red-600 ">نام استان الزامی است .</span>
        </div>
        <div>
          <div class="flex flex-col gap-1" v-if="registerModeCity?.length">
            <label class="typo__label text-sm requiredItem after:content-['*'] after:text-red-500 after:mr-1">شهر
              : </label>
              <div class="pt-1">
                <client-only>
                  <Multiselect max-height="'150'" open-direction="bottom" v-model="formArea.cities"
                               @select="createCitiesFromProvinces" select-label="" track-by="name" label="name"
                               placeholder=" " :options="registerModeCity||currentArea?.cities" :searchable="true"
                               :allow-empty="false" selectedLabel=" " deselect-label="">
                  </Multiselect>
                </client-only>
              </div>
          </div>
          <div v-if="registerModeCity === null && !currentArea?.cities?.length"
               class="input-group col-span-1 flex flex-col gap-2 mt-3 sm:mt-0">
            <label class="text-sm after:content-['*'] after:text-red-500 after:mr-1" for="name"> شهر :</label>
            <input disabled ref="name" class="w-full text-sm px-2 py-2 rounded outline-0 " id="name" type="text">
          </div>
          <span v-if="formError.city" class="text-xs mt-0.5 mr-0.5 text-red-600 ">نام شهرستان الزامی است .</span>
        </div>
        <div class="input-group col-span-1 flex flex-col gap-2 mt-3 sm:mt-0">
          <label class="text-sm after:content-['*'] after:text-red-500 after:mr-1" for="name"> نام :</label>
          <input placeholder="نام" ref="name" v-model="form.first_name" @blur="removeError(name ,'name' )"
                 class="w-full text-sm px-2 py-2 rounded outline-0 " id="name" type="text">
          <span v-if="formError.name" class="text-xs mt-0.5 mr-0.5 text-red-600 ">نام الزامی است .</span>
        </div>
        <div class="input-group col-span-1 flex flex-col gap-2 mt-3 md:mt-0">
          <label class="text-sm after:content-['*'] after:text-red-500 after:mr-1" for="lastname">نام خانوادگی :</label>
          <input placeholder="نام خانوادگی" ref="lastName" @blur="removeError(lastName ,'lastName' )"
                 v-model="form.last_name" class="w-full text-sm px-2 py-2 rounded outline-0 " id="lastname"
                 type="text">
          <span v-if="formError.lastName" class="text-xs mt-0.5 mr-0.5 text-red-600 ">نام خانوادگی الزامی است .</span>
        </div>
        <div class="input-group col-span-1 flex flex-col gap-2 mt-3 md:mt-0">
          <label class="text-sm after:content-['*'] after:text-red-500 after:mr-1" for="postalCode">کدپستی :</label>
          <input ref="postalCode" placeholder="کدپستی" v-model="form.postal_code"
                 class="w-full text-sm px-2 py-2 rounded outline-0 "
                 id="postalCode" type="text">
          <span v-if="formError.postalCode"
                class="text-xs mt-0.5 mr-0.5 text-red-600 ">کد پستی باید 10 رقمی باشد </span>
        </div>
        <div class="input-group col-span-1 flex flex-col gap-2 mt-3 md:mt-0">
          <label class="text-sm after:content-['*'] after:text-red-500 after:mr-1" for="number">موبایل :</label>
          <input placeholder="موبایل" ref="phone" @keydown="formError.phone ? formError.phone = false : '' "
                 @blur="removeError(phone ,'phone' )" v-model="form.mobile"
                 class="w-full text-sm px-2 py-2 rounded outline-0 text-start " id="number" type="text">
          <span v-if="formError.phone" class="text-xs mt-0.5 mr-0.5 text-red-600 ">موبایل الزامی است .  </span>
        </div>
        <div class="input-group col-span-2 flex flex-col gap-2 mt-3 md:mt-0">
          <label class="text-sm after:content-['*'] after:text-red-500 after:mr-1" for="address">آدرس :</label>
          <textarea placeholder="آدرس" @blur="removeError(address ,'address' )" ref="address" v-model="form.address"
                    name="" class="w-full text-sm rounded outline-0 px-2 py-2 placeholder:text-sm " id="address"
                    cols="30" rows="2"></textarea>
          <span v-if="formError.address" class="text-xs mt-0.5 mr-0.5 text-red-600 ">آدرس الزامی است .</span>
        </div>
        <div class="col-span-2 flex justify-center gap-2 mt-3 md:mt-0">
          <button class=" px-3 py-1.5 rounded text-sm submit text-white hover:text-black">
            <loader-spinner v-if="locationsStore.loading"/>
            <span v-else>{{ title }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.2);
}

.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

input, textarea {
  border: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 14px;
}

button.submit {
  background-color: black;
}

.error {
  border: 1px solid red;
}

input::placeholder {
  text-align: right;
  font-weight: normal;
  font-size: 14px;
}




</style>

