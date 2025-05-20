<script setup lang="ts">
const searchParams = ref<string>("")
const emit = defineEmits(['searchItem'])
const timer = ref()
async function searchByDelay() {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    if (searchParams.value.length > 0) {
      emit('searchItem' , searchParams.value.trim())
    }else{
      emit('searchItem' , "")
    }
  }, 700)
}

</script>

<template>
  <div class="search-box ">
    <form action="" @submit.prevent="emit('searchItem' , searchParams)">
      <div class="input-group border  overflow-hidden flex items-center">
        <input @input="searchByDelay" v-model.trim="searchParams" type="text" placeholder="دنبال چی میگردی ... ؟"
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