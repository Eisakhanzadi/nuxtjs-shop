<script setup lang="ts">
const {data, images} = defineProps({
  data: {
    type: Object
  },
  images: Object
})
</script>

<template>
  <article>
    <nuxt-link to="/categories" class="grid gap-2">
      <div>
        <figure class="overflow-hidden rounded-xl">
          <img :src="images.img" alt="" class="w-full h-full object-cover">
        </figure>
      </div>
      <div class="content rounded-xl">
        <p class="text-center py-3 px-2">{{ data.title }}</p>
      </div>
    </nuxt-link>
  </article>
</template>

<style scoped lang="scss">
article {
  .content {
    position: relative;
    overflow: hidden;
    p{
      transition: 0.5s;
    }
    &:after {
      position: absolute;
      content: "";
      display: block;
      left: -25%;
      right: -10%;
      top: -4%;
      height: 150%;
      width: 150%;
      bottom: 0;
      background-color: #000;
      transform-origin: right;
      transform: skewX(-45deg) scaleX(0);
      z-index: -1;
      transition: transform .75s;
    }
  }
  &:hover {
    .content {
      p{
        color: white;
        transition: 0.5s;
      }
      &:after {
        transform-origin: left;
        transform: skewX(-45deg) scaleX(1.5);
        transition: transform .75s;
      }
    }
  }
}


</style>
