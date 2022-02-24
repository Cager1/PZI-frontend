<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>Dodaj Ulogu</v-card-title>
    <v-form
      enctype="multipart/form-data"
      @submit.prevent="createRole"
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="role.name"
        name="role"
        label="Ime Uloge"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
        type="submit"
      >
        Potvrdi
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";


export default {
  name: "create-role",

  data: () => ({

    role: {
      name: "",
    },

    valid: true,
  }),

  watch: {

  },

  mounted() {

  },


  methods: {

    async createRole() {
      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await axios.post('http://127.0.0.1:8000/api/admin/roles', this.role, config).then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    },

    validate () {
      this.$refs.form.validate()
    },


  },
}
</script>

<style scoped>

</style>
