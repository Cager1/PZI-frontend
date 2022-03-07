<template>
  <v-container>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            lg="6"
          >

            <v-card style="height: 100%;" extended>

                <v-fab-transition>
                  <v-btn
                    @click="deleteJob(item)"
                    color="primary"
                    fab
                    small
                    absolute
                    top
                    right

                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-fab-transition>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                {{ item.description }}
              </v-card-text>

              <v-card-subtitle>
                {{ item.user.name }}
              </v-card-subtitle>
              <v-card-subtitle>
                {{ item.datum }}
              </v-card-subtitle>
              <v-divider></v-divider>

              <div>
                <v-chip
                  v-for="chip in item.services_names"
                  :key="chip"
                  style="margin: 2px"
                >
                  {{ chip }}
                </v-chip>
              </div>
              <!--              <v-list dense>-->
              <!--                <v-list-item-->
              <!--                  v-for="(key, index) in filteredKeys"-->
              <!--                  :key="index"-->
              <!--                >-->
              <!--                  <v-list-item-content :class="{ 'blue&#45;&#45;text': sortBy === key }">-->
              <!--                    {{ key }}:-->
              <!--                  </v-list-item-content>-->
              <!--                  <v-list-item-content-->
              <!--                    class="align-end"-->
              <!--                    :class="{ 'blue&#45;&#45;text': sortBy === key }"-->
              <!--                  >-->
              <!--                    {{ item[key.toLowerCase()] }}-->
              <!--                  </v-list-item-content>-->
              <!--                </v-list-item>-->
              <!--              </v-list>-->
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
    <v-snackbar outlined multi-line :color="color" v-model="snackbar" :timeout="timeout" content-class="text-center">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "my-jobs-menu",
  data () {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      keys: [
        'Datum',
      ],
      items: [
      ],

      snackbar: false,
      timeout: 2000,
      message: '',
      color: '',
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    },
  },

  mounted() {
    this.getJobs();
  },
  methods: {

    async getJobs() {
      this.items = [];
      let jobs;
      await this.$axios.$get("/user/" + this.$auth.$state.user.id).then(response => {
        jobs = response.jobs;
      })
      const user = this.$auth.$state.user;
      console.log("Jobs: ");
      console.log(jobs);
      for (let i = 0; i < jobs.length; i++) {
        let id = jobs[i].id
        let serv;
        await this.$axios.$get('/job/' + id).then(response => {
          serv = response.services;
          console.log(serv);
        }).catch((err) => {
          console.log(err);
        });

        jobs[i]['datum'] = jobs[i]['created_at'];
        let dat = new Date(jobs[i].datum);
        let time = new Date(jobs[i].datum);
        jobs[i].datum = dat.toLocaleDateString('hr-HR') + " " + time.toLocaleTimeString('hr-HR');
        let service_names = [];
        for (let j = 0; j < serv.length; j++) {
          service_names.push(serv[j].name);
        }
        console.log("Services", service_names);
        jobs[i].services_names = service_names;
        jobs[i].user = user;
        this.items.push(jobs[i]);
      }
    },

    async deleteJob(item) {
      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      console.log(item);
      await this.$axios.$delete('/job/' + item.id, config).then(response => {
        this.message = response.message;
        this.color = 'success'
        this.snackbar = true;
        this.getJobs();
      }).catch((err) => {
        console.log(err.response);
        this.message = err.response.message;
        this.color = 'error'
        this.snackbar = true;
      });

    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  }
}
</script>

<style scoped>

</style>
