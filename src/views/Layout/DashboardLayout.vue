<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-shop text-primary'
          }"
        >
          <sidebar-item
            :link="{ name: 'Activity Dashboard', path: '/activityDashboard' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Epochs Dashboard', path: '/epochsDashboard' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Providers',
            icon: 'ni ni-ui-04 text-info'
          }"
          v-if="proposalList"
        >
          <sidebar-item
            v-for="(item, index) in proposalList"
            :key="index"
            :link="{
              name: item.name,
              path: '/provider/' + item.proposal_id
            }"
          />
          <!-- <sidebar-item
            :link="{ name: 'BSC Provider', path: '/provider/BSCProvider' }"
          />
          <sidebar-item
            :link="{ name: 'SOL Provider', path: '/provider/SOLProvider' }"
          /> -->
        </sidebar-item>

        <!-- <sidebar-item
          v-if="!proposalList || proposalList.length == 0"
          :link="{
            name: 'Providers',
            icon: 'ni ni-ui-04 text-info',
            path: '/'
          }"
        >
        </sidebar-item> -->

        <!-- <sidebar-item
          :link="{
            name: 'Indexers',
            icon: 'ni ni-chart-pie-35 text-info',
            path: '/indexers'
          }"
        >
        </sidebar-item> -->

        <sidebar-item
          :link="{
            name: 'Indexers',
            icon: 'ni ni-ui-04 text-info'
          }"
        >
          <sidebar-item
            :link="{ name: 'Substrate', path: '/indexers/substrate' }"
          />
          <sidebar-item :link="{ name: 'Solana', path: '/indexers/solana' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Delegators',
            icon: 'ni ni-map-big text-primary',
            path: '/delegators'
          }"
        >
        </sidebar-item>
      </template>

      <template slot="links-after">
        <hr class="my-3" />

        <!-- <div class="fixed-bottom">
          <div class="dropdown">
            <button v-if="!account" class="border-btn" @click="login">
              {{ $t("Login") }}
            </button>
            <a
              v-if="account"
              v-show="accountDropdownShow"
              :class="['border-btn-logout']"
              @click="logoutAction"
            >
              <span style="color:white">Logout</span>
            </a>
            <a
              v-if="account"
              :class="['border-btn', { open: accountDropdownShow }]"
              @click="accountDropdownShow = !accountDropdownShow"
            >
              <span style="color:white">{{
                webUtil.formatStrByDot(account.address)
              }}</span>
              <img
                style="color:white"
                src="@/assets/img/icon/downward_white.png"
                width="16"
              />
            </a>
          </div>
        </div> -->
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

import { AuthRequest, handleError, Request } from "../../util/Request";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition
  },
  data() {
    return {
      accountDropdownShow: false
    };
  },
  computed: {
    ...mapGetters({
      proposalList: "proposalList"
    })
  },
  methods: {
    ...mapActions(["setCategory", "logout", "setScreenWidth", "setProposals"]),
    logoutAction() {
      this.logout();
      this.accountDropdownShow = false;
    },
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
    isByteArray(array) {
      if (array && array.GetType().Name == "Byte[]") return true;
      return false;
    }
  },
  async mounted() {
    // var data = await Request()
    //   .post("", {
    //     jsonrpc: "2.0",
    //     id: 1,
    //     method: "massbit_getJobProposals",
    //     params: []
    //   })
    //   .then(res => {
    //     var result = res.data.result;
    //     if (result && result.length > 0) {
    //       // this.proposalList = [];
    //       let tmp = [];
    //       for (let index = 0; index < result.length; index++) {
    //         const element = result[index];
    //         if (element.length > 0) {
    //           // for (let k = 0; k < result[index].length; k++) {
    //           //   if (this.isByteArray(result[index][k])) {
    //           //     result[index][k] = String.fromCharCode(...result[index][k]);
    //           //   }
    //           // }
    //           let proposal = {};
    //           proposal.proposer_account_id = element[1];
    //           proposal.proposal_id = element[0];
    //           proposal.name = String.fromCharCode(...element[2]);
    //           proposal.stake = element[3];
    //           proposal.description = String.fromCharCode(...element[4]);
    //           proposal.call_url = String.fromCharCode(...element[5]);
    //           tmp.push(proposal);
    //           // this.proposalList.push(proposal);
    //         }
    //       }

    //       this.setProposals(tmp);
    //     }
    //   })
    //   .catch(handleError);

    this.initScrollbar();
  }
};
</script>
<style scoped>
/*侧边导航*/
.sidebar-container {
  width: 320px;
  float: left;
  color: #5e72e4;
}
.sidebar-container a {
  color: #5e72e4;
}
nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 48px;
  padding: 12px 16px;
  font: bold 16px/24px var(--familyMedium);
  background: var(--mainColor);
  z-index: 1100;
  display: none;
}
.sidebar {
  background: var(--mainColor);
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1010;
}
.sidebar .logo {
  padding: 17px 24px;
}
.scroll-content {
  height: calc(100% - 186px);
  overflow-y: auto;
  overflow-x: hidden;
}
.scroll-content li {
  padding: 12px 24px;
  font: bold 18px/24px var(--familyMedium);
  cursor: pointer;
}
.scroll-content li img {
  margin-right: 12px;
}
.scroll-content li.active {
  background: var(--blackOp);
  position: relative;
}
.category-title {
  font: bold 14px/16px var(--familyMedium);
  padding: 36px 24px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 24px;
}
.blockchain li {
  padding: 12px 24px 12px 60px;
}
.blockchain li span {
  font-size: 14px;
  margin-left: 4px;
  vertical-align: baseline;
}
.blockchain li.active:before {
  content: "";
  position: absolute;
  left: 24px;
  top: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5e72e4;
}

