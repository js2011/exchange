<template>
  <div class="main">
    <sign-in-page></sign-in-page>
  </div>
</template>
<script>
import SignInPage from "./pages";
export default {
  props: {
    firstAjax: Boolean
  },
  components: { SignInPage }
};
</script>
<style scoped>
html {
  background: #f3f4f4;
}
.main {
  max-width: 750px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
