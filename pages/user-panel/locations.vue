<script setup lang="ts">
// import {useAreaStore} from "~/stores/area";
// const locationsStore = useAddressStore()

// const {$swal} = useNuxtApp()
// const areaStore = useAreaStore()
// areaStore.setArea()
// const area = computed(()=>areaStore.getArea)
// const currentArea = ref()
// locationsStore.fetchAddress()
// const location = computed(()=>locationsStore.getAddress)
// const currentData = ref()
// function editAddress(item){
//   currentArea.value = area.value.filter(i=> i.id == item.city.province.id)[0]
//   currentData.value = item
  // locationsStore.showEditAddress = true
// }


// function removeItem(item){
//   const swalWithBootstrapButtons = $swal.mixin({
//     customClass: {
//       confirmButton: "!bg-red-500 !hover:bg-red-300 text-white rounded px-3 py-2 text-sm mx-1",
//       cancelButton: "!bg-colore3e3e3 !hover:bg-color-f3 text-color666 rounded px-3 py-2 text-sm mx-1"
//     },
//     buttonsStyling: false
//   });
//   swalWithBootstrapButtons.fire({
//     title: "آدرس حذف شود؟",
//     text: "این فرآیند غیر قابل بازگشت خواهد بود!",
//     icon: "warning",
//     showCancelButton: true,
//     cancelButtonText: "خیر",
//     confirmButtonText: "بله حذف کن !",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       locationsStore.removeAddress(item.id)
    // }
  // })
// }
</script>

<template>
  <div class="bg-white h-full">
    <user-panel-title title="لیست آدرس ها"/>
    <div>
      <button class="flex gap-1 justify-center px-4 items-center bg-gray-200 py-2 " >
        <icons-pluse/>
        <span class="text-sm">افزودن آدرس جدید</span>
      </button>
    </div>
    <user-panel-no-items/>

    <!--    <div>-->
<!--      <div class="overflow-x-auto" v-if="location.length">-->
<!--        <table class=" w-full ">-->
<!--          <thead>-->
<!--          <tr class="border-b-border-color border-solid border-x-0 border-t-0">-->
<!--            <td class=" text-sm py-3 px-2 text-center "><span class="text-nowrap">شناسه </span></td>-->
<!--            <td class=" text-sm py-3 px-2 text-center "><span class="text-nowrap">تحویل گیرنده</span></td>-->
<!--            <td class=" text-sm py-3 px-2 text-center "><span class="text-nowrap">آدرس</span></td>-->
<!--            <td class=" text-sm py-3 px-2 text-center "><span class="text-nowrap">عملیات</span></td>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          <tbody >-->
<!--          <tr v-for="(item, index) in location" :key="index" class=" my-1 px-1 ">-->
<!--            <td class=" text-center py-3 px-2 text-xs sm:text-sm text-nowrap"><span>{{ item.id }}</span></td>-->
<!--            <td class=" text-center py-3 px-2 text-xs sm:text-sm text-nowrap"><span>{{ item.first_name}} {{item.last_name}}</span></td>-->
<!--            <td class=" text-center py-3 px-2 text-xs sm:text-sm text-nowrap md:text-wrap ">{{ item.address }}</td>-->
<!--            <td class=" text-center py-3 px-2 text-xs sm:text-sm flex gap-1 items-center text-nowrap  justify-center mt-2 sm:mt-0">-->
<!--              <button @click="editAddress(item)">-->
<!--&lt;!&ndash;                <icon-pen-line color="black"/>&ndash;&gt;-->
<!--              </button>-->
<!--              <button @click="removeItem(item)" >-->
<!--&lt;!&ndash;                <icon-trash width="20" height="20"/>&ndash;&gt;-->
<!--              </button>-->
<!--            </td>-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </table>-->
<!--      </div>-->
<!--      <div v-else class="flex justify-center items-center flex-col">-->
<!--        <div class="transform">-->
<!--          <icons-location class="transform scale-150"/>-->
<!--        </div>-->
    <!--      </div>-->
<!--    </div>-->
  </div>
<!--  <transition name="show-address">-->
<!--    <user-panel-address-modal  :area="area" title="افزودن آدرس"  @close="locationsStore.showInsertAddress=false" v-if="locationsStore.showInsertAddress" />-->
<!--  </transition>-->
<!--  <transition name="show-address">-->
<!--    <panel-address-modal :area="area" title="ویرایش آدرس"  :data="currentData" :currentArea="currentArea"   @close="locationsStore.showEditAddress=false" v-if="locationsStore.showEditAddress" />-->
<!--  </transition>-->
</template>

<style scoped>
thead > tr {
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

tbody > tr:not(:last-child) {
  border-bottom: 1px solid var(--border-color) !important;

}
.show-address-enter-active{
  animation: show-modal ease 0.35s forwards;
}
.show-address-leave-active{
  animation: show-modal ease 0.35s forwards reverse;
}
@keyframes show-modal {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
</style>