<template
  ><b-card no-body class="bg-default shadow">
    <b-card-header class="bg-transparent border-0">
      <h3 class="mb-0 text-white">Delegator table</h3>
    </b-card-header>

    <el-table
      class="table-responsive table-dark"
      header-row-class-name="thead-dark"
      :data="projects"
      @row-click="fn_rowClick"
    >
      <el-table-column label="DELEGATOR" min-width="310px" prop="name" sortable>
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
        label="INDEXERS DELEGATING"
        prop="budget"
        sortable
        min-width="190px"
      >
        <div class="avatar-group">
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Ryan Tompson"
          >
            <img alt="Image placeholder" src="img/theme/bootstrap.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Romina Hadid"
          >
            <img alt="Image placeholder" src="img/theme/angular.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Alexander Smith"
          >
            <img alt="Image placeholder" src="img/theme/sketch.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Jessica Doe"
          >
            <img alt="Image placeholder" src="img/theme/react.jpg" />
          </a>
        </div>
      </el-table-column>

      <el-table-column
        label="ORIGINAL DELEGATION"
        prop="budget"
        min-width="220px"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="TOTAL UNREALIZED REWARDS"
        prop="budget"
        min-width="250px"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="TOTAL REALIZED REWARDS"
        prop="budget"
        min-width="220px"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="TOTAL DELEGATION"
        prop="budget"
        min-width="220px"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="LAST DELEGATED AT"
        prop="createdAt"
        min-width="220px"
        sortable
      >
      </el-table-column>
      <!-- 
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
          </el-table-column> -->
    </el-table>
  </b-card>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import projects from "../../Tables/projects";
import users from "../../Tables/users";
import LightTable from "../../Tables/RegularTables/LightTable";
import TranslucentTable from "../../Tables/RegularTables/TranslucentTable";
import DarkTable from "../../Tables/RegularTables/DarkTable";
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
  data() {
    return {
      projects,
      users,
      currentPage: 1
    };
  },
  methods: {
    fn_rowClick: function(row) {
      this.$router.push("/indexerDetail/" + row.account_id);
    }
  }
};
</script>

<style scope>
.text-sm {
  cursor: pointer;
}
.table-dark tbody .cell {
  color: #f8f9fe;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
}
</style>
