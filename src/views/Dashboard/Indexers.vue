<template>
  <div>
    <base-header class="pb-2">
      <b-row align-v="center" class="py-4">
        <b-col lg="6" cols="7">
          <h6 class="h2 text-white d-inline-block mb-0">
            {{ chain }} Indexers
          </h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav> -->
        </b-col>
        <b-col lg="6" cols="5" class="text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button> -->

          <base-button size="xl" type="neutral" @click="create"
            >Create New {{ chain }} Indexer</base-button
          >
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt-3" >
      <indexers-table />
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import projects from "../Tables/projects";
import users from "../Tables/users";
import IndexersTable from "./DashboardTable/IndexersTable";

export default {
  components: {
    RouteBreadCrumb,
    IndexersTable
  },
  computed: {
    chain() {
      return this.$route.params.chain;
    }
  },
  data() {
    return {
      projects,
      users,
      currentPage: 1
    };
  },
  methods: {
    create: function() {
      this.$router.push("/createIndexer/" + this.chain);
    },
    isByteArray(array) {
      if (array && array.length > 0) return true;
      return false;
    }
  }
};
</script>
