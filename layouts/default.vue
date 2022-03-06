<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >

      <v-row
        align="center"
      >
        <v-col cols="1" class="d-flex d-md-none">
          <v-row>
            <v-menu
              rounded="0"
              offset-y

            >
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="white--text ma-5"
                  v-bind="attrs"
                  v-on="on"
                  text
                  tile
                  x-small
                >
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                >
                  <v-list-item-action class="d-md-none">
                    <nuxt-link to="/" style="text-decoration: none;">
                      <v-btn
                        text
                      >Početna</v-btn>
                    </nuxt-link>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action class="d-md-none">
                    <nuxt-link to="/jobs" style="text-decoration: none;">
                      <v-btn
                        text
                      >Poslovi</v-btn>
                    </nuxt-link>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
                <div v-if="$auth.$state.loggedIn">
                  <v-list-item class="d-md-none">
                    <v-list-item-action>
                      <nuxt-link class="float-end" style="text-decoration: none;" to="/admin/manager">
                        <v-btn
                          text
                        >Admin</v-btn>
                      </nuxt-link>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item class="d-md-none" v-if="$auth.$state.user.role_id === 1 || $auth.$state.user.role_id === 2">
                    <v-list-item-action>
                      <nuxt-link class="float-end" style="text-decoration: none;" to="/postjob" >
                        <v-btn
                          text
                        >Objavi Posao</v-btn>
                      </nuxt-link>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item class="d-md-none" v-if="$auth.$state.user.role_id === 1 || $auth.$state.user.role_id === 2">
                    <v-list-item-action>
                      <nuxt-link class="float-end" style="text-decoration: none;" to="/my-jobs" >
                        <v-btn
                          text
                        >Moji Poslovi</v-btn>
                      </nuxt-link>
                    </v-list-item-action>
                  </v-list-item>
                </div>

              </v-list>
            </v-menu>
          </v-row>

        </v-col>
        <v-col md="3" class="d-none d-md-flex">
          <nuxt-link to="/" style="text-decoration: none;">
            <v-btn

              color="secondary"
              text
            >Početna</v-btn>
          </nuxt-link>
          <nuxt-link to="/jobs" style="text-decoration: none;">
            <v-btn
              color="secondary"
              text
            >Poslovi</v-btn>
          </nuxt-link>
        </v-col>
        <v-spacer class="d-none d-md-flex"></v-spacer>

        <span class="d-none d-md-inline" v-if="$auth.$state.loggedIn" >
          <nuxt-link class="float-end" style="text-decoration: none;" to="/admin/manager">
            <v-btn
              color="secondary"
              text
            >Admin</v-btn>
          </nuxt-link>
        </span>

        <span v-if="$auth.$state.loggedIn">
          <span class="d-none d-md-inline" v-if="$auth.$state.user.role_id === 1 || $auth.$state.user.role_id === 2">
            <nuxt-link class="float-end" style="text-decoration: none;" to="/postjob" >
              <v-btn
                text
                color="secondary"
              >Objavi Posao</v-btn>
            </nuxt-link>
            <nuxt-link class="float-end" style="text-decoration: none;" to="/my-jobs" >
              <v-btn
                text
                color="secondary"
              >Moji Poslovi</v-btn>
            </nuxt-link>

        </span>
        </span>

      </v-row>
      <v-menu
        v-if="$auth.$state.loggedIn"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        style="margin-left: auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
          >
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>

        </template>

        <v-card>
          <v-list>
            <span>
              <v-card-text class="d-inline">
                {{ $auth.$state.user.name}}
              </v-card-text>

            </span>
            <span class="float-end">
              <v-card-text class="d-inline">
                {{ $auth.$state.user.role.name }}
              </v-card-text>
            </span>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text @click="$auth.logout(); menu = false;">Odjavite se</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="menu = false"
            >
              Izađi
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <span class="float-end" v-if="!$auth.$state.loggedIn">
          <nuxt-link to="/login" style="text-decoration: none;">
            <v-btn
              text
              color="secondary"
            >Prijava</v-btn>
          </nuxt-link>
          <nuxt-link to="/register" style="text-decoration: none;">
            <v-btn
              text
              color="secondary"
            >Registracija</v-btn>
          </nuxt-link>
        </span>

    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Ika Instalacije</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  auth: false,
  data () {
    return {
      clipped: false,
      menu: false,
      drawer: false,
      fixed: false,
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },

  mounted() {
    if (this.$auth.loggedIn) {
      console.log(this.$auth)
    }
  },

  methods: {

  }
}
</script>
