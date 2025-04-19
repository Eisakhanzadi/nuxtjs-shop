<script setup lang="ts">
import Logo from "~/components/icons/Logo.vue";

const {data} = await useFetch('https://api-atlasmode.alochand.com/v1/all/menus/header')
const menus = ref(data.value.data.menus)
console.log(menus)
</script>

<template>
  <header class="bg-white">
    <section class=" max-w-screen-xl w-full md:w-10/12 mx-auto md:px-10 py-4 relative">
      <div v-if="menus?.length" class="flex items-center justify-between">
        <div>
          <nuxt-link to="/">
            <logo/>
          </nuxt-link>
        </div>
        <div>
          <nav>
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

</style>
