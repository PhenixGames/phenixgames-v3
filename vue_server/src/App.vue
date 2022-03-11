<template>
  <Login ref="Login" />
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
  methods() {
    global.gui.Login = this.$ref.Login;
  },
};
</script>

<style>
@import "https://blackdayz.github.io/BlackCSS/lib/BlackCSS.css";
@import "https://fonts.googleapis.com/css?family=Open+Sans";
</style>
