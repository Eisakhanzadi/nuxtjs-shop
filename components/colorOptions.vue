<script setup lang="ts">
import red from "~/assets/static images/productsImageColor/red.png";
import banafsh from "~/assets/static images/productsImageColor/banafsh.png";
import black from "~/assets/static images/productsImageColor/black.png";
import blue from "~/assets/static images/productsImageColor/blue.png";
import ghahvei from "~/assets/static images/productsImageColor/ghahvei.png";
import gray from "~/assets/static images/productsImageColor/gray.png";
import green from "~/assets/static images/productsImageColor/green.png";
import noghrei from "~/assets/static images/productsImageColor/noghrei.png";
import orang from "~/assets/static images/productsImageColor/orang.png";
import pink from "~/assets/static images/productsImageColor/pink.png";
import white from "~/assets/static images/productsImageColor/white.png";
import yellow from "~/assets/static images/productsImageColor/yellow.png";

const emit = defineEmits(['closeModal'])
const colorList: Array<{ [key: string]: any }> = [
  {
    id: 1,
    title: "سفید",
    image: white,
    info:
        "سفید - کرم - سفید صدفی - بی‌رنگ - بی‌رنگ مات - بی‌رنگ شفاف - مهتابی - سفید یخی - سفید چرمی - شیری - هفت رنگ - استخوانی - وانیلی - کرم روشن - سفید براق - سفید متالیک",
  },
  {
    id: 2,
    title: "طوسی",
    image: gray,
    info:
        "طوسی - خاکستری - نقره‌ای - نقره‌ای آبی - طوسی - مات - براق - استیل - کروم - نقره‌ای مات - طوسی روشن - کروم مات - دودی - طوسی فیلی - طوسی تیره - دودی متالیک - آبی طوسی - ارتشی طوسی",
  },
  {
    id: 3,
    title: "مشکی",
    image: black,
    info:
        "مشکی - نوک مدادی - شکلاتی - قهوه‌ای تیره - مشکی مات - مشکی براق - ذغالی - سرمه‌ای تیره - دودی متالیک",
  },
  {
    id: 4,
    title: "آبی",
    image: blue,
    info:
        "آبی - سرمه‌ای - فیروزه ای - سبز آبی - نقره‌ای آبی - آبی تیره - آبی روشن - سفید یخی - آبی متالیک - سرمه‌ای روشن - سرمه‌ای تیره - آبی نفتی - آبی یخی - آبی کدر - آبی رویال - لاجوردی - آبی کاربنی - آبی نیلی - آبی آسمانی - آبی کم‌رنگ - آبی دودی",
  },
  {
    id: 5,
    title: "صورتی",
    image: pink,
    info:
        "صورتی - پوست پیازی - گل بهی - صورتی تیره - رز گلد - کالباسی - صورتی خاکستری - صورتی روشن - صورتی فلورسنت - صورتی مرجانی",
  },
  {
    id: 6,
    title: "سبز",
    image: green,
    info:
        "سبز - سبز فسفری - یشمی - زیتونی - سبز آبی - سبز روشن - سبز تیره - سبز کله غازی - سبز سدری - سبز یشمی - سبز کاهویی - سبز مغز پسته‌ای - سبز دریایی - سبز فلورسنت - ارتشی زیتونی - سبز نعنایی",
  },
  {
    id: 7,
    title: "قرمز",
    image: red,
    info:
        "قرمز - زرشکی - پوست پیازی - مسی - سرخابی - گیلاسی - قرمز مات - قرمز آجری - عنابی - قرمز روشن - مارون - قرمز شرابی - یاقوتی - جگری - آلبالویی - گوجه ای - قرمز تیره - سرخ مخملی",
  },
  {
    id: 8,
    title: "زرد",
    image: yellow,
    info:
        "زرد، طلایی - زرد خردلی - بژ - زرد کم‌رنگ - آفتابی - لیمویی طلایی - طلایی مات - زرد نباتی - زرد لیمویی - عسلی - زرد فسفری - بژ براق - طلایی براق - اخرایی - گندمی - بلوند روشن - نخودی - زرد فلورسنت - زردآلویی",
  },
  {
    id: 9,
    title: "نارنجی",
    image: orang,
    info:
        "نارنجی - نارنجی کم‌رنگ - قرمز آجری - عسلی - مرجانی - کهربایی - هلویی - نارنجی فسفری - نارنجی فلورسنت",
  },
  {
    id: 10,
    title: "قهوه‌‌ای",
    image: ghahvei,
    info:
        "قهوه‌ای - کرم - نسکافه‌ای - ماهگونی - شکلاتی - قهوه‌ای تیره - قهوه‌ای روشن - برنز - طلایی مات - کرم تیره - کردوبایی - برنجی - عنابی - قهوه‌ای شتری - خاکی - گردویی - قهوه‌ای روشن مات - قهوه‌ای روشن براق - فندقی - خودرنگ روشن - خودرنگ تیره - ارتشی خاکی",
  },
  {
    id: 11,
    title: "بنفش",
    image: banafsh,
    info:
        "بنفش - یاسی - چند رنگ - بنفش تیره - صورتی خاکستری - بنفش روشن - ارغوانی - ارغوانی روشن - بادمجانی",
  },
  {
    id: 12,
    title: "نقره‌ای",
    image: noghrei,
    info:
        "نقره‌ای - سفید صدفی - نقره‌ای آبی - طوسی - براق - مهتابی - سفید یخی - استیل - نقره‌ای چرم - تیتانیومی - کروم - نقره‌ای مات - کروم مات - پلاتینیوم - آلومینیومی - استیل مات - استیل براق - استیل طلایی",
  },
]
</script>

<template>
  <div class="card ">
    <div class="card-header border-b p-5 flex items-center justify-between">
      <div>
        <h5 class="text-sm font-bold mb-1.5">جزییات رنگ ها </h5>
        <p class="text-xs">زیر مجموعه‌های هر کدام از رنگ‌های موجود</p>
      </div>
      <button @click.prevent="emit('closeModal')" class="text-2xl p-1">&times;</button>
    </div>
    <div class="card-body max-h-[80vh] overflow-y-auto grid gap-7 p-5">
      <div class="" v-for="item in colorList" :key="item.id">
        <h6 class="flex items-center gap-2 mb-3">
          <figure>
            <img class="w-14 h-5 border rounded-lg" :src="item.image" :alt="item.title">
          </figure>
          <span class="text-sm font-bold">{{ item.title }}</span>
        </h6>
        <p class="text-sm leading-7">{{ item.info }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>