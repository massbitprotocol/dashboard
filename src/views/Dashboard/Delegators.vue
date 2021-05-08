<template>
  <div>
    <base-header class="pb-6">
      <b-row align-v="center" class="py-4">
        <b-col lg="6" cols="7">
          <h6 class="h2 text-white d-inline-block mb-0">Delegators tables</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav> -->
        </b-col>
        <b-col lg="6" cols="5" class="text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--6">
      <!-- <delegate-table /> -->
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import projects from "../Tables/projects";
import users from "../Tables/users";
import DelegateTable from "./DashboardTable/DelegateTable.vue";

import { AuthRequest, handleError, Request } from "../../util/Request";

export default {
  components: { DelegateTable, RouteBreadCrumb },
  data() {
    return {
      projects,
      users,
      currentPage: 1
    };
  },
  async mounted() {
    var data = await Request()
      .post("", {
        jsonrpc: "2.0",
        id: 1,
        method: "massbit_getWorkers",
        params: []
      })
      .then(res => {})
      .catch(handleError);
  },
  methods: {
    fn_rowClick: function(row) {
      this.$router.push("/indexerDetail/" + row.account_id);
    }
  }
};
</script>
