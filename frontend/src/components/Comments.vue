<script setup>
import { ref, onBeforeMount, defineProps, computed } from 'vue';

// for ID'ing correct comments for the post
const postID = defineProps({
  postID: String
});

const comments = ref();

async function getComments(getCommentsUrl) {
  try {
    const response = await fetch(getCommentsUrl, {mode: 'cors'});
    const data = await response.json();
    return data.reverse();
  } catch (error) {
    console.error('Error:', error);
  }
};

onBeforeMount(async () => {
    let getCommentsUrl = "http://localhost:3000/api/comments";
    comments.value = await getComments(getCommentsUrl);
})

const filteredComments = computed(() => {
  if (comments.value) {
    return comments.value.filter(comment => comment.postID == postID.postID);
  } else {
    return [];
  }
});


// Makes sure a user is logged in
const currentUser = ref();
let user = ref();

const isLoggedIn = computed(() => {
  currentUser.value = localStorage.getItem('token');
  return currentUser.value ? true : false;
});
user = isLoggedIn.value;


// For submitting a comment
const comment = ref();
const message = ref();

async function submitComment() {
  let submitCommentUrl = "http://localhost:3000/api/commentsubmit"
  const response = await fetch(submitCommentUrl, {
    method: "POST",
    mode: 'cors',
    headers: {
     'Authorization': localStorage.token,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jwt: currentUser,
      comment: comment.value,
      postID: postID.postID
    }),
  });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  } 
  else {
      const data = await response.json();
      message.value = data.message;
      if (data.success) {
        let getCommentsUrl = "http://localhost:3000/api/comments";
        comments.value = await getComments(getCommentsUrl);
      }
  }
}

</script>


<template>
    
    <div class="flex flex-col items-center grow gap-5 mb-10">
        <div class="p-[1px] w-20 h-1 bg-gray-800 rounded-md"></div>
        <span class="text-2xl">Comments</span>
        <span class="w-[80%] flex flex-col items-center justify-center gap-5" v-if="user">
          <form @submit.prevent="submitComment" class="flex items-end grow w-[100%]" action="">
            <textarea v-model="comment" class="flex grow w-[100%] min-h-[65px] border-black border-[1px] rounded-md p-2 resize-y overflow-hidden" type="text" name="comment" id="comment" placeholder="Your thoughts here..."></textarea>
            <input class="p-2 cursor-pointer bg-saffron hover:bg-yellow-400 rounded-md ml-2 h-[65px] align-bottom items-end justify-end" type="submit" name="submit" id="submit" value="Submit">
          </form>
        </span>
        <span v-else>
          Login to add to the discussion!
        </span>

        <div class="w-[80%] flex flex-col justify-start gap-2 bg-gray-200 p-5 rounded-md" v-for="comment in filteredComments">
          <div class="flex flex-row items-center gap-3">
              <h1 class="text-xl ">{{ comment?.username }}</h1>
              <small class="ml-auto opacity-80"> {{  new Date(comment?.time).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })  }} </small>
          </div>
          <p>{{ comment?.message }}</p>
        </div>
    </div>

<!-- Conditional rendering in vue so users can add comments -->
<!-- backend for submitting comments and posts -->

</template>