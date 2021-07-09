<template>
  <div>
    <b-container fluid class="mt-6">
      <b-row>
        <b-col xl="2">
          <base-button icon type="primary" @click="goBack()">
            <span class="btn-inner--icon"><i class="ni ni-bold-left"></i></span>
            <span class="btn-inner--text">Back</span>
          </base-button>
        </b-col>
        <b-col class="text-center" xl="8">
          <h1>Indexer: {{ indexerId }}</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col xl="12">
          <Tabs :centered="true" @tab-click="handleClick">
            <Tab ref="tabOverview" label="Overview" title="Overview">
              <overview-tab
                @goToIndexing="goToIndexing"
                @goToDelegating="goToDelegating"
              />
            </Tab>
            <Tab ref="tabIndexing" title="Indexing">
              <index-tab />
            </Tab>
            <Tab ref="tabDelegating" title="Delegating">
              <delegating-tab />
            </Tab>
          </Tabs>
        </b-col>
      </b-row>
      <!--End Widgets-->
    </b-container>
  </div>
</template>
<script>
// Components
import BaseProgress from "@/components/BaseProgress";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import EpochsTable from "./DashboardTable/EpochsTable";
import Tab from "@/components/Tabs/Tab.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import IndexTab from "./ProviderTab/IndexTab.vue";
import OverviewTab from "./ProviderTab/OverviewTab.vue";
import DelegatingTab from "./ProviderTab/DelegatingTab.vue";

export default {
  components: {
    BaseProgress,
    RouteBreadCrumb,
    EpochsTable,
    Tabs,
    Tab,
    StatsCard,
    IndexTab,
    OverviewTab,
    DelegatingTab
  },
  data() {
    return {};
  },

  computed: {
    indexerId() {
      return this.$route.params.id;
    }
  },
  methods: {
    handleClick(tab, event) {},
    goToIndexing: function() {
      this.$refs.tabOverview.active = false;
      this.$refs.tabDelegating.active = false;
      this.$refs.tabIndexing.active = true;
    },
    goToDelegating: function() {
      this.$refs.tabOverview.active = false;
      this.$refs.tabIndexing.active = false;
      this.$refs.tabDelegating.active = true;
    },
    goBack: function() {
      window.history.go(-1);
    }
  },
  updated() {
    this.$refs.tabOverview.active = true;
    this.$refs.tabIndexing.active = false;
    this.$refs.tabDelegating.active = false;
  }
};
</script>
<style></style>
