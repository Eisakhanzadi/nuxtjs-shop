<script setup lang="ts">
const {color} = defineProps({
  color: {
    type: String,
    default: "#200E32"
  }
})
</script>
<template>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
       class="ml-2">
    <path
        d="M15.016 7.38951V6.45651C15.016 4.42151 13.366 2.77151 11.331 2.77151H6.45597C4.42197 2.77151 2.77197 4.42151 2.77197 6.45651V17.5865C2.77197 19.6215 4.42197 21.2715 6.45597 21.2715H11.341C13.37 21.2715 15.016 19.6265 15.016 17.5975V16.6545"
        :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M21.8095 12.0214H9.76849" :stroke="color" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round"></path>
    <path d="M18.8812 9.10632L21.8092 12.0213L18.8812 14.9373" :stroke="color" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
</template>
