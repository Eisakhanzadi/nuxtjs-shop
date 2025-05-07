<script setup lang="ts">
import {SwiperSlide} from "swiper/vue";

import {useWeblogStore} from "~/stores/weblog";
import WeblogCategories from "~/components/weblog/weblogCategories.vue";
import persianDate from "~/composables/persianDate";
import {sepratorNumber} from "../../../.nuxt/imports";

const {public: {baseUrlTwo}} = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const store = useWeblogStore()
const settingsStore = useGetSettingsStore()
const settingsData = computed(() => 1)
const weblogDetails = computed(() => store.getWeblogDetails)
const weblogListCategories = computed(() => store.getWeblogListCategories)
onBeforeMount(async () => {
  await store.fetchWeblogListCategories()
  await store.fetchWeblogDetails(route.params.id)
})
const breadcrumbData: Array<{ [key: string]: string }> = [
  {
    name: "پست ها",
    url: '/weblog-list',
  },
  {
    name: weblogDetails.value?.post?.title,
    url: '/weblog-details',
  },
]
const weblogConfig = {
  '300': {
    slidesPerView: 1.5,
    spaceBetween: 15,
  },
  '400': {
    slidesPerView: 2.3,
    spaceBetween: 10,
  },
  '600': {
    slidesPerView: 2.3,
    spaceBetween: 15,
  },
  '1100': {
    slidesPerView: 3,
    spaceBetween: 20,
  },
}
const comments = [
  {
    id: 50,
    name: 'eisa khanzadi',
    created_at: new Date(),
    body: 'من عیسی خانزادی هستم ',
    img: '',
    children: [
      {
        id: 16,
        name: 'eisa khanzadi',
        created_at: new Date(),
        body: 'من عیسی خانزادی هستم ',
        img: '',
        children: []
      },
      {
        id: 1555,
        name: 'eisa khanzadi',
        created_at: new Date(),
        body: 'من عیسی خانزادی هستم ',
        img: '',
        children: [
          {
            id: 1555,
            name: 'eisa khanzadi',
            created_at: new Date(),
            body: 'من عیسی خانزادی هستم ',
            img: '',
            children: []
          }
        ]
      },
    ]
  },
  {
    id: 50,
    name: 'eisa khanzadi',
    created_at: new Date(),
    body: 'من عیسی خانزادی هستم ',
    img: '',
    children: [
      {
        id: 16,
        name: 'eisa khanzadi',
        created_at: new Date(),
        body: 'من عیسی خانزادی هستم ',
        img: '',
        children: [
          {
            id: 12,
            name: 'eisa khanzadi',
            created_at: new Date(),
            body: 'من عیسی خانزادی هستم ',
            img: '',
            children: []
          },
        ]
      },
      {
        id: 1555,
        name: 'eisa khanzadi',
        created_at: new Date(),
        body: 'من عیسی خانزادی هستم ',
        img: '',
        children: [
          {
            id: 1555,
            name: 'eisa khanzadi',
            created_at: new Date(),
            body: 'من عیسی خانزادی هستم ',
            img: '',
            children: []
          }
        ]
      },
    ]
  }
]
</script>

