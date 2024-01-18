import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Posts from './components/Posts.vue'
import Home from './components/Home.vue'
import SinglePost from './components/SinglePost.vue'
import Login from './components/Login.vue'

import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    { path: '/posts', component: Posts },
    { path: '/', component: Home },
    { path: '/post/:id', component: SinglePost },
    { path: '/login', component: Login }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
  
createApp(App).use(router).mount('#app')