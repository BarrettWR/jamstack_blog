<script setup>
import { ref,computed } from 'vue';
import Nav from './Nav.vue';

let username = ref();
let password = ref();
let confirmPassword = ref();
let url = "http://localhost:3000/api/signup"
const message = ref();
const errorMessage = ref();


async function submitForm() {
  try {
    if (!username.value) {
      errorMessage.value = "Username must be at least one character."
    }

    else if (!password.value) {
      errorMessage.value = "Password must be at least one character."
    }

    else if (password.value != confirmPassword.value) {
      errorMessage.value = "Passwords must match"
    }

    else {
      const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        }),
      });
 
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } 
      else {
          const data = await response.json();
          message.value = data.message;
          errorMessage.value = data.error;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const currentUser = ref();
const isLoggedIn = computed(() => {
  currentUser.value = localStorage.getItem('token');
  return currentUser.value ? true : false;
});


</script>

<template>
    <Nav :isLoggedIn="isLoggedIn"/>
    <div class="flex grow flex-row w-[100%] min-h-[80vh]">
        <div class="flex flex-col grow items-center justify-center backdrop-brightness-[1.05] p-5">
            <form @submit.prevent="submitForm" class="flex flex-col gap-2 w-[60%] min-h-[60%] p-10 rounded-md mb-[10%] border-black border-[1px]">
                <span class="mr-auto ml-auto text-3xl">Sign Up Form</span>
                <span class="flex mt-2 mb-2 bg-red-400 p-4 rounded-md" v-if="errorMessage">{{ errorMessage }}</span>
                <input v-model="username" class=" p-4 mt-auto flex rounded-md border-black border-[1px]" type="text" placeholder="Username" name="username" id="username">
                <input v-model="password" class=" p-4 flex rounded-md border-black border-[1px]  shadow-sharp-sm" type="password" placeholder="Password" name="password" id="password">
                <input v-model="confirmPassword" class=" p-4 flex rounded-md border-black border-[1px] shadow-sharp-sm" type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword">
                <input class=" p-4 mb-auto mt-2 rounded-md bg-saffron hover:bg-yellow-400 cursor-pointer" type="submit" value="Sign up">
                <span class="text-lg">
                    Have an account? 
                    <router-link to="/login" class=" text-blue-500">Log in</router-link>
                </span> 
                <span class="flex mt-2 mb-2 bg-green-400 p-4 rounded-md" v-if="message">{{ message }}</span>
            </form> 
        </div>
    </div>

</template>