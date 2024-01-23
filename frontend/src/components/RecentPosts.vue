<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue';


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

const recentPosts = computed(() => {
  let recents = [];
  if (posts.value) {
    for (let i = 0; i < Math.min(3, posts.value.length); i++) {
      recents.push(posts.value[i]);
    }
  }
  return recents;
});

</script>


<template>

    <div class="flex flex-col gap-3 max-w-[300px] bg-white p-5 ml-2 rounded-md">
        <span class="text-xl"> Recent Posts</span>
        <div class="" v-for="post in recentPosts">
          <router-link :to="`/post/${post._id}`">
            <div class="box shadow">
              <span class="text-lg">{{ post?.title }}</span>
              <p class="text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis"> {{ post.text }}</p>
            </div>
          </router-link>
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