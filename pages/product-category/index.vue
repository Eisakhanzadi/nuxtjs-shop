<script setup lang="ts">
import {useProductsStore} from "~/stores/products";
import ColorOptions from "~/components/colorOptions.vue";
import Multiselect from "~/components/multiselect.vue";
import {number} from "zod";
import {getBindingIdentifiers} from "@babel/types";
import keys = getBindingIdentifiers.keys;

const route = useRoute()
const router = useRouter()

const showGridItemCount = ref<number | string>(3)
const filterSize = ref<HTMLElement | null>(null)
const showModal = ref<boolean>(false)
const filterMenu = ref<string>("most_visited")
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
  await store.fetchCategories()
})
const products = computed(() => store.getProducts)
const categories = computed(() => store.getCategories)

function closeModal(): void {
  showModal.value = false
}



function changeFilter(){
  router.push({query:{...route.query ,sort:filterMenu.value}})
}
function handleQueryChange(query:{[key:string]:string|boolean|number}){
  const queries = {
    page:query.page,
    sort:query.sort,
    flash_id:query.flash_id,
    max_price:query.max_price,
    min_price:query.min_price,
    available:query.available,
    category_id:query.category_id,
    // createAttributes(){
    //   const obj = {}
    //   const arr:Array<number|string> =query.size.split(',')
    //       arr.forEach(size => obj.attribute_value_id = size)
    // }
  }
  console.log(queries)
}
watch(()=>route.query, async(newVal:{[keys:string]:any}, oldVal) => {
  handleQueryChange(newVal)
})
  // await store.fetchCategories(newVal)
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
          <div class="mt-3" v-if="categories?.length > 0">
            <form action="">
              <div class="border rounded px-1">
                <select class="w-full bg-transparent py-2 text-sm broder outline-0 rounded line-clamp-1">
                  <option v-for="item in categories[0].children" class="text-sm text-gray-500 line-clamp-1 hover:bg-red-500" :key="item.id" :value="item">{{item.title}}</option>
                </select>
              </div>
            </form>
          </div>
        </section>
        <section>
          <div class="p-5 box-shadow">
          <form-search @search-item=""/>
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
              <form-product-filter-color  @get-color="console.log($event)" :data="products?.color_ranges"/>
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
        <section class="col-span-1 flex items-center justify-between gap-3 ">
          <div class="flex gap-3">
            <form-items-show-count
                @change-count="showGridItemCount = $event"
            />
            <form-ckeckbox @getStatus="router.replace({query:{...route.query,available:$event}})"/>
          </div>
          <div class="flex items-center gap-1.5">
            <span>فیلتر : </span>
            <select class="rounded text-sm border-1 outline-0 py-1.5 pr-2 pl-14" v-model="filterMenu" @change="changeFilter">
              <option class="text-sm"  value="most_visited"> پربازدیدترین </option>
              <option class="text-sm"  value="most_discount">  بیشترین تخیف </option>
              <option class="text-sm"  value="newest"> ویژه </option>
              <option class="text-sm"  value="top_sales"> پر فروش ترین </option>
              <option class="text-sm"  value="high_to_low"> گران ترین </option>
              <option class="text-sm"  value="low_to_high"> ارزان ترین </option>
            </select>

          </div>
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
          <color-options @closeModal="showModal = false"/>
        </modal-backdrop>
      </transition>
    </section>
  </section>
</template>

<style scoped>
.show-modal-enter-active{
  animation: show-modal 0.3s forwards ease ;
}
.show-modal-leave-active {
  animation: show-modal 0.3s reverse forwards ease ;
}

@keyframes show-modal {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@media screen and (max-width: 768px) {
  .products-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>