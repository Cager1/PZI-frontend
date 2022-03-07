<template>
  <v-container>
    <password-reset-mail/>
  </v-container>
</template>

<script>

import PasswordResetMail from "@/components/password-reset/password-reset-mail";
export default {
  name: "forgot-password",
  components: {PasswordResetMail},
  auth: 'guest',
}
</script>

<style scoped>

</style>
