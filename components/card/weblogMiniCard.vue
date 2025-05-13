<script setup lang="ts">
import persianDate from "~/composables/persianDate";
const {data} = defineProps({
  data:{
    type:Object,
    required:true
  }
})
</script>

<template>
  <article v-if="data" class="overflow-hidden">
    <nuxt-link class="card flex gap-1.5 w-full" :to="`/weblog-details/${data?.id}/${data?.slug}`" >
      <figure  >
        <img class=" rounded-md w-[90px] h-[60px] object-cover" :src="data.image.url" :alt="data.title">
      </figure>
      <div class="card-body w-full">
        <h5 v-if="data.title" class="text-sm line-clamp-1">{{data.title}}</h5>
        <div class="flex justify-between mt-1.5">
          <div class="time text-color-444 " v-if="data?.created_at">
            <time class="text-xs" :datetime="data.created_at">{{ persianDate(data.created_at).persianMonth }}</time>
          </div>
          <div>
            <button class="text-xs">اطلاعات بیشتر...</button>
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<style scoped>

</style>