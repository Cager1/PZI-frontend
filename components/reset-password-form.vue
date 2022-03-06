<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>{{ token }}</v-card-title>
    <v-form
      enctype="multipart/form-data"
      @submit.prevent="resetPassword"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="user.email"
        type="email"
        name="email"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        type="password"
        name="Password"
        label="Šifra"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password_confirmation"
        type="password"
        name="password_confirmation"
        label="Šifra"
        required
      ></v-text-field>


      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Morate potvrditit kako bi nastavili']"
        label="Da li potvrđujete?"
        required
      ></v-checkbox>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
        type="submit"
      >
        Potvrdi
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Resetiraj
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "reset-password-form",
  props: {
    token: String,
  },

  data: (instance) => ({
    user: {
      email : "",
      password: "",
      password_confirmation: "",
      token: instance.token,
    },
    valid: true,
    checkbox: false,
  }),

  watch: {

  },

  mounted() {


  },


  methods: {

    async resetPassword() {
      await axios.post('http://pzi022022.studenti.sumit.sum.ba/backend/api/reset-password', this.user).then(response => {
        console.log(this.user);
      }).catch()

    },

    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },


  },
}
</script>

<style scoped>

</style>
