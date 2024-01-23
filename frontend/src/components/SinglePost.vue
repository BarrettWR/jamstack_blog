<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Comments from './Comments.vue' ;
import Nav from './Nav.vue'


const post = ref();

const id = ref(null);
const route = useRoute();

const getPost = async (url) => {
  try {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

onMounted(async () => {
    id.value = route.params.id;
    post.value = await getPost(`http://localhost:3000/api/post/${id.value}`);
});

const currentUser = ref();
const isLoggedIn = computed(() => {
  currentUser.value = localStorage.getItem('token');
  return currentUser.value ? true : false;
});

</script>


<template>
   <Nav :isLoggedIn="isLoggedIn"/>
    <div class="flex flex-wrap justify-center self-start gap-5 backdrop-brightness-[1.05] p-5 min-h-[80vh]">
        
        <div class="p-20">
          <h1 class="text-3xl mb-5">{{ post?.title }}</h1>
          <p class="text-xl leading-relaxed">
            {{ post?.text }}
          </p> 
        </div>
        <Comments :postID = "post?._id"/>
        <!-- {{ $route.params.id }} -->
    </div>


</template>

<style>


</style>