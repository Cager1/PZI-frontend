<template>
  <v-container>
    <users-table/>
    <roles-table/>
    <jobs-table/>
  </v-container>

</template>

<script>
import Create from "@/components/roles-crud/create-role";
import CreateRole from "@/components/roles-crud/create-role";
import RolesTable from "@/components/roles-crud/roles-table";
export default {
  name: "manager",
  components: {RolesTable, CreateRole, Create},
  middleware({ redirect, $auth }) {

    const role = $auth.$state.user.role_id;
    if (role === 1) {
    } else {
      redirect("/");
    }
  },
}
</script>

<style scoped>
td {
  background-color: #3f51b5;
}
</style>
