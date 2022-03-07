<template>
  <reset-password-form v-bind:token="token"/>
</template>

<script>
import ResetPasswordForm from "@/components/password-reset/reset-password-form";
export default {
  name: "reset-password",
  components: {ResetPasswordForm},
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
