import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'

import NavBar from '../components/NavBar.vue'
import Home from '../vue/Home.vue'
import Post from '../vue/Post.vue'
import PostNew from '../vue/NewPost.vue'
import NotFound from '../vue/404.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/post', component: Post, name: "Posts" },
    { path: '/post/new', component: PostNew, nav: false },
    { path: '*', component: NotFound, nav: false }
]

Vue.prototype.$nav = []

// add route items to $nav if route.nav is not false
routes.forEach(route => route.nav !== false ? Vue.prototype.$nav.push({ path: route.path, name: route.name }) : false)

const router = new VueRouter({
    mode: 'history',  // removes the '#' before route /#/foo --> /foo
    linkActiveClass: "",
    linkExactActiveClass: "active",
    routes
})

const components = {
    'nav-bar': NavBar,
}

const app = new Vue({
    el: "#app",
    router,
    components
})
