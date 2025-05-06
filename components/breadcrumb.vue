<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div v-if="data" class="bread-crumb  bg-white px-5 py-3.5  ">
    <nav class="flex container mx-auto items-center ">
      <ul class="flex items-center gap-1 ">
        <li class=" ">
          <nuxtLink class="flex items-center text-sm  gap-1.5 text-nowrap" to="/">
            <icons-home/>
            <span class="text-sm ">خانه</span>
          </nuxtLink>
        </li>
        <li v-for="(item , index ) in props.data" class="flex items-center gap-2" :key="index">
          <div class="divider flex items-center ms-1">
            <icons-double-left-arrow/>
          </div>
          <nuxtLink class="text-sm  " :class="{disabled:data.length-1 == index}"
                    :to="data.length-1 == index ? '' :item.url">
            <span class="text-sm " v-if="item.name">{{ item.name }}</span>
          </nuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.bread-crumb {
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}



li:last-child a {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

li:not(:last-child) a {
  text-wrap: nowrap;
}

a, .divider {
  font-size: 12px;
}



a:not(.disabled):hover {
  color: blue;
}
@media print {
  .bread-crumb{
    display: none;
  }
}
</style>
