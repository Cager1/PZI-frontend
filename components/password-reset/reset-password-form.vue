<template>

  <v-container>
    <v-card
      elevation="24"
      shaped
      style="padding:20px;"
    >
      <v-card-title>Ponovo postavite lozinku</v-card-title>
      <ValidationObserver ref="observer">
        <v-form
          enctype="multipart/form-data"
          @submit.prevent="resetPassword"
          ref="form"
          lazy-validation
        >
          <ValidationProvider
            v-slot="{ errors }"
            name="email"
            rules="required|max:100"
          >
            <v-text-field
              v-model="user.email"
              :counter="100"
              :error-messages="errors"
              type="email"
              name="email"
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
          >
            Resetiraj
          </v-btn>
          <v-btn @click="clear">
            Očisti
          </v-btn>
        </v-form>
      </ValidationObserver>

    </v-card>
    <v-snackbar outlined multi-line :color="color" v-model="snackbar" :timeout="timeout" content-class="text-center">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import {setInteractionMode, ValidationObserver, ValidationProvider} from "vee-validate";
setInteractionMode('eager')

export default {
  name: "reset-password-form",
  props: {
    token: String,
  },
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  data: (instance) => ({
    user: {
      email : "",
      password: "",
      password_confirmation: "",
      token: instance.token,
    },
    snackbar: false,
    timeout: 2000,
    message: '',
    color: 'success',
  }),

  watch: {

  },

  mounted() {


  },


  methods: {

    async resetPassword() {
      await this.$axios.$post('/reset-password', this.user).then(response => {
        this.message = response.message;
        this.color = 'success';
        this.snackbar = true;
        setTimeout(()=>{
          this.$router.push("/login")
        }, 2000)
      }).catch(err => {
        this.message = err.message;
        this.color = 'error';
        this.snackbar = true;
        this.clear();
      })


    },

    clear() {
      this.user.email = '';
      this.user.password = '';
      this.user.password_confirmation = '';
    }


  },
}
</script>

<style scoped>

</style>
