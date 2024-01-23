<script setup>
import { ref, onBeforeMount } from 'vue';
import Nav from './Nav.vue'


const protec = ref(null);

const getProtec = async (url) => {
  try {
    const response = await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Authorization': localStorage.token,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

onBeforeMount(async () => {
  protec.value = await getProtec('http://localhost:3000/api/protec');
});


</script>

<template>
  <Nav/>
    <div class="p-10">
        {{ protec?.protec }}
    </div>

</template>