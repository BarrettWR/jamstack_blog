<script>


</script>

<template>

    <div class="flex grow flex-row w-[100%] min-h-[80vh]">
        <div class="flex flex-col grow items-center justify-center backdrop-brightness-[1.05] p-5">
            <form action="post" class="flex flex-col gap-2 w-[60%] min-h-[60%] p-10 rounded-md mb-[10%] border-black border-[1px]">
                
                <span class="mr-auto ml-auto text-3xl">Log in Form</span>
                <input class=" p-4 mt-auto flex rounded-md border-black border-[1px]" type="text" placeholder="Username" name="username" id="username">
                <input class=" p-4 flex rounded-md border-black border-[1px]  shadow-sharp-sm" type="text" placeholder="Password" name="password" id="password">
                <input class=" p-4 mb-auto mt-2 rounded-md bg-saffron hover:bg-yellow-400 cursor-pointer" type="submit" value="Log In">
                <span class="text-lg">
                    Need an account? 
                    <router-link to="/signup" class=" text-blue-500">Sign up</router-link>
                </span> 
                
            </form>
        </div>
    </div>

</template>