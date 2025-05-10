<script setup lang="ts">
const emit = defineEmits(['closeModal'])
const {location , classes} = defineProps({
  location: {
    type: String,
    required: false,
    default: "items-center"
  },
  classes: {
    type: String,
    required: false,
    default: "w-1/2"
  }
})
onMounted(() => process.client ? document.body.classList.add('overflow-hidden') : "")
onBeforeUnmount(() => process.client ? document.body.classList.remove('overflow-hidden') : "")

function closeModal() {
  console.log('closeModal')
  emit('closeModal')
}
</script>

<template>
    <div @click.self="closeModal"
         class="fixed top-0 left-0 w-full h-full flex justify-center p-2 bg-[rgba(0,0,0,0.3)] z-[500]"
         :class="`${location}`">

      <div :class="`${classes}`" class="bg-white max-w-[900px] w-1/2 rounded-md overflow-hidden">
        <slot/>
      </div>

    </div>
</template>

<style scoped>

</style>