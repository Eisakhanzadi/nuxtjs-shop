<script setup lang="ts">
const {comments} = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  children: {
    type: Boolean,
    required: true
  }
})
const answer = ref<boolean>(false)
</script>

<template>
  <section v-if="comments?.length" v-for="(comment ,index) in comments" :key="comment.id"
           :class="{'mr-5 my-5':children}">
    <div class="card flex gap-3 p-5 w-full" :class="{'bg-color-primary':children}">
      <div class="card-header">
        <figure>
          <img class="w-10 h-10 rounded-lg bg-green-500" :src="comment.img" :alt="comment.name">
        </figure>
      </div>
      <div class="card-body w-full grid gap-3">
        <div class="flex gap-2 items-center">
          <h6 class="text-sm">{{ comment.name }}</h6>
          <time class="text-xs text-color-light" :datetime="comment?.created_at">
            {{ persianDate(comment?.created_at).persianMonth }}
          </time>
        </div>
        <div v-if="comment.body?.length" >
          <p class="text-sm" v-text="comment.body"></p>
        </div>
        <div class="mt-1">
          <button @click="answer=!answer" class="text-sm text-blue-500">
            <span v-if="!answer">پاسخ دهید</span>
            <span v-else> بستن</span>
          </button>
        </div>
        <div v-if="answer">
          <form-message :question="false" :phone="false" :email="true" :subject="false"/>
        </div>
      </div>
    </div>
    <form-comment v-if="comment?.children?.length" :comments="comment.children" :children="true"/>
  </section>
</template>

<style scoped>

</style>