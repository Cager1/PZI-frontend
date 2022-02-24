<template>

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
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pretraži"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar-title>
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
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Ime i Prezime"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.password"
                      label="Šifra"
                    ></v-text-field>
                    <v-text-field
                    v-model="editedItem.password_confirmation"
                    label="Potvrdite Šifru"
                  ></v-text-field>
                    <v-select
                      :items="roles_names"
                      v-model="selected_role"
                      label="Uloga"
                    ></v-select>
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
    </template></v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "users-table",
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
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await axios.get('http://127.0.0.1:8000/api/admin/roles', config).then(response => {
        const roles = response.data;
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
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await axios.get('http://127.0.0.1:8000/api/admin/users', config).then(response => {
        console.log(response);
        const users = response.data[0];
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
      await axios.delete('http://127.0.0.1:8000/api/admin/users/' + this.items[this.editedIndex].email, config).then(response => {
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

    async save () {
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
      await axios.post('http://127.0.0.1:8000/api/register', this.editedItem, config).then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
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
      await axios.put('http://127.0.0.1:8000/api/admin/users/' + this.editedEmail, this.editedItem, config).then(response => {
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
