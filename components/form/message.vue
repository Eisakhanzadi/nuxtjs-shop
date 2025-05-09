<script setup lang="ts">
import {boolean} from "zod";

const {question, email, subject, phone, focus} = defineProps({
  question: {
    default: true,
    type: boolean
  },
  email: {
    default: false,
    type: boolean
  },
  subject: {
    default: true,
    type: boolean
  },
  phone: {
    default: true,
    type: boolean
  },
  focus: {
    default: true,
    type: boolean
  }
})
const emit = defineEmits(['sendMessage'])
const firstInput = ref<HTMLInputElement|null>(null)

async function handleSubmit() {
  if (email && params.email.length < 10)
    paramsError.email = true
  if (params.name.length < 2)
    paramsError.name = true
  if (phone && params.phone_number.length != 11)
    paramsError.phone_number = true
  if (subject && params.subject.length < 2)
    paramsError.subject = true
  if (params.body.length < 2)
    paramsError.body = true
  if (question && params.question !== 'تهران')
    paramsError.question = true
  // if all params was ok
  console.log(filterExistParams())
  if (
      paramsError.name &&
      (paramsError.email) &&
      (paramsError.phone_number) &&
      (paramsError.subject) &&
      paramsError.body &&
      (paramsError.question)
  ) {

    console.log(params)
    // emit('sendMessage', filterExistParams())

  }
}

function deActiveError(item: string) {
  paramsError[item] ? paramsError[item] = false : false
}

onMounted(() => {
  if (focus) {
    firstInput.value.focus()
  }
})


const params = reactive<{ [key: string]: any }>({
  name: "",
  phone_number: "",
  subject: "",
  body: "",
  question: "",
  loading: false,
  email: ""
})
const paramsError = reactive<{ [key: string]: boolean }>({
  name: false,
  phone_number: false,
  subject: false,
  body: false,
  question: false,
  email: false
})

function filterExistParams() {
  if (!phone) {
    delete params['phone_number']
  }
  if (!subject) {
    delete params['subject']
  }
  if (!email) {
    delete params['email']
  }
  if (!question) {
    delete params['question']
  }
  return params
}
</script>

<template>
  <form @submit.prevent="handleSubmit" action="">
    <div class="grid gap-3 grid-cols-3 items-baseline ">
      <div class="input-group col-span-3 md:col-span-1">
        <input ref="firstInput" v-model.trim="params.name" @keydown="deActiveError('name')"
               class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
               :class="{'!border !border-red-500':paramsError.name}" placeholder="نام:"
               type="text">
        <span v-if="paramsError.name" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید (حداقل طول 3 کاراکتر) </span>
      </div>
      <div v-if="phone" class="input-group col-span-3 md:col-span-1">
        <input v-model.trim="params.phone_number" @keydown="deActiveError('phone_number')"
               class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
               :class="{'!border !border-red-500':paramsError.phone_number}" placeholder="شماره تماس:"
               type="text">
        <span v-if="paramsError.phone_number" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
      </div>
      <div v-if="email" class="input-group col-span-3 md:col-span-1">
        <input v-model.trim="params.email" @keydown="deActiveError('email')"
               class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
               :class="{'!border !border-red-500':paramsError.email}" placeholder="ایمیل:"
               type="text">
        <span v-if="paramsError.email" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید (حداقل طول 11 کاراکتر) </span>
      </div>
      <div v-if="subject" class="input-group col-span-3 md:col-span-1">
        <input v-model.trim="params.subject" @keydown="deActiveError('subject')"
               class="w-full px-3 py-3 border outline-0 form-color placeholder:text-sm "
               :class="{'!border !border-red-500':paramsError.subject}" placeholder="موضوع:"
               type="text">
        <span v-if="paramsError.subject" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید (حداقل طول 3 کاراکتر) </span>
      </div>
      <div class="input-group col-span-3">
            <textarea v-model.trim="params.body" @keydown="deActiveError('body')"
                      class="w-full px-3 py-3 border outline-0 resize-none form-color placeholder:text-sm "
                      :class="{'!border !border-red-500':paramsError.body}"
                      placeholder="پیام:" name="" id="" cols="30" rows="10"></textarea>
        <span v-if="paramsError.body" class="error text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
      </div>
    </div>
    <div class="mt-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div v-if="question">
        <label class="text-sm" for="question">نام پایتخت ایران را به فارسی بنویسید</label>
        <input v-model.trim="params.question" type="text" @keydown="deActiveError('question')"
               class="border form-color w-16 px-2 py-2 text-center rounded mr-1.5 text-color-999 outline-0"
               :class="{'!border !border-red-500':paramsError.question}"
               autocomplete="false">
        <span v-if="paramsError.question" class="error block text-xs text-red-500 "> لطفا این قسمت رو کامل کنید </span>
      </div>
      <div class="w-1/2 sm:w-1/3 md:w-3/12 self-end" :class="{'mr-auto':!question}">
        <button class="text-center w-full text-white text-sm bg-black p-4">
          ارسال پیام
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>