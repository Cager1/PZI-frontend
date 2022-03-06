<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="password_reset"
    ref="form"
  >
    <v-text-field
      v-model="user.email"
      type="email"
      name="email"
      label="E-mail"
      required
    ></v-text-field>
    <v-btn
      type="submit"
    >Posalji</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "password-reset-mail",
  data: () => ({

    user: {
      email : "",
    },
  }),

  methods: {
    async password_reset() {
      await axios.post('http://pzi022022.studenti.sumit.sum.ba/backend/api/forgot-password', this.user).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
