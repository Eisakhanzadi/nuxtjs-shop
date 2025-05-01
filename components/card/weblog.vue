<script setup lang="ts">
import persianDate from "~/composables/persianDate";

const {data} = defineProps({
  data: {
    type: Object
  },
})
</script>

<template>
<article v-if="data" class="overflow-hidden">
  <nuxt-link class="grid gap-2" :to="`/weblog-list/${data.id}/${data.title}`" >
    <div class="overflow-hidden rounded-xl">
      <figure ><img :src="data.image?.url" :alt="data.title"></figure>
    </div>
    <div class="category w-fit px-3.5 py-1 rounded-full flex items-center justify-center">
      <nuxt-link :to="`/categories/${data.category.id}/${data.category.name}`" class="  text-sm">{{data.category.name}}</nuxt-link>
    </div>
    <div>
      <div><h5 class="line-clamp-1">{{ data.title }}</h5></div>
      <div class="time mt-2">
        <span class="text-sm">تاریخ انتشار : </span>
        <time class="text-sm" :datetime="data.created_at">{{persianDate(data.created_at).persianMonth}}</time>
      </div>
    </div>
  </nuxt-link>
</article>
</template>

<style scoped lang="scss">
article{
  &:hover{
    img{
      scale: 1.2;
    }
  }
  .category{
      background-color: #d2ef9a ;
    a{
      color: gray;
    }
  }
  figure{
    img{
      aspect-ratio: 4/3;
      object-fit: fill;
      transition: 0.5s;
      height: 100%;
      width: 100%;
    }
  }
  .time{
    color:var(--color-444);
  }
}
</style>
