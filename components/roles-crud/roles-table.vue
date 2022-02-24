<template>

  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Uloge</v-toolbar-title>
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
              Nova Uloga
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
                      label="Ime Uloge"
                    ></v-text-field>
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
              <v-btn v-if="formTitle === 'Dodaj ulogu'"
                color="blue darken-1"
                text
                @click="save"
              >
                Spremi
              </v-btn>
              <v-btn v-if="formTitle === 'Uredi ulogu'"
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
        @click="getRoles"
      >
        Reset
      </v-btn>
    </template></v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "roles-table",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Uloga",
        value: "name",
        align: "start",
      },
      {text: "Korisnika", value: 'amount'},
      {text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedName: '',
    editedItem: {
      name: '',
      amount: 0,
    },
    defaultItem: {
      name: '',
      amount: 0,
    },
  }),

  mounted() {
    this.getRoles();
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Dodaj ulogu' : 'Uredi ulogu'
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

    async getRoles() {
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        }
      };
      await axios.get('http://127.0.0.1:8000/api/admin/roles', config).then(response => {
        const roles = response.data;
        for (let i = 0; i < roles.length; i++) {
          let column = {name: roles[i].name, amount: 0,};
          this.items.push(column);
        }

      }).catch((err) => {
        console.log(err);
      });

      await axios.get('http://127.0.0.1:8000/api/admin/users', config).then(response => {
        console.log(response);
        const users = response.data[0];

        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < this.items.length; j++) {
            if (users[i].role.name === this.items[j].name) {
              this.items[j].amount++;
            }
          }
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
      await axios.delete('http://127.0.0.1:8000/api/admin/roles/' + this.items[this.editedIndex].name, config).then(response => {
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
      await axios.post('http://127.0.0.1:8000/api/admin/roles', this.editedItem, config).then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
      this.close()
    },

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
      await axios.put('http://127.0.0.1:8000/api/admin/roles/' + this.editedName, this.editedItem, config).then(response => {
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
