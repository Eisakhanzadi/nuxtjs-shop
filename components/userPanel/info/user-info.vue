<script setup lang="ts">
const emit = defineEmits(['showDetails'])
</script>

<template>
  <section class="flex flex-col items-center justify-between w-full">
      <div class="flex items-center justify-between w-full">
        <div class="grid gap-8 w-full items-center py-2">
          <div >
            <h6 class="text-color-999 text-sm">نام و نام خانوادگی :</h6>
            <p class="text-sm mt-2">
              <span>نام و نام خانوادگی وارد نشده است</span>
              <span></span>
            </p>
          </div>
          <div>
            <h6 class="text-color-999 text-sm">شماره تماس :</h6>
            <p class="text-sm mt-2">
              <span>شماره تماس وارد نشده است</span>
              <span></span>
            </p>
          </div>
        </div>
        <div class="grid gap-8 w-full items-center border-r pr-3 py-2">
          <div>
            <h6 class="text-color-999 text-sm">ایمیل :</h6>
            <p class="text-sm mt-2">
              <span></span>
              <span>ایمیل وارد نشده است</span>
            </p>
          </div>
          <div>
            <h6 class="text-color-999 text-sm">تاریخ تولد :</h6>
            <p class="text-sm mt-2">
              <span>تاریخ تولد وارد نشده است</span>
              <span></span>
            </p>
          </div>
        </div>
        <div class="grid gap-8 w-full items-center border-r pr-3 py-2">
          <div>
            <h6 class="text-color-999 text-sm">شماره کارت :</h6>
            <p class="text-sm mt-2">
              <span>شماره کارت وارد نشده است</span>
              <span></span>
            </p>
          </div>
          <div>
            <h6 class="text-color-999 text-sm">کدملی :</h6>
            <p class="text-sm mt-2">
              <span>کدملی وارد نشده است </span>
              <span></span>
            </p>
          </div>
        </div>
      </div>
      <div class="ml-auto mt-5">
        <button class="flex items-center   gap-1.5 rounded px-3 py-2 bg-stone-950 hover:bg-black transition duration-200 ease-linear" @click="emit('showDetails')">
          <span><icons-edit color="white"/></span>
          <span class="text-white text-sm">ویرایش</span>
        </button>
      </div>
  </section>
</template>

<style scoped>

</style>