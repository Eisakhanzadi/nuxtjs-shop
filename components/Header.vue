<script setup lang="ts">
import {SwiperSlide} from "swiper/vue";
import {useGetUserStore, useProductsStore} from "#imports";
const router = useRouter()
const {$toast} = useNuxtApp()
const storeProducts = useProductsStore()
const userStore = useGetUserStore()
const {public: {baseUrl}} = useRuntimeConfig()

onBeforeMount(async () => {
  await storeProducts.fetchNewProducts()

})

const newProducts = computed(() => storeProducts.getNewProducts)
const user = computed(() => userStore.getUserStatus)
const {data} = await useFetch(`${baseUrl}/header`)
const menus = ref<{ [key: string]: any }[]>(data.value.menus)
const header = ref<HTMLHeadElement>()
const showSearchBox = ref<boolean>(false)
const showLogin = ref<boolean>(false)
if (process.client) {
  window.addEventListener("scroll", () => {
    let scrollTop: string | number = window.scrollY;
    if (scrollTop > 250) {
      if (!header.value?.classList.contains('active-menu')) {
        header.value?.classList.add('active-menu');
      }
    } else {
      if (header.value?.classList.contains('active-menu')) {
        header.value?.classList.remove('active-menu');
      }
    }
  })
}
const sliderConfig = {
  '300': {
    slidesPerView: 1.5,
    spaceBetween: 15,
  },
  '400': {
    slidesPerView: 2.3,
    spaceBetween: 10,
  },
  '600': {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  '900': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
}
function handleFav(): void {
  user.value?.isLogin ? router.push({path:'/user-panel/favorites'}) : $toast( 'برای ورود به این قسمت ابتدا لاگین شوید' ,{type:'warning'} )
}
</script>

<template>
  <header ref="header" class="bg-white">
    <section v-if="menus" class=" container  mx-auto md:px-3 py-4 relative">
      <div v-if="menus?.length" class="flex items-center justify-between">
        <div>
          <nuxt-link to="/">
            <h1 class="font-bold text-lg"> برند شما</h1>
          </nuxt-link>
        </div>
        <div>
          <nav class=" hidden lg:block">
            <ul class="flex gap-3">
              <li v-for="item in menus" :key="item.name">

                <link-resolver :item="item">
                  <span>{{ item.title }}</span>
                  <span class="relative top-0.5" v-if="item.children?.length"><icons-angle/></span>
                </link-resolver>
                <div v-if="item.children?.length" class="mega-menu-container absolute top-20 right-0 w-full z-50  ">
                  <megaMenu class="" :menus="item.children"/>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <ul class="flex items-center gap-2">
            <li class="flex items-center justify-center px-2.5 border-2 border-y-0 border-r-0 border-l-solid border-l-gray-100 ">
              <button @click="showSearchBox = !showSearchBox">
                <icons-search/>
              </button>
            </li>
            <li class="flex items-center justify-center pr-1">
              <button @click="showLogin=true">
                <icons-user/>
              </button>
            </li>
            <li class="flex items-center justify-center" v-if="user">
              <button @click="handleFav">
                <icons-heart/>
              </button>
            </li>
            <li class="flex items-center justify-center">
              <button>
                <icons-basket/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <transition-group name="show-modal">
      <modal-backdrop @close-modal="showSearchBox = false" v-if="showSearchBox" classes="rounded-lg p-10">
        <div class="w-full ">
          <form-search/>
          <div class="mt-5 pt-5" v-if="newProducts?.length">
            <h4 class="text-base mb-7 font-bold">محصولات پیشنهادی</h4>
            <slider :breakpoints="sliderConfig">
              <swiper-slide v-for="item in newProducts" :key="item.id">
                <card-product :product="item"/>
              </swiper-slide>
            </slider>
          </div>
        </div>
      </modal-backdrop>
    </transition-group>
  </header>
  <transition-group name="show-modal">
    <modal-backdrop @close-modal="showLogin = false" v-if="showLogin" classes="w-full lg:w-[500px]">
        <login @close="showLogin = false"/>
    </modal-backdrop>
  </transition-group>
</template>

<style scoped>
header {
  background-color: var(--bg-primary);
}

nav {
  ul {
    li {
      a {

      }

      .mega-menu-container {
        visibility: hidden;
        opacity: 0;
        transition: 0.5s;
        transform: translateY(20px);
      }
    }

    li:hover .mega-menu-container {
      visibility: visible;
      opacity: 1;
      transform: translateY(-12px);
    }
  }
}

.active-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  animation: menu 1s 1 forwards ease;
  z-index: 100;
  background-color: white;
  box-shadow: 3px 0 5px 2px rgba(0, 0, 0, .08);
}

@keyframes menu {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}

.show-modal-enter-active {
  animation: show-modal 0.3s forwards ease;
}

.show-modal-leave-active {
  animation: show-modal 0.3s reverse forwards ease;
}

@keyframes show-modal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
