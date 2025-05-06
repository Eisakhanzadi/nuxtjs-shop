<script setup lang="ts">
import {process} from "std-env";
const {public:{baseUrl}} = useRuntimeConfig()
const {data} = await useFetch(`${baseUrl}/header`)
const menus = ref<{[key:string]:any}[]>(data.value.menus)
const header = ref<HTMLHeadElement>()
console.log(menus)
  if (process.client) {
    window.addEventListener("scroll", () => {
      let scrollTop:string|number = window.scrollY;
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
</script>

<template>
  <header ref="header" class="bg-white">
    <section class=" container  mx-auto md:px-3 py-4 relative">
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
                <nuxt-link  class="flex gap-1 items-baseline py-3 " :to="`/categories/${item.id}/${item.title}`">
                  <span >{{ item.title }}</span>
                  <span class="relative top-0.5" v-if="item.children?.length"><icons-angle/></span>
                </nuxt-link>
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
              <button>
                <icons-search/>
              </button>
            </li>
            <li class="flex items-center justify-center pr-1">
              <button>
                <icons-user/>
              </button>
            </li>
            <li class="flex items-center justify-center">
              <button>
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
  </header>
</template>

<style scoped >
header{
  background-color: var(--bg-primary);
}
nav{
  ul{
    li{
      a{

      }
      .mega-menu-container{
        visibility: hidden;
        opacity: 0;
        transition: 0.5s;
        transform: translateY(20px);
      }
    }
    li:hover a + .mega-menu-container{
      visibility: visible;
      opacity: 1;
      transform: translateY(-12px);
    }
  }
}
.active-menu{
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  animation: menu 1s 1 forwards ease ;
  z-index: 100;
}
@keyframes menu {
  from{
    transform: translateY(-100%);
  }to{
     transform: translateY(0%);
   }
}
</style>
