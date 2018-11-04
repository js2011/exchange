<template>
  <div class="main">
    <!-- <feed-page v-if="firstAjax"></feed-page> -->
    <personal-page :user="user"></personal-page>
  </div>
</template>
<script>
import PersonalPage from "./pages";
export default {
  props: {
    user: Object,
    firstAjax: Boolean
  },
  components: { PersonalPage }
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
