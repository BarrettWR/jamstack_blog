<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import Nav from './Nav.vue'


const posts = ref(null);
const isAdmin = ref()

const getPosts = async (url) => {
  try {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

onBeforeMount(async () => {
  posts.value = await getPosts('http://localhost:3000/api/posts');
  posts.value.reverse()
});

const currentUser = ref();

const isLoggedIn = computed(() => {
  currentUser.value = localStorage.getItem('token');
  return currentUser.value ? true : false;
});


</script>


<template>
  <Nav :isLoggedIn="isLoggedIn"/>
    <div class="flex flex-wrap self-start backdrop-brightness-[1.05] p-5 min-h-[80vh]">
      <div class="flex flex-wrap gap-5">
        <router-link :to="`/post/${post._id}`" class="flex flex-col rounded-md cursor-pointer box shadow xl:max-w-[46.2%] h-fit box-content" v-for="post in posts">
          <div class="overflow-hidden h-fit">
              <div class="flex flex-col items-start">
                  <h1 class="text-2xl ">{{ post?.title }}</h1>
                  <small class="opacity-80 text-xs mb-1 overflow-hidden max-h-[25px]"> {{  new Date(post.time).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })  }} </small>
              </div>
              <p class="leading-relaxed overflow-hidden max-h-[80px]">{{ post?.text }}</p>
          </div>
        </router-link>
      </div>
    </div>
</template>

<style>



.box {
  min-width: 250px;
  display: block;
  position: relative;
  border-radius: 5px;
  background: linear-gradient(to right, rgb(235, 198, 103) 35%, rgb(223, 183, 50) 100%);
  padding: 10px;
  box-shadow: 1px 2px 1px -1px #777;
  transition: all 200ms ease-in-out;
}

.shadow {
  position: relative;
}
.shadow:before {
  z-index: -1;
  position: absolute;
  content: "";
  bottom: 14px;
  right: 12px;
  width: 25%;
  top: 0;
  box-shadow: 0 15px 10px #777;
  transform: rotate(4deg);
  transition: all 150ms ease-in-out;
}

.box:hover {
  background: linear-gradient(to right, rgb(235, 198, 103) 25%, rgb(213, 174, 44) 100%);
  /* transition: all 200ms ease-in-out; */
  /* translate: -2px 0px; */
}

.shadow:hover::before {
  transform: rotate(7deg);
  bottom: 11px;
  z-index: -10;
}


</style>