<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>Registracija</v-card-title>
    <ValidationObserver
      ref="observer"
    >
      <v-form
        enctype="multipart/form-data"
        @submit.prevent="register"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Ime i prezime"
          rules="required|max:100"
        >
          <v-text-field
            v-model="user.name"
            :counter="100"
            :error-messages="errors"
            label="Ime i Prezime"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="user.email"
            type="email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider name="Zaporka" rules="min:6|required|confirmed:confirmation" v-slot="{ errors }">
          <v-text-field
            v-model="user.password"
            type="password"
            :error-messages="errors"
            label="Zaporka"
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider rules="min:6|required" name="Potvrda zaporke" vid="confirmation" v-slot="{ errors }">
          <v-text-field
            v-model="user.password_confirmation"
            type="password"
            :error-messages="errors"
            label="Potvrda zaporke"
          ></v-text-field>
        </ValidationProvider>

        <v-btn
          class="mr-4"
          type="submit"
          text
          color="primary"
          @click="role = 1"
        >
          Registriraj Korisnika
        </v-btn>
        <v-btn
          class="mr-4"
          type="submit"
          text
          color="primary"
          @click="role = 2"
        >
          Registriraj Servisera
        </v-btn>
        <v-btn @click="clear" text color="primary">
          Očisti
        </v-btn>
      </v-form>
    </ValidationObserver>

    <v-snackbar outlined multi-line :color="color" v-model="snackbar" :timeout="timeout" content-class="text-center">
      {{ message }}
    </v-snackbar>

  </v-card>


</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script>

import axios from "axios";
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

export default {
  name: "register-form",
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  data: () => ({
    user: {
      name: "",
      email : "",
      password: "",
      password_confirmation: "",
    },

    role: 1,

    snackbar: false,
    timeout: 2000,
    message: '',
    color: 'success',
    errors: [],
  }),

  watch: {

  },

  mounted() {

  console.log(this.$axios)
  },


  methods: {

    async register() {
      if (this.role === 1) {
        await this.$axios.$post('/register', this.user).then(response => {
          console.log(response);
          this.message = 'Uspiješna registracija Korisnika';
          this.color = 'success';
          this.snackbar = true;
          setTimeout(()=>{
            this.$router.push("/login")
          }, 2000)
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.errors;
          console.log(this.errors);
          for (const error in this.errors) {
            this.errors[error][0]= this.errors[error][0].charAt(0).toUpperCase() + this.errors[error][0].slice(1);
          }
          this.message = 'Registracija neuspješna';
          this.color = 'error'
          this.snackbar = true;
        })
      } else if (this.role === 2) {
        this.user.role_id = 2;
        await this.$axios.$post('/register', this.user).then(response => {
          console.log(response);
          this.message = 'Uspiješna registracija Servisera';
          this.color = 'success';
          this.snackbar = true;
          setTimeout(()=>{
            this.$router.push("/login")
          }, 2000)
        }).catch((err) => {
          console.log(err.response)
          this.errors = err.response.errors;
          console.log(this.errors);
          for (const error in this.errors) {
            this.errors[error][0]= this.errors[error][0].charAt(0).toUpperCase() + this.errors[error][0].slice(1);
          }
          this.message = 'Registracija neuspješna';
          this.color = 'error'
          this.snackbar = true;
        })
      }

    },

    clear() {
      this.user.name = ''
      this.user.email = ''
      this.user.password = ''
      this.user.password_confirmation = ''
      this.$refs.observer.reset()
    }
  },
}
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

</style>
