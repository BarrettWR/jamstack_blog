<script setup>
import Nav from './components/Nav.vue'
import Home from './components/Home.vue'
import Footer from './components/Footer.vue'


// import { ref, onMounted } from 'vue';

// const comment = ref(null);

// const getComment = async (url) => {
//   try {
//     const response = await fetch(url, {mode: 'cors'});
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// onMounted(async () => {
//   comment.value = await getComment('http://localhost:3000/api/comment/65977ff4a095745e394af765');
//   console.log(comment.value);
// });


</script>

<template>
  <div class="flex flex-col items-center mr-auto ml-auto">
    <Nav/>

    <Home/>

    <Footer/>
  </div>

  

</template>