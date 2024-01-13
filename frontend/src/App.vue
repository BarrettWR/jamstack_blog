<script setup>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'




</script>

<template>
  <div class="flex flex-col items-center mr-auto ml-auto w-[50svw]">
    <Nav/>

    <router-view></router-view>

    <Footer/>
  </div>

  

</template>