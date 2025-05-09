<script setup lang="ts">
const emit = defineEmits(['getColor'])
const route = useRoute()
const router = useRouter()
const {data} = defineProps({
  data: {
    type: Array,
    required: true
  }
})
const colors = ref<{[key: string]:any}[]>([])
const changeColor = () => {
  emit('getColor' , colors.value)
  router.replace({query:{...route.query , colors:colors.value.join(',')}})

}
</script>

<template>
  <form v-if="data"  class=" flex gap-4 gap-y-5 justify-center flex-wrap">
    <div v-for="item in data" :key="item.id">
      <label @change="changeColor" class="w-full flex gap-2 items-start text-sm cursor-pointer"
             :for="`color-${item.id}`">
        <input type="checkbox" hidden="" v-model="colors" :value="item.id" :id="`color-${item.id}`">
        <figure class="rounded-lg p-1.5 broder-1 overflow-hidden flex flex-col items-center justify-center gap-1">
          <img v-if="item.image" class="w-[58px] h-8 " :src="item.image" :alt="item.title">
          <figcaption>
            <span v-if="item.title" class="text-[13px]">{{ item.title }}</span>
          </figcaption>
        </figure>
      </label>
    </div>
  </form>
</template>

<style scoped>
figure {
  position: relative;
}

input {
  &:checked + figure {
    border: 2px solid #F8B55F;
    span{
      color: #F8B55F;
    }
  }
}
</style>