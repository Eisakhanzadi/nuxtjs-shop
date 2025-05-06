<script setup lang="ts">
const {weblogListCategories} = defineProps({
  weblogListCategories:{
    type:Array,
    required:true,
    default:[]
  }
})
</script>

<template>
  <nav v-if="weblogListCategories?.length">
    <ul>
      <li v-for="item in weblogListCategories" :key="item.id">
        <nuxtLink class="text-color-999 text-sm flex items-center gap-1.5" :to="`/weblog-list/${item?.id}/${item?.en_title}`">
          <icons-arrow-toggle-left class="opacity-50"/>
          <span class="text-color-999 ">{{ item?.title }}</span>
        </nuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>