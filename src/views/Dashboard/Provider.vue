<template>
  <div>
    <!-- <base-header class="pb-6">
      <b-row align-v="center" class="py-4">
        <b-col lg="6" cols="7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ providerName }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </b-col>
        <b-col lg="6" cols="5" class="text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </b-col>
      </b-row>
    </base-header> -->
    <b-container fluid class="mt-6">
      <b-row v-loading="true" id="loading">
        <b-col xl="12">
          <b-card-group deck>
            <card gradient="default" no-body="">
              <b-card-body>
                <div>
                  <b-row style="text-align-last: center;">
                    <b-col xl="6">
                      <b-row class="mb-2">
                        <b-col xl="12">
                          <sup class="text-white">NAME</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class=" h1 text-white">{{ provider.name }}</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="text-white">DESCRIPITTION</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class=" h1 text-white">{{
                            provider.description
                          }}</sup>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col xl="6">
                      <b-row class="mb-2">
                        <b-col xl="12">
                          <sup class="text-white">STAKE</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="h1 text-white">{{ provider.stake }}</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="text-white">URL</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="h1 text-white">{{
                            provider.call_url
                          }}</sup>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-card-body>
            </card>
          </b-card-group>
        </b-col>

        <b-col xl="12" v-if="indexersList && indexersList.length > 0">
          <b-card no-body class="bg-default shadow">
            <b-card-header class="bg-transparent border-0">
              <h3 class="mb-0 text-white">{{ provider.name }} table</h3>
            </b-card-header>
            <el-table
              class="table-responsive table-dark"
              header-row-class-name="thead-dark"
              :data="indexersList"
              @row-dblclick="fn_rowClick"
            >
              <el-table-column
                label="INDEXER"
                filter-placement="The Indexer's address or Name System."
                min-width="310px"
                prop="name"
                sortable
                :render-header="renderPhaseHeader"
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
                      <span
                        class="font-weight-600 name mb-0 text-sm"
                        @click="fn_rowClick(row)"
                        >{{ row.account_id }}</span
                      >
                    </b-media-body>
                  </b-media>
                </template>
              </el-table-column>

              <el-table-column label="IP" prop="IP" min-width="160px" sortable>
                <template v-slot="{ row }">
                  <span>{{ row.IP }}</span>
                  <button
                    type="primary"
                    v-clipboard:copy="row.IP"
                    v-clipboard:success="onCopy"
                    title=""
                    :data-original-title="row.IP"
                  >
                    <div>
                      <i class="ni ni-single-copy-04"></i>
                      <!-- <span>{{row.IP}}</span> -->
                    </div>
                  </button>
                </template>
              </el-table-column>

              <el-table-column
                label="QUERY FEE CUT"
                prop="budget"
                min-width="160px"
                sortable
                filter-placement="The % of query fee rebates that the Indexer keeps when splitting with Delegators."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="EFFECTIVE REWARD CUT"
                prop="budget"
                min-width="200px"
                sortable
                filter-placement="Indexing Reward Cut applied to the delegation pool. 
  If it's negative, it means that the Indexer is giving away part of their 
  rewards. If it's positive, the Indexer is keeping some of the rewards."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="COOLDOWN REMAINING"
                prop="budget"
                min-width="220px"
                sortable
                filter-placement="Time remaining until the Indexer can update their delegation parameters again. 
	Cooldown periods are set by Indexers when they update their delegation parameters."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="OWNED"
                prop="budget"
                min-width="160px"
                sortable
                filter-placement="The Indexer's deposited stake, which may be slashed for malicious or incorrect behavior."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="DELEGATED"
                prop="budget"
                min-width="160px"
                sortable
                filter-placement="Stake from Delegators which can be allocated by the Indexer, but cannot be slashed."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="ALLOCATED"
                prop="budget"
                min-width="160px"
                sortable
                filter-placement="Stake that Indexers are actively allocating towards the subgraphs they are indexing."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>

              <el-table-column
                label="AVAILABILE"
                prop="budget"
                min-width="220px"
                sortable
                filter-placement=""
                :render-header="renderPhaseHeader"
              >
              </el-table-column>

              <el-table-column
                label="MAX CAPACITY"
                prop="budget"
                min-width="220px"
                sortable
                filter-placement="The maximum amount of delegated stake the Indexer can productively 
	accept. Excess delegated stake cannot be used for allocations or rewards 
	calculations."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="QUERY FEES"
                prop="budget"
                min-width="220px"
                sortable
                filter-placement="The total fees that users have paid for queries from this Indexer over all time."
                :render-header="renderPhaseHeader"
              >
              </el-table-column>
              <el-table-column
                label="Provider REWARDS"
                prop="budget"
                min-width="220px"
                sortable
                filter-placement="The total indexer rewards earned by the Indexer and 
	their Delegators over all time. Indexer rewards are paid through 
	new Massbit Token (MBT) issuance."
                :render-header="renderPhaseHeader"
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
        </b-col>
      </b-row>
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
import { AuthRequest, handleError, Request } from "../../util/Request";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "element-ui";
import { mapGetters } from "vuex";

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
    ...mapGetters({
      proposalList: "proposalList"
    }),
    providerId() {
      return this.$route.params.id;
    },
    provider() {
      return (
        this.proposalList.filter(
          x => x.proposal_id.toString() == this.providerId
        )[0] || {}
      );
    }
  },
  watch: {
    providerId(newValue, oldValue) {
      this.getWorker();
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
      this.$router.push("/indexerDetail/" + row.account_id);
    },
    getWorker: function() {
      this.tbl_loading = true;
      Request()
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
                indexer.imgWrk = this.projects[index % 5].imgWrk;
                indexer.budget = "-";
                this.indexersList.push(indexer);
              }
            }
          }
          this.indexersList = this.indexersList.filter(
            x => x.job_proposal_id.toString() == this.providerId
          );

          this.tbl_loading = false;
        })
        .catch(() => {
          handleError;
          this.tbl_loading = false;
        });
    },
    onCopy() {
      this.$notify({
        type: "primary",
        message: "Copied to clipboard"
      });
    },
    renderPhaseHeader(h, { column }) {
      return h(
        "span",
        {
          class: ""
        },
        [
          column.label + " ",
          h(
            "el-tooltip",
            {
              class: "",
              attrs: {
                content: column.filterPlacement,
                effect: "dark",
                placement: "top-start",
                offset: 2,
                "popper-class": "custom-tooltip"
              }
            },
            [
              h("i", {
                class: "far fa-question-circle"
              })
            ]
          )
        ]
      );
    }
  },
  updated() {
    this.getWorker();
  },
  mounted() {
    this.getWorker();
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
.custom-tooltip {
  color: white;
  background: gray;
  padding: 10px;
  border-radius: 5px;
  max-width: 200px;
}
</style>
