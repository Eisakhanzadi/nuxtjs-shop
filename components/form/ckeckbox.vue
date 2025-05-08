<script setup lang="ts">
const {text , id , type} = defineProps({
  text: {
    type: String,
    default: 'نمایش محصولات موجود'
  },
  id: {
    type: String || Number,
    default: 'exist'
  },
  type:{
    type: String,
    default:"checkbox"
  }
})
const emit = defineEmits(['getStatus'])
const status = ref(false)
</script>

<template>
  <form class="flex" action="">
    <div class="flex">
      <label class="flex gap-1.5 items-center flex-row-reverse text-sm font-light " :for="`checkbox-${id}`">
        {{text}}
        <input @change="()=>emit('getStatus' , status)" :hidden="true"  v-model="status" :type="type" :id="`checkbox-${id}`">
        <span class="checked flex items-center justify-center  w-[22px] h-[22px] rounded bg-stone-200 "></span>
      </label>
    </div>
  </form>
</template>

<style lang="scss" scoped>
span{
  position: relative;
  transition: 0.3s all ease;
  &:after{
    visibility: hidden;
    content: '✔';
    position: absolute;
    bottom: -1.5px;
  }
}
input{
  &:checked + span.checked{
    background: var(--border-color);
    border: 1px solid var(--color-444);
    &:after{
      visibility: visible;
    }
  }
}
</style>