<template>
  <nav>
    <a class="logo" href="/">
      <img src="/static/images/logo.png" alt />
      <h1>Flask + Vue</h1>
    </a>
    <div class="links">
      <router-link v-for="route in $nav" :key="route.path" :to="route.path">{{ route.name }}</router-link>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>