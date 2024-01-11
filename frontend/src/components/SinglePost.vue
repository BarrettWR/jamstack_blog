<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const post = ref(null);
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

</script>


<template>
    <div class="flex flex-wrap grow self-start gap-5 backdrop-brightness-[1.05] p-5">
        
        <div class="p-20">
          <h1 class="text-3xl mb-5">{{ post?.title }}</h1>
          <p class="text-xl leading-relaxed">
            {{ post?.text }}
          </p> 
        </div>
        <!-- {{ $route.params.id }} -->
    </div>
</template>

<style>


</style>