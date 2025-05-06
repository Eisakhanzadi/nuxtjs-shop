<script setup lang="ts">
import persianDate from "~/composables/persianDate";
import textShortener from "~/composables/textُShortener";

const {data} = defineProps({
  data: {
    type: Object,
    required: true,
  },
  location:{
    type: String,
    default: "home"
  }
})
</script>

<template>
  <article v-if="data" class="overflow-hidden">
    <nuxt-link class="" :to="`/weblog-list/${data.id}/${data.title}`">
      <div class="overflow-hidden rounded-xl">
        <figure><img :src="data.image?.url" :alt="data.title"></figure>
      </div>
      <div class="grid gap-2 mt-2.5 px-2" >
      <div class="category w-fit px-3.5 py-1 rounded-full flex items-center justify-center" v-if="location !== 'weblog-list' ">
        <nuxt-link v-if="data?.category?.name" :to="`/weblog-list/${data.category.id}/${data.category.name}`" class="  text-sm">
          {{ data.category.name }}
        </nuxt-link>
      </div>
        <div>
          <h5 v-if=" data?.title " class="line-clamp-1 flex items-center gap-0.5 text-sm">
            <icons-arrow-toggle-left/>
            <span>{{ data.title }}</span>
          </h5>
        </div>
        <div class="flex items-center justify-between mt-2 pb-4" :class="{info:location != 'home'}">
          <div class="time text-color-444 " v-if="data?.created_at">
            <span class="text-xs">تاریخ انتشار : </span>
            <time class="text-xs" :datetime="data.created_at">{{ persianDate(data.created_at).persianMonth }}</time>
          </div>
          <div class="!text-color-444" v-if="location != 'home'">
            <span class="text-xs"> دسته بندی : </span>
            <nuxt-link :to="`/weblog-list/${data.category.id}/${data.category.name}`" class="text-xs">
              {{ data.category.name }}
            </nuxt-link>
          </div>
        </div>
        <div class="py-3" v-if="location != 'home'">
          <p v-if="data?.summary" class="line-clamp-2 leading-6 text-xs">{{ textShortener(data.summary, 110) }}</p>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<style scoped lang="scss">
article {
  &:hover {
    img {
      scale: 1.2;
    }
  }

  .category {
    background-color: #d2ef9a;

    a {
      color: gray;
    }
  }

  figure {
    img {
      aspect-ratio: 4/3;
      object-fit: fill;
      transition: 0.5s;
      height: 100%;
      width: 100%;
    }
  }

  .info {
    border-bottom: 1px solid var(--border-color);
  }

}
</style>
