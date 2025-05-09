<script setup lang="ts">
const emit = defineEmits(['closeModal'])
const {location} = defineProps({
  location: {
    type: String,
    required: false,
    default: "items-center"
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

      <div class="bg-white rounded-md overflow-hidden">
        <slot/>
      </div>

    </div>
</template>

<style scoped>

</style>