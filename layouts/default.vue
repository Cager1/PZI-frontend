<template>
  <v-app dark>
    <v-app-bar
      app
      color="#FFCF00"
    >
      <div v-if="$auth.$state.loggedIn" >
        <div v-if="$auth.$state.user.role_id === 1">
          <nuxt-link to="/admin/manager">
            <v-btn
              elevation="2"
            >Admin</v-btn>
          </nuxt-link>
        </div>
      </div>

      <div v-if="$auth.$state.loggedIn">
        <nuxt-link  v-if="$auth.$state.user.role_id === 1 || $auth.$state.user.role_id === 2" to="/postjob" >
          <v-btn
            elevation="2"
          >Post a job</v-btn>
        </nuxt-link>
      </div>
      <v-spacer></v-spacer>
      <div v-if="!$auth.$state.loggedIn">
        <nuxt-link to="/login">
          <v-btn
            elevation="2"
          >Prijava</v-btn>
        </nuxt-link>
        <nuxt-link to="/register">
          <v-btn
            elevation="2"
          >Registracija</v-btn>
        </nuxt-link>
      </div>
      <div v-else>
        <logout-button/>
      </div>


    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  auth: false,
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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
  }
}
</script>
