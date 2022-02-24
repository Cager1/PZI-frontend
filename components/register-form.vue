<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>Registracija</v-card-title>
    <v-form
      enctype="multipart/form-data"
      @submit.prevent="register"
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="user.name"
        name="name"
        label="Ime i prezime"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        name="email"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        name="password"
        label="Šifra"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password_confirmation"
        name="password_confirmation"
        type="password"
        label="Potvrdi šifru"
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script>

import axios from "axios";

export default {
  name: "register-form",

  data: () => ({

    user: {
      name: "",
      email : "",
      password: "",
      password_confirmation: "",
    },

    valid: true,
    checkbox: false,
  }),

  watch: {

  },

  mounted() {


  },


  methods: {

    async register() {
      await axios.post('http://127.0.0.1:8000/api/register', this.user).then(response => {
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
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

</style>
