<template>
  <v-card
    elevation="24"
    shaped
    style="padding:20px;"
  >
    <v-card-title>Objavite Posao</v-card-title>
    <ValidationObserver ref="observer">
      <v-form
        enctype="multipart/form-data"
        @submit.prevent="publishJob"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="name"
          rules="required|max:100"
        >
          <v-text-field
            v-model="job.name"
            :counter="100"
            :error-messages="errors"
            name="name"
            label="Naslov posla"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="description"
          rules="required|max:1000"
        >
          <v-textarea
            name="description"
            v-model="job.description"
            :counter="1000"
            :error-messages="errors"
            label="Opis posla"
            hint="Ovdje opišite svoj posao"
          ></v-textarea>
        </ValidationProvider>

        <v-treeview
          :items="services"
          selectable
          v-model="job.selection"
          hoverable
          item-key="id"
          open-on-click
        ></v-treeview>
        <v-btn
          class="mr-4"
          type="submit"
        >
          Objavi
        </v-btn>
        <v-btn @click="clear">
          Očisti
        </v-btn>
      </v-form>
    </ValidationObserver>

    <v-snackbar outlined multi-line :color="color" v-model="snackbar" :timeout="timeout" content-class="text-center">
      {{ message }}
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from "axios";
import {setInteractionMode, ValidationObserver, ValidationProvider} from "vee-validate";
setInteractionMode('eager')
export default {
  name: "job-form",
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data: () => ({

    config: {},
    job: {
      title: "",
      description: "",
      selection:[],
      user_id: 0,
    },
    services: [],

    snackbar: false,
    timeout: 2000,
    message: '',
    color: 'success',
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
      await this.$axios.$get('/services', this.config).then(response => {
        this.services = response;
        console.log(this.services);
      }).catch(err => {
        console.log(err);
      })
    },

    async publishJob() {
      this.job.service_id = 37;
      await this.$axios.$post('/job', this.job, this.config).then(response => {
        console.log(response);
        this.message = 'Posao uspiješno objavljen.';
        this.color = 'success';
        this.snackbar = true;
        this.clear();
      }).catch(err => {
        console.log(err.response)
        this.errors = err.response.errors;
        console.log(this.errors);
        for (const error in this.errors) {
          this.errors[error][0]= this.errors[error][0].charAt(0).toUpperCase() + this.errors[error][0].slice(1);
        }
        for (const error in this.errors) {
          this.$refs.observer.errors[error].push(this.errors[error][0]);
        }
        this.message = 'Objavljivanje posla nauspjesno';
        this.color = 'error'
        this.snackbar = true;
      })

    },

    clear() {
      this.job.title = '';
      this.job.description = '';
      this.job.selection = [];
    }


  },
}
</script>

<style scoped>

</style>
