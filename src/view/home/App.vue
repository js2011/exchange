<template>
  <div class="main">
    <!-- <feed-page v-if="firstAjax"></feed-page> -->
    <home-page :user="user"></home-page>
  </div>
</template>
<script>
import HomePage from "./pages";
export default {
  props: {
    user: Object,
    firstAjax: Boolean
  },
  components: { HomePage }
};
</script>
<style>
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
