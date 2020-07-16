<template>
  <div class="form-element">
    <label :for="id">{{ label }}</label>
    <input :id="id" :name="name" :placeholder="placeholder" :type="type" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default() {
        return this.$props.id;
      }
    },
    placeholder: {
      type: String,
      default() {
        return "Please enter a value for " + this.$props.name;
      }
    },
    label: {
      type: String,
      default() {
        return this.$props.name;
      }
    },
    type: {
      type: String,
      default: "text"
    }
  }
};
</script>

<style>
</style>