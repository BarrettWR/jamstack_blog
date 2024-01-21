<script setup>
import { ref } from 'vue';


let username = ref();
let password = ref();
let url = "http://localhost:3000/api/signup"

async function submitForm() {
  try {
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
        localStorage.setItem('token', data.token);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


</script>

<template>

    <div class="flex grow flex-row w-[100%] min-h-[80vh]">
        <div class="flex flex-col grow items-center justify-center backdrop-brightness-[1.05] p-5">
            <form @submit.prevent="submitForm" class="flex flex-col gap-2 w-[60%] min-h-[60%] p-10 rounded-md mb-[10%] border-black border-[1px]">
                <span class="mr-auto ml-auto text-3xl">Sign Up Form</span>
                <input v-model="username" class=" p-4 mt-auto flex rounded-md border-black border-[1px]" type="text" placeholder="Username" name="username" id="username">
                <input v-model="password" class=" p-4 flex rounded-md border-black border-[1px]  shadow-sharp-sm" type="text" placeholder="Password" name="password" id="password">
                <input class=" p-4 mb-auto mt-2 rounded-md bg-saffron hover:bg-yellow-400 cursor-pointer" type="submit" value="Log In">
                <span class="text-lg">
                    Have an account? 
                    <router-link to="/login" class=" text-blue-500">Log in</router-link>
                </span> 
                
            </form>
        </div>
    </div>

</template>