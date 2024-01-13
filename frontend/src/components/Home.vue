<script setup>
import RecentPosts from './RecentPosts.vue';


</script>

<template>
    <div class="flex flex-row">
        <div class="flex flex-col justify-center grow backdrop-brightness-[1.05] p-5 font-nunito">
            <img class="flex grow object-cover" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fifteendesign.co.uk%2Fwp-content%2Fuploads%2F2016%2F10%2FDeveloperChallenges.jpg&f=1&nofb=1&ipt=b601b124d83eabef2d8b6daac0ada9a1fcab62a76951a83e87dbce2653fcd075&ipo=images" alt="">
            <div class="flex flex-col gap-5 bg-saffron bg-opacity-10 p-5 mt-5">
                <h1 class="ml-0 m-5 text-5xl">What is Pagebreak?</h1>
                <p class="text-xl leading-relaxed">Pagebreak is the imaginary blog site of Barrett Reinhard (that's me!). 
                    The purpose of this site is to further my skills as a developer! I am in the process of learning all of the skills necessary to start working in web development professionally. </p>
                <p class="text-xl leading-relaxed">This site was created using the jamstack architecture pattern, which separates the front and back end in development. 
                    The tools I used to create this include Vue, Express, MongoDB, and Tailwind. More information about this project can be found on my github, linked in the footer below.</p>
            </div>
        </div>
        <RecentPosts class="fixed left-[75svw]"/>
    </div>
    

    
</template>