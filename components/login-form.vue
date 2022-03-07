<template>
  <v-container>
    <v-card
      elevation="24"
      shaped
      style="padding:20px;"
    >
      <v-card-title>Ulogiraj se</v-card-title>
      <ValidationObserver ref="observer" >
        <v-form
          enctype="multipart/form-data"
          @submit.prevent="login"
        >
          <ValidationProvider
            v-slot="{ errors }"
            name="E-mail"
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
          <ValidationProvider name="password" rules="min:6|required" v-slot="{ errors }">
            <v-text-field
              v-model="user.password"
              type="password"
              :error-messages="errors"
              label="Zaporka"
            ></v-text-field>
          </ValidationProvider>

          <v-btn
            class="mr-4"
            type="submit"
          >
            Prijavi se
          </v-btn>
          <v-btn @click="clear">
            Očisti
          </v-btn>

          <v-divider style="margin-top: 20px; margin-bottom: 20px"></v-divider>
          <nuxt-link to="/register">Registracija</nuxt-link>
          <nuxt-link to="/forgot-password" class="float-right">Zaboravili ste šifru?</nuxt-link>
        </v-form>
      </ValidationObserver>

    </v-card>
    <v-snackbar outlined multi-line :color="color" v-model="snackbar" :timeout="timeout" content-class="text-center">
      {{ message }}
    </v-snackbar>
  </v-container>

</template>

<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
export default {
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  name: "login-form",
  auth: 'guest',
  data: () => ({

    user: {
      email : "",
      password: "",
    },

    snackbar: false,
    timeout: 2000,
    message: '',
    color: '',
    errors: [],
  }),

  watch: {

  },

  mounted() {

    console.log(this.$refs.observer);

  },


  methods: {

    async login() {
      try {
        let response = await this.$auth.loginWith('local', {data: this.user});
        console.log("Auth: ");
        console.log(this.$auth);
        console.log("Ulogiran");
        console.log(response);
      } catch (err) {
        console.log(err.response)
        this.errors = err.response.errors;
        console.log(this.errors);
        console.log(this.$refs.observer);
        for (const error in this.errors) {
          this.errors[error][0]= this.errors[error][0].charAt(0).toUpperCase() + this.errors[error][0].slice(1);
        }
        for (const error in this.errors) {
          this.$refs.observer.errors[error].push(this.errors[error][0]);
        }
        this.message = 'Prijava neuspješna';
        this.color = 'error'
        this.snackbar = true;
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
