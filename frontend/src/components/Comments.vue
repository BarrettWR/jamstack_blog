<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const comments = defineProps({
  postID: String
});

// use a for loop on each comment id to populate the comments data
// save the data in an array or whatever

</script>

<template>

    <div class="p-[1px] w-20 h-1 bg-gray-800 rounded-md"></div>
    <div class="p-20">
        {{ postID }}
    </div>

<!-- Create comments section for each post -->
<!-- Implement JWT -->
<!-- Recent Posts Block -->

</template>