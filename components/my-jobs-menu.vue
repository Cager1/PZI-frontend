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
            lg="4"
          >

            <v-card style="height: 100%;" extended>

              <v-fab-transition>
                <v-btn
                  @click="deleteItem()"
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
              <v-fab-transition>
                <v-btn
                  @click="editItem(item)"
                  color="primary"
                  fab
                  small
                  absolute
                  top
                  right
                  style="transform: translateX(-150%)"

                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-fab-transition>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <ValidationObserver ref="observer">
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="name"
                              rules="required|max:100"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                :counter="100"
                                :error-messages="errors"
                                label="Ime Posla"
                              ></v-text-field>
                            </ValidationProvider>
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Opis posla"
                              rules="required|max:1000"
                            >
                              <v-text-field
                                v-model="editedItem.description"
                                :counter="1000"
                                :error-messages="errors"
                                label="Opis posla"
                              ></v-text-field>
                            </ValidationProvider>
                          </ValidationObserver>
                          <v-treeview
                            :items="services"
                            selectable
                            selection-type="fix your god damn documentation"
                            selected-color="primary"
                            v-model="editedItem.selection"
                            hoverable
                            item-key="id"
                            open-on-click
                          ></v-treeview>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Odustani
                    </v-btn>
                    <v-btn v-if="formTitle === 'Uredi posao'"
                           color="blue darken-1"
                           text
                           @click="update(item)"
                    >
                      Spremi
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Jeste li sigurni da želite pobrisati ovaj posao?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteJob(item)">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                {{ item.description }}
              </v-card-text>

              <v-card-subtitle>
                {{ item.user.name }} <br>
                {{ item.user.email }}
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
import {setInteractionMode, ValidationObserver, ValidationProvider} from "vee-validate";
setInteractionMode('eager')
export default {
  name: "my-jobs-menu",
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
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

      editedIndex: -1,
      editedName: '',
      editedItem: {
        name: '',
        description: '',
        selection: [37],
      },
      defaultItem: {
        name: '',
        description: '',
        user: '',
      },

      services: [],

      snackbar: false,
      timeout: 2000,
      message: '',
      color: '',

      dialog: false,
      dialogDelete: false,
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Dodaj posao' : 'Uredi posao'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },


  mounted() {
    this.getJobs();
    this.getServices();
  },
  methods: {

    async getServices() {
      await this.$axios.$get('/services', this.config).then(response => {
        this.services = response;
        console.log('Servisi: ');
        console.log(this.services);
      }).catch(err => {
        console.log(err);
      })
    },

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

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    deleteItem () {
      this.dialogDelete = true
    },
    closeDelete () {
      this.dialogDelete = false
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
        this.closeDelete();
      }).catch((err) => {
        console.log(err.response);
        this.message = err.response.message;
        this.color = 'error'
        this.snackbar = true;
        this.closeDelete();
      });

    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedName = item.name
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async update () {

      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await this.$axios.$put('/admin/job/4', this.editedItem, config).then(response => {
        console.log("Posa update: ");
        console.log(response);
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.message = response.message;
        this.color = 'success'
        this.snackbar = true;
        this.getJobs();
      }).catch((err) => {
        console.log(err);
        this.message = err.message;
        this.color = 'error'
        this.snackbar = true;
      });
      this.close()
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
