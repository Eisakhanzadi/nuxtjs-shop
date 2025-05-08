<script setup lang="ts">
const {items,active} = defineProps({
  active:{
    type: Number || String,
    default:3
  },
  items: {
    type: Array,
    required: false,
    default: [
      {
        count: 2,
      },
      {
        count: 3,
      },
      {
        count: 4,
      },
    ]
  }
})

const emit = defineEmits(['changeCount'])

const listItems = ref<HTMLElement[]>([])

function activeItem(index: number , count: number) {
  removeActiveItem()
  listItems.value[index].classList.add('active')
  emit('changeCount', count)
}

function removeActiveItem() {
  listItems.value.forEach((item) => {
    item.classList.remove('active')
  })
}
</script>

<template>
  <div>
    <ul class="flex gap-1 items-center">
      <li @click="activeItem(index ,divider.count )" :class="{active:divider.count==active}" v-for="(divider,index) in items " :key="divider.count" ref="listItems"
          class="w-fit min-w-7 h-7 rounded bg-black flex items-center px-1.5 py-1.5 justify-center gap-0.5 text-white">
            <span v-for="item in divider.count" :key="item"
                  class="w-1 h-full inline-block bg-gray-500 rounded-b-full rounded-t-full"></span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  background: var(--lighting-color);
  border: 1px solid var(--border-color);
  transition: 0.3s ease background;
}

li.active {
  background: black;
  border: 1px solid var(--border-color);
  span{
    background: white;
    animation: fill 0.3s ease forwards;
  }
}

@keyframes fill {
  from{
    height: 0;
  }
  to{
    height: 100%;
  }
}
</style>