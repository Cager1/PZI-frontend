<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            Korisnici
          </v-toolbar-title>
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
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Novi Korisnik
              </v-btn>
            </template>
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
                      md="12"
                    >
                      <ValidationObserver
                        ref="observer"
                      >
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Ime i prezime"
                          rules="required|max:100"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            :counter="100"
                            :error-messages="errors"
                            label="Ime i Prezime"
                            required
                          ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider
                          v-slot="{ errors }"
                          name="email"
                          rules="required|email"
                        >
                          <v-text-field
                            v-model="editedItem.email"
                            type="email"
                            :error-messages="errors"
                            label="E-mail"
                            required
                          ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider name="Zaporka" rules="min:6|required|confirmed:confirmation" v-slot="{ errors }">
                          <v-text-field
                            v-model="editedItem.password"
                            type="password"
                            :error-messages="errors"
                            label="Zaporka"
                          ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider rules="min:6|required" name="Potvrda zaporke" vid="confirmation" v-slot="{ errors }">
                          <v-text-field
                            v-model="editedItem.password_confirmation"
                            type="password"
                            :error-messages="errors"
                            label="Potvrda zaporke"
                          ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider name="Uloga">
                          <v-select
                            :items="roles_names"
                            v-model="selected_role"
                            label="Uloga"
                          ></v-select>
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
                <v-btn v-if="formTitle === 'Dodaj Korisnika'"
                       color="blue darken-1"
                       text
                       @click="save"
                >
                  Spremi
                </v-btn>
                <v-btn v-if="formTitle === 'Uredi Korisnika'"
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
              <v-card-title class="text-h5">Jeste li sigurni da želite pobristavi ovog korisnika?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Poništi</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Potvrdi</v-btn>
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
          @click="getRoles"
        >
          Reset
        </v-btn>
      </template>

    </v-data-table>
    <v-snackbar outlined multi-line :color="color" v-model="snackbar" :timeout="timeout" content-class="text-center">
      {{ message }}
    </v-snackbar>
  </v-container>

</template>

<script>
import axios from "axios";
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')


export default {
  name: "users-table",
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,

    search: '',

    headers: [
      {
        text: "Korisnik",
        value: "name",
        align: "start",
      },
      {text: "E-Mail", value: 'email'},
      {text: "Uloga", value: 'role'},
      {text: "Kreiran", value: 'created_at'},
      {text: "Podešen", value: 'updated_at'},
      {text: 'Akcije', value: 'actions', sortable: false },
    ],


    roles: [],
    roles_ids: [],
    roles_names: [],
    selected_role: "",

    items: [],
    editedIndex: -1,
    editedEmail: '',
    editedItem: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: 0,
    },
    defaultItem: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: 3,
    },

    snackbar: false,
    timeout: 2000,
    message: '',
    color: '',


  }),

  mounted() {
    this.getUsers();
    this.getRoles();
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Dodaj Korisnika' : 'Uredi Korisnika'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },

    selected_role: function(val,oldVal) {
      console.log(val);
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].name === val) {
          this.editedItem.role_id = this.roles[i].id;
        }
      }
    },
  },

  methods: {

    async getRoles() {
      this.roles = [];
      this.roles_names = [];
      this.roles_ids = [];
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await this.$axios.$get('/admin/roles', config).then(response => {
        const roles = response;
        console.log(roles);
        for (let i = 0; i < roles.length; i++) {
          this.roles.push(roles[i]);
          this.roles_names.push(roles[i].name);
          this.roles_ids.push(roles[i].id);
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    async getUsers() {
      this.items = [];
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await this.$axios.$get('/admin/users', config).then(response => {
        console.log(response);
        const users = response[0];
        for (let i = 0; i < users.length; i++) {
          let cd = new Date(users[i].created_at);
          let cu = new Date(users[i].updated_at);
          let column = {
            name: users[i].name,
            email: users[i].email,
            role: users[i].role.name,
            created_at: cd.toLocaleDateString('hr-HR'),
            updated_at: cu.toLocaleDateString('hr-HR'),
          };
          this.items.push(column);
        }
      }).catch((err) => {
        console.log(err);
      });
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
      await this.$axios.$delete('/admin/users/' + this.items[this.editedIndex].email, config).then(response => {
        this.message = response.message;
        this.color = 'success'
        this.snackbar = true;
        this.getUsers();
        this.getRoles();
      }).catch((err) => {
        this.message = err.message;
        this.color = 'error'
        this.snackbar = true;
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

    async save () {
      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await this.$axios.$post('/admin/register', this.editedItem, config).then(response => {
        console.log(response);
        this.message = 'Uspiješna registracija novog korisnika';
        this.color = 'success';
        this.snackbar = true;
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.getUsers();
        this.getRoles();
      }).catch((err) => {
        console.log(err.response)
        this.errors = err.response.errors;
        console.log(this.errors);
        for (const error in this.errors) {
          this.errors[error][0]= this.errors[error][0].charAt(0).toUpperCase() + this.errors[error][0].slice(1);
        }
        for (const error in this.errors) {
          this.$refs.observer.errors[error].push(this.errors[error][0]);
        }
        this.message = 'Registracija neuspješna';
        this.color = 'error'
        this.snackbar = true;
      });
      this.close()
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedEmail = item.email
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async update () {

      const config =  {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await this.$axios.$put('/admin/users/' + this.editedEmail, this.editedItem, config).then(response => {
        console.log(response);
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.message = response.message;
        this.color = 'success'
        this.snackbar = true;
        this.getUsers();
        this.getRoles();
      }).catch((err) => {
        console.log(err);
        this.message = err.message;
        this.color = 'error'
        this.snackbar = true;
      });
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
