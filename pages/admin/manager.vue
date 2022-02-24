<template>
  <div>
    <users-table/>
    <roles-table/>
  </div>

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

</style>
