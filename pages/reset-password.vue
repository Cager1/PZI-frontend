<template>
  <reset-password-form v-bind:token="token"/>
</template>

<script>
export default {
  name: "reset-password",
  auth: 'guest',
  data: () => ({
    token: "",
  }),

  created() {
    this.token = this.$route.query.token;
  }
}
</script>

<style scoped>

</style>
