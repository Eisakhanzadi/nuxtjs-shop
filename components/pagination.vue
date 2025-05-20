<script setup lang="ts">
import Paginate from 'vuejs-paginate-next';
defineProps({
  lastPage:{
    default:1,
    type:Number
  }
})

const route = useRoute()
const router = useRouter()
const pagination = reactive({
  currentPage:1
})
pagination.currentPage = route.query.page!=null ? Number(route.query.page)  : 1
function changePage(page){
  pagination.currentPage = Number(page)
  const query = {...route.query,page:Number(pagination.currentPage)}
  router.replace({path:route.path,query:query})
}
</script>

<template>
  <div class="flex justify-center">
    <paginate
        v-model="pagination.currentPage"
        :page-count="lastPage"
        :page-range="2"
        :margin-pages="2"
        :click-handler="changePage"
        :prev-text="'&langle;'"
        :next-text="'&rangle;'"
        :container-class="'pagination'"
        :page-class="'page-item'"
    />
  </div>
</template>


<style scoped>

</style>
