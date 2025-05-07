<script setup lang="ts">

</script>

<template>
 <section>
   <loader-skeleton class="w-3/4"/>
    <div>
      <loader-skeleton v-for="item in 4" :key="item" class="w-10"/>
    </div>
   <div class="grid gap-4">
     <loader-skeleton class="w-full h-[350px] md:h-[500px] !rounded mb-3"/>
      <div class="grid gap-3"  v-for="item in 4" :key="item">
        <loader-skeleton v-for="item in 4" :key="item" class="w-full h-5"/>
        <loader-skeleton class="w-1/2 h-5"/>
      </div>
     <div class="flex items-center justify-between mt-5 ">
       <div>
         <loader-skeleton class="w-32 h-5"/>
       </div>
        <div class="flex gap-2">
          <loader-skeleton v-for="item in 3" :key="item" class="!w-6 h-6 !rounded-full"/>
        </div>
     </div>
   </div>
 </section>
</template>

<style scoped>

</style>