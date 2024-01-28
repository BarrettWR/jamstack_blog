<script setup>
import { ref } from 'vue';

let isLoggedIn = defineProps({
  isLoggedIn: Boolean
});

const user = ref();
const loggedIn = ref();
loggedIn.value = isLoggedIn.isLoggedIn;
user.value = localStorage.getItem('token');

async function logOut() {
  try {
    localStorage.removeItem("token");
    user.value = null;
    loggedIn.value = false;
  } catch (error) {
    console.error('Error:', error);
  }
}

</script>

<template>
  <nav class="top-0 flex flex-row justify-end text-xl p-5 gap-10 w-[50svw] bg-saffron rounded-sm z-10">
    <router-link class="mr-auto" to="/">Pagebreak</router-link>
    <router-link v-if="!loggedIn" to="/login">Login</router-link>
    <router-link v-if="loggedIn" @click="logOut()" to="/">Log out</router-link>
    <router-link to="/posts">Posts</router-link>

  </nav>
</template>

