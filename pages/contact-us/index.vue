<script setup lang="ts">
import {useGetSettingsStore} from "~/stores/useSettingsKeys";
const {public:{baseUrlTwo}} = useRuntimeConfig()
const store = useGetSettingsStore()
const settings = computed(() => store.getShopInfo)
const breadcrumbData = [
  {
    name: "تماس با ما",
    url: "/"
  }
]

async function sendMessage(params:{[key:string]:any}) {
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

</script>

<template>
  <section class="pb-10 grid gap-5 md:gap-10">
    <breadcrumb :data="breadcrumbData"/>
    <div class="container bg-white p-5 mx-auto flex flex-col gap-5">
      <div>
        <h2 class="font-bold">ارتباط با  <span v-if="settings?.title?.length && settings?.title[0]?.value" > {{ settings.title[0].value}}</span></h2>
        <p class="text-sm leading-7 mt-2 text-justify select-none cursor-text" v-if="settings?.about_us_site?.length && settings?.about_us_site[0]?.value" > {{ settings.about_us_site[0].value}}</p>
      </div>
      <form-message @sendMessage="sendMessage" />
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