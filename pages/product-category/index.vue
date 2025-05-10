<script setup lang="ts">
import {useProductsStore} from "~/stores/products";
import ColorOptions from "~/components/colorOptions.vue";

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
          <color-options/>
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