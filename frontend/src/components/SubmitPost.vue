<script setup>
import { ref, onBeforeMount, defineProps, computed } from 'vue';
import Nav from './Nav.vue'

const currentUser = ref();
const isAdmin = ref();
const blogTitle = ref();
const blogPost = ref();
const message = ref();

const isLoggedIn = computed(() => {
  currentUser.value = localStorage.getItem('token');
  return currentUser.value ? true : false;
});

const getSubmit = async (url) => {
  try {
    const response = await fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

onBeforeMount(async () => {
  isAdmin.value = await getSubmit('http://localhost:3000/api/postsubmit');
});


async function submitForm() {
  try {
    console.log(blogTitle.value)
    const response = await fetch("http://localhost:3000/api/postsubmit", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Authorization': localStorage.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogTitle: blogTitle.value,
          blogPost: blogPost.value
        }),
      });
 
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } 
      else {
          const data = await response.json();
          message.value = data.message;
      }
    }
    catch (error) {
        console.error('Error:', error);
    }
};


</script>


<template>
    <Nav :isLoggedIn="isLoggedIn"/>

    <div class="flex grow flex-row w-[100%] min-h-[80vh]">
        <div class="flex flex-col grow justify-center items-center backdrop-brightness-[1.05] p-5" v-if="isAdmin">
            <div v-if="isAdmin.success">
                <h1 class="text-xl mb-5">Welcome back!</h1>
                <form @submit.prevent="submitForm" class="flex flex-col gap-3 w-[30vw]" action="">
                    <input v-model="blogTitle" class="p-3 rounded-md border-black border-[1px]" type="text" name="blogTitle" id="blogTitle" placeholder="Title">
                    <textarea v-model="blogPost" class="p-3 rounded-md border-black border-[1px] min-h-[200px]" name="blogPost" id="blogPost" placeholder="Blog post"></textarea>
                    <input class="p-4 mb-auto mt-2 rounded-md bg-saffron hover:bg-yellow-400 cursor-pointer" type="submit" name="submit" id="submit" value="Submit">
                </form>
                <span v-if="message">
                    Error!
                </span>
            </div>
        </div>
        <div v-else>
            Not Authorized.
        </div>
    </div>

</template>