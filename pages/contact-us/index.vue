<script setup lang="ts">
import {useGetSettingsStore} from "~/stores/useSettingsKeys";
const {public:{baseUrlTwo}} = useRuntimeConfig()
const store = useGetSettingsStore()
const settings = computed(() => store.getShopInfo)
const inputName = ref<HTMLInputElement>()
onMounted(() => {
  inputName.value.focus()
})

interface formValues {
  name: string,
  phone_number: string,
  subject: string,
  body: string,
  question: string,
  loading:boolean
}

const params = reactive<formValues>({
  name: "",
  phone_number: "",
  subject: "",
  body: "",
  question: "",
  loading: false,
})
const paramsError = reactive<{ [key: string]: boolean }>({
  name: false,
  phone_number: false,
  subject: false,
  body: false,
  question: false,
})
const breadcrumbData = [
  {
    name: "تماس با ما",
    url: "/"
  }
]

async function handleSubmit() {
  if (params.name.length < 2)
    paramsError.name = true
  if (params.phone_number.length != 11)
    paramsError.phone_number = true
  if (params.subject.length < 2)
    paramsError.subject = true
  if (params.body.length < 2)
    paramsError.body = true
  if (params.question !== 'تهران')
    paramsError.question = true
  // if all params was ok
  if (
      params.name.length > 2 &&
      params.phone_number.length == 11 &&
      params.subject.length > 2 &&
      params.body.length > 2 &&
      params.question === 'تهران'
  ) {
    const formDate = new FormData()
    formDate.set("name", params.name)
    formDate.set("phone_number", params.phone_number)
    formDate.set("subject", params.subject)
    formDate.set("body", params.body)
    formDate.set("_wreixcf14135vq2av54", params.question)

    try {
      params.loading = true
      await $fetch(`${baseUrlTwo}all/contacts` , {
        method: "POST",
        body:formDate
      }).then(res => console.log(res)  )
      // await useFetchData('all/contacts','POST', formDate , baseUrlTwo)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      params.loading = false
    }

  }
}
function deActiveError(item:string){
  paramsError[item] ? paramsError[item] = false : false
}
</script>

<template>
  <section class="pb-10 grid gap-5 md:gap-10">
    <breadcrumb :data="breadcrumbData"/>
    <div class="container bg-white p-5 mx-auto flex flex-col gap-5">
      <div>
        <h2 class="font-bold">ارتباط با  <span v-if="settings?.title?.length && settings?.title[0]?.value" > {{ settings.title[0].value}}</span></h2>
        <p class="text-sm leading-7 mt-2 text-justify select-none cursor-text" v-if="settings?.about_us_site?.length && settings?.about_us_site[0]?.value" > {{ settings.about_us_site[0].value}}</p>
      </div>
      <form @submit.prevent="handleSubmit" action="">
        <div class="grid gap-3 grid-cols-3 items-baseline ">
          <div class="input-group col-span-3 md:col-span-1">
            <input ref="inputName" v-model.trim="params.name" @keydown="deActiveError('name')"
                   class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
                   :class="{'!border !border-red-500':paramsError.name}" placeholder="نام:"
                   type="text">
            <span v-if="paramsError.name" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
          </div>
          <div class="input-group col-span-3 md:col-span-1">
            <input v-model.trim="params.phone_number" @keydown="deActiveError('phone_number')"
                   class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
                   :class="{'!border !border-red-500':paramsError.phone_number}" placeholder="شماره تماس:"
                   type="text">
            <span v-if="paramsError.phone_number" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
          </div>
          <div class="input-group col-span-3 md:col-span-1">
            <input v-model.trim="params.subject" @keydown="deActiveError('subject')"
                   class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
                   :class="{'!border !border-red-500':paramsError.subject}" placeholder="موضوع:"
                   type="text">
            <span v-if="paramsError.subject" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
          </div>
          <div class="input-group col-span-3">
            <textarea v-model.trim="params.body" @keydown="deActiveError('body')"
                      class="w-full px-3 py-3 border outline-0 resize-none form-color placeholder:text-sm "
                      :class="{'!border !border-red-500':paramsError.body}"
                      placeholder="پیام:" name="" id="" cols="30" rows="10"></textarea>
            <span v-if="paramsError.body" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
          </div>
        </div>
        <div class="mt-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <label class="text-sm" for="question">نام پایتخت ایران را به فارسی بنویسید</label>
            <input v-model.trim="params.question" type="text" @keydown="deActiveError('question')"
                   class="border form-color w-16 px-2 py-2 text-center rounded mr-1.5 text-color-999 outline-0"
                   :class="{'!border !border-red-500':paramsError.question}"
                   autocomplete="false">
            <span v-if="paramsError.question" class="error block text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
          </div>
          <div class="w-1/2 sm:w-1/3 md:w-3/12 self-end">
            <button class="text-center w-full text-white text-sm bg-black p-4">
              ارسال پیام
            </button>
          </div>
        </div>
      </form>
      <div v-if="settings && Object.keys(settings).length" class="contact-us-info p-5 flex flex-col gap-5">
        <h5 class="font-bold text-white">اطلاعات تماس </h5>
        <ul class="flex flex-col gap-2.5 ">
          <li v-if="settings.mobile?.length" class="flex items-center justify-between py-3 px-3 bg-[rgba(0,0,0,0.5)]">
            <div class="contact-us-title flex items-center  text-xs">
              <span>شماره تماس ما</span>
              <icons-double-left-arrow/>
            </div>
            <a :href="`tel:${settings.mobile[0].value}`" v-if="settings.mobile[0]?.value" class="contact-us-content flex items-center gap-1.5 text-xs">
              <span>{{ settings.mobile[0].value }}</span>
              <icons-phone/>
            </a>
          </li>
          <li v-if="settings.email?.length" class="flex items-center justify-between py-3 px-3 bg-[rgba(0,0,0,0.5)]">
            <div class="contact-us-title flex items-center  text-xs">
              <span>ایمیل ارتباطی</span>
              <icons-double-left-arrow/>
            </div>
            <a :href="`mailto:${settings.email[0].value}`" v-if="settings.email[0]?.value" class="contact-us-content flex items-center gap-1.5 text-xs">
              <span>{{ settings.email[0].value }}</span>
              <icons-email/>
            </a>
          </li>
          <li v-if="settings.address?.length" class="flex items-center justify-between py-3 px-3 bg-[rgba(0,0,0,0.5)]">
            <div v-if="settings.address[0]?.value" class="contact-us-title flex items-center  text-xs">
              <span>آدرس دفتر مرکزی</span>
              <icons-double-left-arrow/>
            </div>
            <div class="contact-us-content flex items-center gap-1.5 text-xs">
              <span>{{ settings.address[0].value }}</span>
              <icons-dot-location/>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
.contact-us-info {
  background-image: url("~/assets/static images/contacUs/paralex.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

ul {
  li {
    & * {
      color: white;
    }
  }
}
</style>