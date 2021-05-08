<template>
  <b-card no-body class="bg-default shadow">
    <b-card-header class="bg-transparent border-0">
      <h3 class="mb-0 text-white">Indexer table</h3>
    </b-card-header>

    <el-table
      class="table-responsive table-dark"
      header-row-class-name="thead-dark"
      :data="indexersList"
      @row-click="fn_rowClick"
    >
      <el-table-column
        label="INDEXER ID"
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
                row.account_id
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="IP" prop="IP" min-width="160px" sortable>
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
      <el-table-column label="OWNED" prop="budget" min-width="160px" sortable>
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
        label="INDEXER REWARDS"
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
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import projects from "../../Tables/projects";
import users from "../../Tables/users";
import LightTable from "../../Tables/RegularTables/LightTable";
import TranslucentTable from "../../Tables/RegularTables/TranslucentTable";
import DarkTable from "../../Tables/RegularTables/DarkTable";

import { AuthRequest, handleError, Request } from "../../../util/Request";
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
      currentPage: 1,
      indexersList: []
    };
  },
  methods: {
    fn_rowClick: function(row) {
      this.$router.push("/indexerDetail/" + row.indexer);
    }
  },
  async mounted() {
    var data = await Request()
      .post("", {
        jsonrpc: "2.0",
        id: 1,
        method: "massbit_getWorkers",
        params: []
      })
      .then(res => {
        var result = res.data.result;

        if (result && result.length > 0) {
          this.indexersList = [];
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if (element.length > 0) {
              let indexer = {};
              indexer.worker_id = element[0];
              indexer.IP = String.fromCharCode(...element[1]);
              indexer.account_id = element[2];
              indexer.status = element[3];
              indexer.job_proposal_id = element[4];
              indexer.imgWrk = this.projects[index].imgWrk;
              this.indexersList.push(indexer);
            }
          }
        }

        // console.log(result);
        // console.log(this.indexersList);
      })
      .catch(handleError);
    // console.log(data);
  }
};
</script>
<style scope>
.media-body {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-dark tbody .cell {
  color: #f8f9fe;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}
</style>