<template>
  <section>
    <section>
      <breadcrumb :data="breadcrumbData"/>
    </section>
    <section class="container mx-auto md:grid grid-cols-4 gap-5 py-10">
      <main class=" col-span-2 lg:col-span-3">
        <div v-if="weblogDetails && !store.loading" class=" bg-white px-3 py-2.5">
          <div class="py-3.5">
            <h2 class="text-base lg:text-lg" v-if="weblogDetails?.post?.title">{{ weblogDetails?.post?.title }}</h2>
          </div>
          <div class=" border !broder-x-0 py-3.5">
            <ul class="flex justify-evenly  items-center flex-wrap">
              <li class="text-xs" v-if="weblogDetails.post?.creatorable?.name"> نویسنده :
                {{ weblogDetails?.post?.creatorable?.name }}
              </li>
              <li>
                <div class="time text-color-444 " v-if="weblogDetails?.post?.created_at">
                  <span class="text-xs">تاریخ انتشار : </span>
                  <time class="text-xs" :datetime="weblogDetails?.post?.created_at">
                    {{ persianDate(weblogDetails?.post?.created_at).persianMonth }}
                  </time>
                </div>
              </li>
              <li v-if="String(weblogDetails?.post?.views_count)?.length" class="flex items-center gap-1.5">
                <icons-eye/>
                <span class="text-sm"> {{ sepratorNumber(weblogDetails?.post?.views_count) }} بازدید</span>
              </li>
              <li v-if="String(weblogDetails?.post?.comments_count).length" class="flex items-center gap-1.5">
                <icons-message/>
                <span class="text-sm"> {{ sepratorNumber(weblogDetails?.post?.comments_count) }} دیدگاه</span>
              </li>
            </ul>
          </div>
          <div v-if="weblogDetails?.post?.image?.url">
            <figure>
              <img :src="weblogDetails?.post?.image?.url" class="w-full" :alt="weblogDetails?.post?.title">
            </figure>
          </div>
          <div class="content-body" v-if="weblogDetails?.post?.body" v-html="weblogDetails?.post?.body"></div>
          <div class="social-apps-group flex justify-between items-center py-5 px-3 mt-3 border border-b-0 border-x-0 ">
            <p class="text-xs font-bold">اشتراک گذاری مطالب</p>
            <nav>
              <ul class="flex gap-2 items-center">
                <li>
                  <nuxt-link to="">
                    <icons-whatsApp/>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="">
                    <icons-x/>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="">
                    <icons-facebook/>
                  </nuxt-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <loader-weblog-details v-if="store.loading && weblogDetails"/>
        <div class="my-16" v-if="weblogDetails?.suggests?.length && !store.loading">
          <slider-title class="mb-6" :data="{title:'مطالب مشابه' , url:'/weblog-list'}" text="مشاهده مطالب بیشتر"/>
          <slider :breakpoints="weblogConfig">
            <swiper-slide v-for="item in weblogDetails.suggests">
              <card-weblog location="weblog-list" :data="item"/>
            </swiper-slide>
          </slider>
        </div>
        <div v-if="store.loading && weblogDetails?.suggests?.length">
          <div class="flex justify-between items-center mb-8">
            <loader-skeleton class="w-1/5 h-4"/>
            <loader-skeleton class="w-1/5 h-4"/>
          </div>
          <slider :breakpoints="weblogConfig">
            <swiper-slide v-for="item in 3" :key="item">
              <loader-weblog-card/>
            </swiper-slide>
          </slider>
        </div>
        <div class="bg-white p-5 " v-if="weblogDetails">
          <div class="mb-5">
            <h6 class="text-base font-normal">دیدگاهی بگذارید</h6>
            <p class="text-xs mt-2">نشانی ایمیل شما منتشر نخواهد شد </p>
          </div>
          <form-message :question="false" :phone="false" :email="true" :subject="false"/>
        </div>
        <div v-if="weblogDetails" class="bg-white mt-5 p-5">
          <form-comment :comments="comments"/>
        </div>
      </main>
      <aside class="col-span-1 max-h-[] ">
        <div class="flex flex-col gap-3 sticky top-28">
          <div class="bg-white weblog-categories p-5 ">
            <div class="categories-weblog-title pb-3">
              <h5 class="text-lg font-medium">دسته بندی ها </h5>
            </div>
            <div class="pt-4" v-if="weblogListCategories && !store.loading ">
              <weblog-categories :weblog-list-categories="weblogListCategories"/>
            </div>
            <div v-if="store.loading" class="grid gap-3 mt-2">
              <loader-skeleton class="w-1/2 h-4"/>
            </div>
          </div>
          <div class="last-weblogs bg-white weblog-categories p-5">
            <div class="last-weblogs-title pb-3">
              <h5 class="text-lg font-medium">آخرین مطالب </h5>
            </div>
            <div class="grid gap-3 mt-4" v-if="weblogDetails?.lastPost?.length && !store.loading">
              <card-weblog-mini-card v-for="item in weblogDetails.lastPost" :key="item.id" :data="item"/>
            </div>
            <div class="grid gap-3 mt-2" v-if="weblogDetails?.lastPost && store.loading" >
            <loader-mini-card-weblog v-for="item in 5"/>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </section>
</template>

<style scoped>
.weblog-categories {
  .categories-weblog-title {
    border-bottom: 1.5px dashed var(--border-color);
  }
}

.last-weblogs {
  .last-weblogs-title {
    border-bottom: 1.5px dashed var(--border-color);
  }
}
</style>