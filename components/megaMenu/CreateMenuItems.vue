<script setup lang="ts">
const {menus , children} = defineProps({
  menus:{
    type: Array,
    required: true,
    default:[]
  },
  children:{
    type:Boolean,
    default:false
  }
})
</script>

<template>
  <ul v-if="menus?.length" class="flex flex-col flex-wrap h-full  " :class="{'gap-y-4 px-2 pt-3':children , 'gap-y-4':!children}" >
    <li v-for="menu in menus" :key="menu?.id" >
      <nuxtLink class="flex gap-1 items-baseline w-fit text-xs" :to="`/products/${menu.id}/${menu.title}`" :class="{'border border-r-[3px] border-l-0 border-y-0 border-solid border-black pr-3':!children}">
        <span :class="{'text-slate-600':children , 'text-slate-900':!children}" v-if="menu?.title">{{menu.title}}</span>
        <span v-if="menu?.children?.length" class="rotate-90"><icons-angle :strokeWidth="6"/></span>
      </nuxtLink>
      <div v-if="menu?.children?.length" class="flex flex-col" >
        <mega-menu-create-menu-items :children="true" :menus="menu?.children"/>
      </div>
    </li>
  </ul>
</template>

<style scoped>

</style>
