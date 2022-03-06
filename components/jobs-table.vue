<template>

  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1 my-table"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Poslovi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pretraži"
          single-line
          hide-details
        ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
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
                    sm="6"
                    md="4"
                  >
                    <ValidationObserver ref="observer">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Ime posla"
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
                     @click="update"
              >
                Spremi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getJobs"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import {setInteractionMode, ValidationObserver, ValidationProvider} from "vee-validate";
setInteractionMode('eager')
export default {
  name: "jobs-table",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    components: {
      ValidationObserver: ValidationObserver,
      ValidationProvider: ValidationProvider
    },

    search: '',
    headers: [
      {
        text: "Posao",
        value: "name",
        align: "start",
      },
      {text: "ID", value: 'id', align: ' d-none',},
      {text: "Opis", value: 'description', width: '20%'},
      {text: "Korisnik", value: 'user'},
      {text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedName: '',
    editedItem: {
      name: '',
      description: '',
    },
    defaultItem: {
      name: '',
      description: '',
      user: '',
    },
  }),

  mounted() {
    this.getJobs();
  },

  computed: {
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

  methods: {
    async getJobs() {
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      let jobs;
      await axios.get('http://pzi022022.studenti.sumit.sum.ba/backend/api/jobs', config).then(response => {
        jobs = response.data;
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      });

      for (let i = 0; i < jobs.length; i++) {
        let name;
        let id = jobs[i].user_id
        await axios.get('http://pzi022022.studenti.sumit.sum.ba/backend/api/user/' + id, config).then(response => {
          name = response.data.name;
        }).catch((err) => {
          console.log(err);
        });
        let column = {
          name: jobs[i].name,
          ID: jobs[i].id,
          description: jobs[i].description,
          user: name,
        };
        this.items.push(column);
      }
    },


    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await axios.delete('http://pzi022022.studenti.sumit.sum.ba/backend/api/admin/job/' + this.items[this.editedIndex].ID, config).then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // async save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.items[this.editedIndex], this.editedItem)
    //   } else {
    //     this.items.push(this.editedItem)
    //   }
    //   const config =  {
    //     headers: {
    //       Authorization: this.$auth.strategy.token.get(),
    //     }
    //   };
    //   await axios.post('http://127.0.0.1:8000/api/job', this.editedItem, config).then(response => {
    //     console.log(response);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    //   this.close()
    // },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedName = item.name
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async update () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await axios.put('http://pzi022022.studenti.sumit.sum.ba/backend/api/admin/job/' + this.editedItem.ID, this.editedItem, config).then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
      this.close()
    },
  }
}
</script>

<style scoped>
</style>
