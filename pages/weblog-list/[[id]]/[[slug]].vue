<script setup lang="ts">
import {useWeblogStore} from "~/stores/weblog";
import WeblogCategories from "~/components/weblog/weblogCategories.vue";

const {public: {baseUrlTwo}} = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const store = useWeblogStore()
onBeforeMount(async () => {
  await store.fetchWeblogList()
  await store.fetchWeblogListCategories()
})
const weblogList = computed(() => store.getWeblogList)
const weblogListCategories = computed(() => store.getWeblogListCategories)
const breadcrumbData: Array<{ [key: string]: string }> = [
  {
    name: "پست ها",
    url: '/weblog-list'
  }
]
const searchParams = ref<string>("")

function handleSearch() {
  console.log(searchParams.value)
}

const timer = ref()

async function searchByDelay() {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    if (searchParams.value.length > 0) {
      fetchSearchWeblog()
    }
  }, 500)
}

async function fetchSearchWeblog() {
  router.replace({path: "/weblog-list", query: {search: searchParams.value}})
  try {
    const data = await $fetch(`${baseUrlTwo}front/posts`, {
      method: 'GET',
      query: {search1: searchParams.value, searchBy1: "title"}
    })
    console.log(data, 'weblogList')
  } catch (err) {
    console.log(err)
  }
}

watch(() => route, () => {
  if (route.query) {

  }
})
</script>

<template>
  <section class=" grid gap-8 lg:gap-16 ">
    <section>
      <breadcrumb :data="breadcrumbData"/>
    </section>
    <section class="container mx-auto md:grid grid-cols-4 gap-5">
      <main class="col-span-3 grid gap-5 grid-cols-2 lg:grid-cols-3">
        <template v-if="weblogList?.posts?.data">
          <card-weblog v-for="item in weblogList?.posts?.data" :data="item" :key="item.id" location="weblog-list"/>
        </template>
      </main>
      <aside class="col-span-1  ">
        <div class="flex flex-col gap-3 sticky top-28">

          <div class="search-box bg-white p-5 rounded-xl">
            <form action="" @submit.prevent="handleSearch">
              <div class="input-group border rounded-lg overflow-hidden flex items-center">
                <input @input="searchByDelay" v-model="searchParams" type="text" placeholder="دنبال چی میگردی ... ؟"
                       class="w-full text-sm p-2 outline-0 placeholder:text-xs text-center caret-gray-600">
                <button class="p-1.5">
                  <icons-search/>
                </button>
              </div>
            </form>
          </div>
          <div class="bg-white weblog-categories p-5 overflow-hidden rounded-xl ">
            <div class="categories-weblog-title pb-3">
              <h5 class="text-lg font-medium">دسته بندی ها </h5>
            </div>
            <div class="pt-4" v-if="weblogListCategories">
              <weblog-categories :weblog-list-categories="weblogListCategories"/>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </section>
</template>

<style scoped lang="scss">
.weblog-categories {
  .categories-weblog-title {
    border-bottom: 1.5px dashed var(--border-color);
  }
}
</style>