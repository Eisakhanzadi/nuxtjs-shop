<script setup lang="ts">
const emit = defineEmits(['getSize'])
const route = useRoute()
const router = useRouter()
const {data} = defineProps({
  data: {
    type: Array ,
    required: true
  }
})
const size =ref<{[key: string]:any}[]>([])

const activeSize = ()=>{
  router.replace({query:{...route.query ,size:size.value.join(',')}})
  emit('getSize' , size)
}
</script>

<template>
  <form v-if="data?.values?.length" action="" class=" flex gap-5 flex-wrap">
    <div v-for="item in data?.values" :key="item.id">
      <label @change="activeSize" class="w-full flex gap-2 items-start text-sm cursor-pointer" :for="`size-${item.id}`">
        <input type="checkbox" hidden="" v-model="size" :value="item.id" :id="`size-${item.id}`" >
        <span class="checked flex items-center justify-center  w-4 h-4 rounded bg-stone-200 "></span>
        <span>{{ item.value }}</span>
      </label>
    </div>
  </form>
</template>

<style scoped>
span{
  position: relative;
  transition: 0.3s all ease;
  &:after{
    visibility: hidden;
    content: '✔';
    color: black;
    position: absolute;
    bottom: -4px;
    scale: 0.8;
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