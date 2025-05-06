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
  <footer class="pb-10 pt-20 px-3">
    <section class="container  mx-auto grid grid-cols-2 gap-x-2 items-center gap-y-10">
      <div class="col-span-2 lg:col-span-1">
        <h5 class="font-bold text-sm">عضویت در خبرنامه</h5>
        <p class="mt-2 text-sm"> با اشتراک خبرنامه هفتگی ما از تخفیف ها , اخبارها و مطالب با خبر شوید. </p>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <form action="">
          <div class="flex items-center border-gray-400 border-b border-x-0 border-t-0  ">
            <label class="cursor-pointer -mb-1" for="email-newspaper"><span class="px-1.5 "><Icon name="uil:github" style="color: black"/></span></label>
            <input id="email-newspaper" class="border-0 bg-transparent outline-0 w-full placeholder:text-sm placeholder:text-gray-400" placeholder="لطفا ایمیل خود را وارد کنید " type="text">
            <button class="bg-black text-white px-4 py-1.5 text-sm">عضویت</button>
          </div>
        </form>
      </div>
      <div class="col-span-2 sm:col-span-1">
        <h6 class="text-color-999 text-sm md:text-base font-bold">شماره تماس و ایمیل :</h6>
        <p class="mt-2 text-sm">
          <nuxt-link
              :to="`tel:${shopInfo?.mobile[0]?.value}`"
              v-if="shopInfo?.mobile?.length && shopInfo?.mobile[0]?.value"
          >
            {{ shopInfo.mobile[0].value }}
          </nuxt-link>
          /
          <nuxt-link
              :to="`mailto:${shopInfo.email[0].value}`"
              v-if="shopInfo?.email?.length && shopInfo?.email[0]?.value"
          >
                {{ shopInfo.email[0].value }}
          </nuxt-link>
        </p>

      </div>
      <div class="lg:flex sm:flex-col col-span-2 lg:col-span-1 gap-2 order-1 lg:order-none">
        <div v-if="data && data?.social" class="flex justify-between items-center">
          <div class="hidden md:block">
            <nuxt-link to="/"><img v-if="shopInfo?.logo?.length && shopInfo?.logo[0]?.value" :src="`${baseUrlTwo}${shopInfo?.logo[0]?.url}`" alt="اطلس مد"></nuxt-link>
          </div>
          <ul class="flex gap-2 items-center justify-end">
            <li v-for="item in data?.social"  :key="item.id">
              <nuxt-link class="text-sm" :to="item.value">{{ item.label }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="hidden lg:flex justify-between items-center ">
          <h5 class="text-dark font-bold text-sm md:text-base">دسترسی سریع :</h5>
          <nav>
            <ul class="flex items-center gap-3">
              <li>
                <nuxt-link to="/">رویه ارسال کالا</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">شیوه پرداخت</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">قوانین و مقررات</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div v-if="shopInfo?.address" class="address col-span-2 sm:col-span-1">
        <h6 class="text-color-999 font-bold text-sm md:text-base">آدرس فروشگاه :</h6>
        <p class="text-sm mt-2" v-if="shopInfo?.address?.length && shopInfo?.address[0]?.value"> {{ shopInfo.address[0].value }} </p>
      </div>
      <div class="design border border-x-0 border-b col-span-2 lg:col-span-1 border-t-gray-300 py-5 order-1 lg:order-none">
        <p class="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1">
          <span v-if="shopInfo?.title?.length && shopInfo?.title[0]?.value" class="text-color999"> تمامی حقوق این سایت مربوط به سایت <strong >{{shopInfo?.title[0]?.value}}</strong> شما می باشد . </span>
          <span class="text-xs font-medium">عیسی خانزادی</span>
        </p>
      </div>
    </section>
  </footer>
</template>

<style scoped>

</style>
