<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css' ;
const emit = defineEmits(['result'])
const {data , name , placeholder , model ,requiredItem} = defineProps({
  data:Array,
  name:String,
  placeholder:String,
  model:{
    type:Object,
    default:""
  },
  maxHeight:{
    default:'150',
    type:String
  },
  color:{
    default:'var(--primery-color)',
    type:String
  },
  requiredItem:{
    type:Boolean,
    default:false
  }
})
const currentData = ref(model)

</script>

<template>
  <div class="grid " v-if="data && data.length > 0">
    <label class="typo__label text-sm " :class="`${requiredItem ? `after:content-['*'] after:text-red-500 after:mr-1` : ''} `" v-if="name && name.length">{{name}} : </label>
    <Multiselect  :max-height="maxHeight" open-direction="bottom" v-model="currentData" @select="emit('result' , currentData )" select-label="" deselect-label="" track-by="name" label="name"
                  :placeholder="placeholder" :options="data" :searchable="true" :allow-empty="false" selectedLabel=" ">
    </Multiselect>
  </div>
</template>
<style>

</style>

