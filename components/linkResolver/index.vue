<template>
<div v-if="item">
  <a
      v-if="item.link"
      :target="item.new_tab ? '_blank' : '_self'"
      :href="item.link"
      class="font-medium flex gap-1 items-baseline py-3"
  >
    <slot></slot>
  </a>
  <NuxtLink
      class="font-medium flex gap-1 items-baseline py-3"
      v-else
      :target="item.new_tab ? '_blank' : '_self'"
      :to="'/'+linkResolver(item.linkable_type, item.linkable_id, item.slug)?.name"
  >
    <slot></slot>
  </NuxtLink>
</div>
</template>
<script setup>
import linkResolver from "@/utils/links/LinkResolver.js"
const {item} = defineProps({
  item: {
    type:Object,
    required: true,
  },
});
</script>
