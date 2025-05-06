<script setup lang="ts">
import {useGetSettingsStore} from "~/stores/useSettingsKeys";
const {public:{baseUrlTwo}} = useRuntimeConfig()
const store = useGetSettingsStore()
onBeforeMount(async () => {
  await store.fetchSettings()
})
const data = computed(() => store.filterByGroup)
const shopInfo = computed(() => store.getShopInfo)

</script>

<template>
<footer>
  <section class="container  mx-auto md:px-10 py-5 grid grid-cols-2 gap-x-2 items-center gap-y-5" >
    <div class="col-span-1">
      <h5>عضویت در خبرنامه</h5>
      <p> با اشتراک خبرنامه هفتگی ما از تخفیف ها , اخبارها و مطالب با خبر شوید. </p>
    </div>
    <div class="col-span-1" >
      <form action="">
        <div class="flex items-center border-gray-400 border-b border-x-0 border-t-0  ">
          <span class="px-1.5" ><Icon name="uil:github" style="color: black" /></span>
          <input class="border-0 bg-transparent outline-0 w-full" type="text">
          <button class="bg-black text-white px-4 py-1.5 text-sm">عضویت</button>
        </div>
      </form>
    </div>
    <div>
      <h6>شماره تماس و ایمیل :</h6>
      <p></p>/
      <p></p>
    </div>
    <div class="flex flex-col gap-2">
      <div v-if="groupBy && groupBy?.social" class="flex justify-between items-center">
        <div><nuxt-link to="/">برند شما</nuxt-link></div>
        <ul class="flex gap-2 items-center justify-end">
          <li v-for="item in groupBy?.social" :key="item.id">
            <nuxt-link class="text-sm" to="item.value">{{item.label}}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="flex justify-between items-center">
        <h5>دسترسی سریع</h5>
        <nav>
          <ul class="flex items-center gap-3" >
            <li><nuxt-link to="/">رویه ارسال کالا</nuxt-link></li>
            <li><nuxt-link to="/">شیوه پرداخت</nuxt-link></li>
            <li><nuxt-link to="/">قوانین و مقررات</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="address">
      <h6>آدرس فروشگاه</h6>
      <p>استان گلستان شهرستان گرگان بلوار گلشهر </p>
    </div>
    <div class="design border border-x-0 border-b border-t-gray-300 py-5">
      <p>
        <span class="text-color999"> تمامی حقوق این سایت مربوط به سایت برند شما می باشد . </span>
        <span>عیسی خانزادی</span>
      </p>
    </div>
  </section>
</footer>
</template>

<style scoped>

</style>
