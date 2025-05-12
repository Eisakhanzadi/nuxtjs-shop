<script setup lang="ts">
const {placeHolder} = defineProps({
  placeHolder: {
    type: String,
    default: 'لطفا دسته بندی مورد نظر خود را انتخاب کنید'
  }
})
const selectItem = ref<{ [key: string]: any }[]>([])
const selectedItem = ref<(number|string)[]>([])
const menu = ref<HTMLDivElement | null>(null)
const root = ref<HTMLDivElement | null>(null)
const data = [
  {
    id: 1,
    name: 'دسته بندی اول ',
    children: [{
      id: 11,
      name: 'دسته بندی اول ',
      children: []
    },
      {
        id: 12,
        name: 'دسته بندی اول ',
        children: []
      },
      {
        id: 13,
        name: 'دسته بندی اول ',
        children: []
      },]
  },
  {
    id: 2,
    name: 'دسته بندی اول ',
    children: [{
      id: 21,
      name: 'دسته بندی اول ',
      children: []
    },
      {
        id: 22,
        name: 'دسته بندی اول ',
        children: []
      },
      {
        id: 23,
        name: 'دسته بندی اول ',
        children: []
      },]
  },
  {
    id: 3,
    name: 'دسته بندی اول ',
    children: []
  },
]

function showItems(item?: { [key: string]: any }) {
  menu.value.style.maxHeight ? menu.value.style.maxHeight = null : menu.value.style.maxHeight = menu.value.scrollHeight + 'px'
  if (Object.keys(item)?.length) {
      if (selectItem.value.filter((item) => !selectItem.value.includes(item.id)).length){
        selectItem.value.push(item)
      }
  }

}
// onMounted(()=>{
//   if (process.client){
//     document.body.addEventListener('click', (e)=> {
//       console.log(e.target.id , root.value.id )
//       if (menu.value.style.maxHeight && (e.target.id != root.value.id)) {
//         console.log(e.target.id , root.value.id , 123)
//         menu.value.style.maxHeight ? menu.value.style.maxHeight = null : false
//       }
//     })
//   }
// })
function filterItems(){
  return selectItem.value.filter((item) => !selectedItem.value.includes(item))
}
</script>

<template>
  <div ref="root" id="multiselect" > {{selectedItem}}
    <form action="">
      <div class="input-group mt-2">
        <div @click="showItems" class="w-full flex items-center flex-wrap cursor-pointer py-2 rounded border px-3 outline-0 text-xs select-none">
          <template v-if="selectItem.length>0" >
          <span  class=" bg-black text-white border rounded px-1 py-1" v-for="item in selectItem" :key="item.id">{{ item.name }}</span>
          </template>
          <span v-else class="block">{{ placeHolder }}</span>
        </div>
        <span></span>
        <div ref="menu" class="items">
          <input type="text" @input="filterItems" />
          <ul class="flex flex-col ">
            <li class="cursor-pointer" v-for="item in data" :key="item.id">
              <label class="flex " :for="`cate__item-${item.id}`">
                <input class="" :hidden="true" :id="`cate__item-${item.id}`" v-model="selectedItem" type="checkbox"/>
                <p @click="showItems(item)"
                   class="py-2.5 w-full hover:bg-gray-200 transition duration-150 ease-in px-2 text-sm text-gray-500">
                  {{ item.name }}
                </p>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.items {
  max-height: 0;
  overflow: hidden;
  transition: 0.5s ease max-height;
}

div.active {
  background: red;
}

</style>