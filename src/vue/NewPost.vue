<template>
  <div>
    <form @submit="handleSubmit">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <form-element id="title"></form-element>
      <form-element id="content"></form-element>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import FormElement from "../components/FormElement.vue";

export default {
  data() {
    return {
      errors: []
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      // get the values
      const title = event.target.title.value;
      const content = event.target.content.value;

      if (title && content) {
        // add a new post
        this.axios
          .post("/api/post/new", {
            title,
            content
          })
          .then(response => {
            if (response.data.success) {
              this.$router.push("/post");
            } else if (response.data.message) {
              this.errors.push(response.data.message)
            } else {
              this.errors.push('Creating a new post failed. It was probably your fault.')
            }
          });
      }

      // clear errors
      this.errors = [];

      if (!title) {
        this.errors.push("Please enter a title :)");
      }
      if (!content) {
        this.errors.push("Enter some content you silly goose! HONK");
      }
    }
  },
  components: { FormElement }
};
</script>

<style scoped>
li {
  display: list-item;
}
</style>