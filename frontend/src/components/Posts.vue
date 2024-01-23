<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import Nav from './Nav.vue'


const posts = ref(null);

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
      <div class="flex flex-wrap gap-5 h-min">
        <div class="flex flex-col p-5 rounded-md cursor-pointer box shadow xl:max-w-[48.3%]" v-for="post in posts">
          <router-link :to="`/post/${post._id}`">
            <div class="textbox">
                <div class="flex flex-row items-center gap-5">
                    <h1 class="text-2xl mb-1 text-nowrap">{{ post?.title }}</h1>
                    <small class="opacity-80 overflow-hidden max-h-[25px]"> {{  new Date(post.time).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })  }} </small>
                </div>
                <p class=" overflow-hidden max-h-[115px]">{{ post?.text }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<style>

.textbox {
  /* max-height: 150px; */
  overflow: hidden;
  text-overflow: clip;
  line-height: 1.7;
}

.box {
  min-width: 250px;
  max-height: 160px;
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