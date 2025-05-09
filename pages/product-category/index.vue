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
import {useProductsStore} from "~/stores/products";

const route = useRoute()
const router = useRouter()

const showGridItemCount = ref<number | string>(3)
const filterSize = ref<HTMLElement | null>(null)
const searchParams = ref<string>("")
const timer = ref()
const showModal = ref<boolean>(false)
const breadcrumb:{[key:string]:string}[] =[
  {
    name:"لیست محصولات",
    url:"/"
  }
]
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

const store = useProductsStore()
onBeforeMount(async () => {
  await store.fetchProducts()
  await store.fetchProductsColorsFilter()
})
const products = computed(() => store.getProducts)

function closeModal(): void {
  showModal.value = false
}

async function searchByDelay() {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    if (searchParams.value.length > 0) {
      fetchSearchWeblog()
    }
  }, 500)
}
</script>

<template>
  <section>
    <LazyBreadcrumb :data="breadcrumb" />
    <section class="container mx-auto grid grid-cols-4 gap-5 py-10" v-if="products">
      <aside class="col-span-1 hidden lg:flex flex-col  gap-4">
        <section class="box-shadow p-5 ">
          <div>
            <p class="text-base flex justify-center items-center gap-2 border-b pb-3">
              <icons-filter/>
              فیلتر جستجو
            </p>
          </div>
        </section>
        <section>
          <div class="search-box box-shadow p-5 ">
            <h6 class="mb-2">عنوان</h6>
            <form action="" @submit.prevent="">
              <div class="input-group border  overflow-hidden flex items-center">
                <input @input="searchByDelay" v-model="searchParams" type="text" placeholder="دنبال چی میگردی ... ؟"
                       class="w-full text-sm p-2 outline-0 bg-inherit placeholder:text-xs text-center caret-gray-600">
                <button class="p-1.5">
                  <icons-search/>
                </button>
              </div>
            </form>
          </div>
        </section>
        <section class="box-shadow p-5 overflow-hidden transition ease-in duration-300" ref="filterSize">
          <details open>
            <summary class="list-none ">
              <div class="flex items-center justify-between border-b pb-3 mb-3">
                <span>سایز</span>
                <button class="p-1">
                  <icons-angle/>
                </button>
              </div>
            </summary>
            <form-product-filter-size v-if="!store.loading && products?.attributes?.values?.length"
                                      @get-size="console.log($event)" :data="products?.attributes"/>
            <div v-else class="grid gap-x-2 gap-y-3 items-center grid-cols-5">
              <loader-skeleton v-for="item in 10" :key="item" class="w-full h-4 inline-block"/>
            </div>
          </details>
        </section>
        <section class="box-shadow p-5 ">
          <details open>
            <summary class="list-none ">
              <div class="flex items-center justify-between border-b pb-3 mb-3">
                <span>رنگ</span>
                <button class="p-1">
                  <icons-angle/>
                </button>
              </div>
            </summary>
            <div v-if="!store.loading && products?.color_ranges?.length">
              <form-product-filter-color @get-color="console.log($event)" :data="products?.color_ranges"/>
              <div @click="showModal = true" class="flex items-center justify-between cursor-pointer bg-[rgba(0,0,0,0.05)] px-2 py-3.5 mt-3 rounded">
                <p>
                  <span class="inline-block font-bold text-center text-sm w-5 h-5 border-2 border-gray-800 rounded-full ml-2">!</span>
                  <span>جزییات رنگ</span>
                </p>
                <icons-angle class="rotate-90"/>
              </div>
            </div>
            <div v-else class="grid gap-x-2 gap-y-3 items-center grid-cols-5">
              <loader-skeleton v-for="item in 10" :key="item" class="w-full h-4 inline-block"/>
            </div>
          </details>
        </section>
        <section>

        </section>
        <section>
        </section>
        <section></section>
      </aside>
      <main class="col-span-3 grid gap-5 ">
        <section class="col-span-1 flex gap-3 ">
          <form-items-show-count
              @change-count="showGridItemCount = $event"
          />
          <form-ckeckbox @getStatus="router.replace({query:{...route.query,available:$event}})"/>
          <div></div>
        </section>
        <section
            class=" products-items grid  grid-cols-2 gap-x-5 gap-y-10"
            :class="` lg:grid-cols-${showGridItemCount}`"
            :style="{gridTemplateColumns: `repeat(${showGridItemCount}, 1fr)`}"
        >
          <template v-if="products?.products?.data?.length && !store.loading">
            <card-product
                v-for="product in products?.products?.data"
                :key="product.id"
                :product="product"
            />
          </template>
          <loader-product-card
              v-else
              v-for="item in 9 "
              :key="item"
          />
        </section>
      </main>
      <transition name="show-modal">
        <modal-backdrop v-if="showModal" @close-modal="closeModal">
          <div class="card w-[740px] ">
            <div class="card-header border-b p-5 flex items-center justify-between">
              <div>
                <h5 class="text-sm font-bold mb-1.5">جزییات رنگ ها </h5>
                <p class="text-xs">زیر مجموعه‌های هر کدام از رنگ‌های موجود</p>
              </div>
              <button @click.prevent="showModal = false" class="text-2xl p-1">&times;</button>
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
        </modal-backdrop>
      </transition>
    </section>
  </section>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .products-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>