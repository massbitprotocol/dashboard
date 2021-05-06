<template>
  <div>
    <base-header class="pb-6">
      <b-row align-v="center" class="py-4">
        <b-col lg="6" cols="7">
          <h6 class="h2 text-white d-inline-block mb-0">Provider tables</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </b-col>
        <b-col lg="6" cols="5" class="text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--6">
      <b-card no-body class="bg-default shadow">
        <b-card-header class="bg-transparent border-0">
          <h3 class="mb-0 text-white">{{ providerId }} table</h3>
        </b-card-header>

        <el-table
          class="table-responsive table-dark"
          header-row-class-name="thead-dark"
          :data="projects"
          @row-click="fn_rowClick"
        >
          <el-table-column
            label="Provider"
            min-width="310px"
            prop="name"
            sortable
          >
            <template v-slot="{ row }">
              <b-media no-body class="align-items-center">
                <a href="#" class="mr-3">
                  <b-img
                    class="avatar"
                    rounded="circle"
                    alt="Image placeholder"
                    :src="row.imgWrk"
                  />
                </a>
                <b-media-body>
                  <span class="font-weight-600 name mb-0 text-sm">{{
                    row.indexerSort
                  }}</span>
                </b-media-body>
              </b-media>
            </template>
          </el-table-column>

          <el-table-column
            label="QUERY FEE CUT"
            prop="budget"
            min-width="160px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="EFFECTIVE REWARD CUT"
            prop="budget"
            min-width="200px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="COOLDOWN REMAINING"
            prop="budget"
            min-width="220px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="OWNED"
            prop="budget"
            min-width="160px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="DELEGATED"
            prop="budget"
            min-width="160px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="DELEGATED"
            prop="budget"
            min-width="160px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="ALLOCATED"
            prop="budget"
            min-width="160px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="AVAILABILE"
            prop="budget"
            min-width="220px"
            sortable
          >
          </el-table-column>

          <el-table-column
            label="AVAILABILE"
            prop="budget"
            min-width="220px"
            sortable
          >
          </el-table-column>

          <el-table-column
            label="MAX CAPACITY"
            prop="budget"
            min-width="220px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="QUERY FEES"
            prop="budget"
            min-width="220px"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="Provider REWARDS"
            prop="budget"
            min-width="220px"
            sortable
          >
          </el-table-column>

          <el-table-column min-width="180px">
            <template v-slot="{ row }">
              <el-dropdown trigger="click" class="dropdown">
                <span class="btn btn-sm btn-icon-only text-light">
                  <i class="fas fa-ellipsis-v mt-2"></i>
                </span>
                <el-dropdown-menu
                  class="dropdown-menu dropdown-menu-arrow show"
                  slot="dropdown"
                >
                  <b-dropdown-item>Delegate</b-dropdown-item>
                  <b-dropdown-item>Undelegate</b-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import projects from "../Tables/projects";
import users from "../Tables/users";
import LightTable from "../Tables/RegularTables/LightTable";
import TranslucentTable from "../Tables/RegularTables/TranslucentTable";
import DarkTable from "../Tables/RegularTables/DarkTable";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "element-ui";

export default {
  components: {
    LightTable,
    TranslucentTable,
    DarkTable,
    RouteBreadCrumb,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },

  computed: {
    providerId() {
      return this.$route.params.id;
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
    fn_rowClick: function(row) {
      this.$router.push("/indexerDetail/" + row.indexer);
    }
  }
};
</script>
