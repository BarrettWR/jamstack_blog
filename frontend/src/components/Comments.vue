<script setup>
import { ref, onMounted, defineProps } from 'vue';

const postID = defineProps({
  postID: String
});

const filteredComments = ref(null);

onMounted(async () => {
    let url = "http://localhost:3000/api/comments";
    const comments = await getComments(url);

    let temp = [];
    for (let comment of comments) {
      if (comment.postID == postID.postID) {
        temp.push(comment);
      }
    }
    filteredComments.value = temp;
})

async function getComments(url) {
  try {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};


</script>

<template>

    
    <div class="flex flex-col items-center grow gap-5 mb-10">
        <div class="p-[1px] w-20 h-1 bg-gray-800 rounded-md"></div>
        <span class="text-2xl mb-5">Comments</span>
        <div class="w-[80%] flex flex-col justify-start bg-gray-200 p-5 rounded-md" v-for="comment in filteredComments">
          <div class="flex flex-row items-center gap-3">
              <h1 class="text-xl mb-1">{{ comment?.username }}</h1>
              <small class="opacity-80"> {{  new Date(comment.time).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })  }} </small>
          </div>
          <span>{{ comment?.message }}</span>
        </div>
    </div>

<!-- Implement JWT -->
<!-- jwt sent from server should be ok, now i need to set up something to be authenticated -->
<!-- Login form -->
<!-- Conditional rendering in vue so users can add comments -->

</template>