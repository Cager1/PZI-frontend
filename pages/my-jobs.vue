<template>
  <my-jobs-menu/>
</template>

<script>
export default {
  name: "my-jobs",
  middleware({ redirect, $auth }) {

    const role = $auth.$state.user.role_id;
    if (role === 2 || role === 1) {
    } else if (!$auth.$state.loggedIn) {
      redirect("/login");
    } else {
      redirect("/");
    }
  },
}
</script>

<style scoped>

</style>
