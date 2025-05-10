<script setup lang="ts">
const searchParams = ref<string>("")
const emit = defineEmits(['searchItem'])
const timer = ref()
async function searchByDelay() {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    if (searchParams.value.length > 0) {
      // fetchSearchWeblog()
      emit('searchItem' , searchParams.value)
    }
  }, 500)
}

</script>

<template>
  <div class="search-box ">
    <form action="" @submit.prevent="">
      <div class="input-group border  overflow-hidden flex items-center">
        <input @input="searchByDelay" v-model="searchParams" type="text" placeholder="دنبال چی میگردی ... ؟"
               class="w-full text-sm p-2 outline-0 bg-inherit placeholder:text-xs text-center caret-gray-600">
        <button class="p-1.5">
          <icons-search/>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>