/*滚动条样式*/

.scroll-content::-webkit-scrollbar {
  width: 6px;
}

.scroll-content::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: var(--whiteOp);
}

.fixed-bottom {
  position: absolute;
  left: 35px;
  right: 0;
  bottom: 0px;
  padding: 12px 24px;
}
.fixed-bottom a {
  display: inline-block;
}
.border-btn {
  /* font: bold 16px/16px var(--familyMedium); */
  color: white;
  background: #5e72e4;
  border: 2px solid #5e72e4;
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  min-width: 100px;
  /* width: 100%; */
  text-align: center;
  margin: 5px;
}
.border-btn-logout {
  /* font: bold 16px/16px var(--familyMedium); */
  background: #f5365c;
  border: 2px solid #f5365c;
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  /* width: 100%; */
  text-align: right;
  margin: 5px;
}
.fixed-bottom img {
  /* margin-right: 16px; */
}
.dropdown {
  position: relative;
  /* margin-bottom: 24px; */
  display: inline-block;
}
.dropdown img {
  margin: 0 0 0 4px;
}
.language {
  margin-bottom: 0;
  font: 700 16px/1 var(--familyMedium);
}
.open img {
  transform: rotate(180deg);
}

.dropdown .dropdown-menu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 246px;
  background: #5e72e4;
  color: #000;
  border-radius: 16px;
  padding: 8px 0;
  z-index: 200;
  text-align: center;
  max-width: 204px;
  font: 700 16px/1.5 var(--familyMedium);
}
.language .dropdown-menu {
  width: 200px;
  left: auto;
  bottom: 32px;
}
.language li {
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
}
.foot-contact a {
  position: relative;
}
.foot-contact .qrcode {
  position: absolute;
  left: 0;
  bottom: 24px;
  display: none;
  opacity: 1;
}
.foot-contact a:hover .qrcode {
  display: block;
}
@media (max-width: 768px) {
  nav {
    display: block;
  }
  nav:after,
  .category-title:after {
    content: "";
    position: absolute;
    z-index: 100;
    bottom: 0;
    left: 16px;
    right: 16px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
  }
  .category-title:after {
    top: 0;
    bottom: auto;
  }
  .sidebar-container {
    width: 100vw;
  }
  .scroll-content {
    height: calc(100% - 130px);
    overflow: auto;
  }
  .scroll-content li {
    font-size: 16px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.7);
  }
  .sidebar,
  .sidebar a {
    color: rgba(255, 255, 255, 0.7);
  }
  .scroll-content li img {
    opacity: 0.7;
  }
  .category-title {
    padding: 24px 16px 12px;
    border: none;
    position: relative;
    color: #5e72e4;
  }
  .category-title a {
    color: #5e72e4;
  }
  .tabs li {
    padding: 12px 16px;
  }
  .blockchain li {
    padding-left: 52px;
  }
  .login-container {
    left: 0;
    padding: 16px;
  }
  .fixed-bottom {
    padding: 12px 16px 34px;
  }
  .fixed-bottom a {
    color: #5e72e4;
  }
}
</style>
