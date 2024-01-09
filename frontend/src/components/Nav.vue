<script>
import { RouterView, createRouter } from 'vue-router'


</script>

<template>
  <nav class="sticky top-0 flex flex-row justify-end text-xl p-5 gap-10 w-[50svw] bg-saffron rounded-sm z-10">
    <router-link class="mr-auto" to="/" >Pagebreak</router-link>
    <router-link to="/posts">Posts</router-link>

  </nav>
</template>

