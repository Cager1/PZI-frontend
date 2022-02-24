<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>Ulogiraj se</v-card-title>
    <v-form
      enctype="multipart/form-data"
      @submit.prevent="login"
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

      <v-divider></v-divider>
      <nuxt-link to="/register">Registracija</nuxt-link>
      <nuxt-link to="/forgot-password" class="float-right">Zaboravili ste šifru?</nuxt-link>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "login-form",
  auth: 'guest',
  data: () => ({

    user: {
      email : "",
      password: "",
    },

    valid: true,
    checkbox: false,
  }),

  watch: {

  },

  mounted() {


  },


  methods: {

    async login() {
      try {
        let response = await this.$auth.loginWith('local', {data: this.user});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
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
