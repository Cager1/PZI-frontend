<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>Objavite Posao</v-card-title>
    <v-form
      enctype="multipart/form-data"
      @submit.prevent="publishJob"
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="job.name"
        name="name"
        label="Naslov posla"
        required
      ></v-text-field>

      <v-textarea
        name="description"
        v-model="job.description"
        label="Opis posla"
        hint="Ovdje opisite svoj posao"
      ></v-textarea>

      <template>
        <v-treeview
          :items="services"
          activatable
          dark
          hoverable
          item-key="id"
          open-on-click
          selectable
        ></v-treeview>
      </template>

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
  name: "job-form",
  data: () => ({

    config: {},
    job: {
      title: "",
      description: "",
      service_id: 0,
      user_id: 0,
    },
    services: [],

    valid: true,
    checkbox: false,
  }),

  watch: {

  },

  mounted() {
    this.job.user_id = this.$auth.$state.user.id;
    console.log(this.job);
    this.config = {
      headers: {
        Authorization: this.$auth.strategy.token.get(),
      }
    };

    this.getServices();
  },


  methods: {

    async getServices() {
      await axios.get('http://pzi022022.studenti.sumit.sum.ba/backend/api/services', this.config).then(response => {
        this.services = response.data;
      }).catch(err => {
        console.log(err);
      })
    },

    async publishJob() {
      this.job.service_id = 37;
      await axios.post('http://127.0.0.1:8000/api/jobs', this.job, this.config).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })

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
