<template>
  <div>
    <router-link to="/post/new">New Post</router-link>
    <div v-for="post in posts" :key="post.title">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <a href="#" @click="deletePost" :data-id="post.id">Delete Post</a>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  methods: {
    refreshPosts() {
      this.axios
        .get("/api/post")
        .then(response => (this.posts = response.data));
    },
    deletePost(e) {
      this.axios
        .delete(`/api/post/${e.target.dataset.id}`)
        .then(this.refreshPosts);
    }
  },
  beforeMount() {
    this.refreshPosts();
  }
};
</script>

<style>
</style>