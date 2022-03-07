<template>
  <v-container>

    <register-form/>

  </v-container>
</template>

<script>
export default {
  name: "register",
  auth: 'guest',
}
</script>

<style scoped>

#cen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
