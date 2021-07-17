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
      <el-table-column label="id" prop="id" min-width="220px" sortable>
      </el-table-column>
      <el-table-column label="name" prop="name" min-width="220px" sortable>
      </el-table-column>
      <el-table-column
        label="network"
        prop="network"
        min-width="220px"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="description"
        prop="description"
        min-width="220px"
        sortable
      >
      </el-table-column>
      <el-table-column label="repo" prop="repo" min-width="220px" sortable>
      </el-table-column>
      <el-table-column label="status" prop="status" min-width="220px" sortable>
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
import { INDEX_MANAGER_URL } from "../../../util/Constants";

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
  props: {
    indexerName: {
      type: String,
      default: "solana"
    }
  },
  watch: {
    indexerName(newValue, oldValue) {
      this.getDataWithChain();
    }
  },
  data() {
    return {
      projects,
      users,
      currentPage: 1,
      indexersList: [],
      tbl_loading: true
    };
  },
  methods: {
    fn_rowClick: function(row) {
      this.$router.push("/indexerDetail/" + row.name);
    },
    async getDataWithChain() {
      console.log(this.indexerName);

      this.$loading(true);

      // await Request()
      //   .get("/mock/indexer-list")
      //   .then(res => {
      //     var result = res.data.payload;
      //     console.log(result);
      //     if (result && result.length > 0) {

      //       this.indexersList = result;
      //       this.indexersList = this.indexersList.filter(
      //         x =>
      //           x.network.toString().toLowerCase() ==
      //           this.indexerName.toLowerCase()
      //       );
      //     }
      //     this.tbl_loading = false;
      //   })
      await Request()
        .post(INDEX_MANAGER_URL, {
          jsonrpc: "2.0",
          id: 1,
          method: "index_list",
          params: []
        })
        .then(res => {
          var result = res.data.result;
          if (result && result.length > 0) {
            this.indexersList = result;
            this.indexersList = this.indexersList.filter(
              x =>
                x.network.toString().toLowerCase() ==
                this.indexerName.toLowerCase()
            );
          }

          this.tbl_loading = false;
        })
        .catch(handleError)
        .finally(() => {
          this.$loading(false);
        });
    }
  },
  mounted() {
    this.getDataWithChain();
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
  max-width: 200px;
}
</style>
