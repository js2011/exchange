<template>
  <div class="feedback-main">
    <feedback-page></feedback-page>
  </div>
</template>
<script>
import FeedbackPage from './pages'
export default{
  props: {
    firstAjax: Boolean
  },
  components: {FeedbackPage}
}
</script>
<style>
  .feedback-main {
    max-width: 750px;
    margin: 0 auto;
    background: rgb(246, 246, 250) !important;
  }
</style>
