<template>
  <v-container>
    <v-card
      elevation="24"
      shaped
      style="padding:20px;"
    >
      <v-card-title>Pošaljite mail za resetiranje zaporke</v-card-title>
      <ValidationObserver ref="observer">
        <v-form
          enctype="multipart/form-data"
          @submit.prevent="password_reset"
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
          <v-btn
            class="mr-4"
            type="submit"
          >
            Potvrdi
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
  name: "password-reset-mail",
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data: () => ({

    user: {
      email : "",
    },

    snackbar: false,
    timeout: 2000,
    message: '',
    color: 'success',

    errors: [],
  }),

  methods: {
    async password_reset() {
      await this.$axios.$post('/forgot-password', this.user).then(response => {
        this.message = response.message;
        this.color = 'success';
        this.snackbar = true;
        this.clear();
      }).catch(err => {
        console.log(err.response);
        this.errors = err.response.data.errors;
        console.log(this.errors);
        for (const error in this.errors) {
          this.errors[error][0]= this.errors[error][0].charAt(0).toUpperCase() + this.errors[error][0].slice(1);
        }
        console.log(this.errors[0])
        this.message = this.errors.email[0];
        this.color = 'error';
        this.snackbar = true;
      })
    },
    clear() {
      this.user.email = '';
      this.user.password = '';
      this.user.password_confirmation = '';
    }
  }
}
</script>

<style scoped>

</style>
