<script setup lang="ts">
  const array = [1, 2, 3, 4, 5]
  const activeLink = ref(0)
  const active = ref()
  const navWidth = ref(0)
  if (process.client){
    navWidth.value = document.querySelector('#mobile-menu').offsetWidth
  }
  function activeItem(index) {
    activeLink.value = index
    const oneItem = navWidth.value / array.length
    if (active.value === index) {
      return false
    }
    if (active.value > index) {
      active.value.style.transform = `translateX(-${active.value}px)`
    }
    if (active.value < index) {
    }
}
</script>

<template>
  <section class="container mx-auto">
    <div>
      <nav id="mobile-menu" class=" flex items-center justify-between relative">
        <div class="w-full" v-for="item in array" :key="item">
          <button
              class="w-full font-bold border-4 border-y-0 text-center border-x-gray-500 inline-block bg-rose-500"
              @click="activeItem(index)"
          >
            {{ item }}
          </button>
        </div>
        <div ref="active" class="absolute bottom-0 right-0 h-full w-1/5 bg-yellow-300" id="active"></div>
      </nav>
    </div>
  </section>
</template>

<style scoped>

</style>