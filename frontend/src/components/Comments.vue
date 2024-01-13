<script>
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';

// const comments = ref(null);
// const id = ref(null);
// const route = useRoute();

// const getComments = async (url) => {
//   try {
//     const response = await fetch(url, {mode: 'cors'});
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// onMounted(async () => {
//     id.value = route.params.id;
//     post.value = await getComments(`http://localhost:3000/api/comments/${id.value}`);
// });

</script>

<template>

    <div class="p-[1px] w-20 h-1 bg-gray-800 rounded-md"></div>
    <div class="p-20">
        {{ post }}
    </div>

<!-- Create comments section for each post -->
<!-- Implement JWT -->
<!-- Recent Posts Block -->

</template>