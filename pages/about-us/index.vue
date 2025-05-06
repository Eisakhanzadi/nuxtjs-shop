<script setup lang="ts">
import {useGetSettingsStore} from "~/stores/useSettingsKeys";

const store = useGetSettingsStore()
const settings = computed(() => store.getShopInfo)
const breadcrumbData = [
  {
    name: "درباره ما",
    url: "/"
  }
]
const options: Array<{ [key: string]: string }> = [
  {
    'title': 'رنگبندی متفاوت'
  },
  {
    'title': 'قیمت مناسب'
  },
  {
    'title': 'کیفیت خوب'
  }
]
const textTop: string = " توسعه اینترنت, روشهای خرید ما را به کلی دگرگون کرده است. منافع موجود در خرید اینترنتی هر روز، تعداد بیشتری از مردم را به تجربه آن و ایجاد تغییر در الگوهای متداول خرید ترغیب می کند. بعد از تجربه دیجی‌کالا، خرید اینترنتی بیشتر با سرعت زندگی مدرن همگام شد و توانست خود را با روحیات و نیازهای رو به رشد مشتریان هماهنگ کند. در حالیکه مشغله های روزانه فرصت لذت بردن از اوقات فراغت را کاهش داده است، صرف زمان های طولانی برای انجام سفرهای درون شهری و خرید نیازهای روزانه معنای خود را از دست می دهد. آنچه در فرصت اوقات فراغت برای افراد در اولویت قرار می گیرد، تفریح، آموزش، ورزش، لذت بردن از علایق شخصی و رفع خستگی‏‏های روزانه است. "
const textBottom:string = " راهکارهای متنوعی که دنیای مدرن برای رفع نیازهای روزمره از جمله انتخاب و خرید کالا به افراد پیشنهاد می دهد، باعث افزایش سرعت و دقت در انجام این امور می شود. با این شرایط تازه دیگر کمتر کسی کالایی را بدون تحقیق و بررسی خریداری می کند( سبکی که به جرات می توان گفت به وسیله دیجی‌کالا مرسوم شد ) . مشتریان پیش از خرید هریک از کالاهای مورد نیاز خود، با طیف وسیعی از انتخاب ها مواجه اند و در مقابل آن، به اطلاعات دقیق تری نیازمندند. دقت در ویژگی های هر کالا و دسترسی به اطلاعات صحیح نیاز اساسی مشتریان است. امروزه روش های نوین و هوشمندانه خرید، می تواند به خوبی پاسخگوی نیازهای مشتریان باشد و همین امر موجب شده روزانه افراد بیشتری به جمع استفاده کنندگان سرویس های اینترنتی بپیوندند. "
</script>

<template>
  <section class="grid gap-5 md:gap-10 pt-0 pb-10 ">
    <breadcrumb :data="breadcrumbData"/>
    <div class="container grid gap-5 mx-auto bg-white p-5">
      <h2 class="font-bold text-lg select-none">درباره ی <span v-if="settings?.title?.length && settings?.title[0]?.value" > {{ settings.title[0].value}}</span></h2>
      <p class="text-sm text-color-666 leading-7 text-justify select-none"  v-if="textTop?.length">{{textTop}}</p>
      <div class="form-color py-4 px-3">
        <ul class="flex items-center gap-2.5">
          <li class="flex items-center gap-1" v-for="(item,index) in options" :key="index">
            <icons-checked/>
            <span class="text-sm font-light text-color-666 select-none">{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <p  class="text-sm text-color-666 leading-7 mb-3 text-justify select-none" v-if="textBottom?.length">{{textBottom}}</p>
    </div>
  </section>
</template>

<style scoped>

</style>