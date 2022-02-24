<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: 'InspirePage',
  middleware({ redirect, $auth }) {

    const role = $auth.$state.user.role_id;
    if (role === 1) {
    } else {
      redirect("/register");
    }
  }
}
</script>
