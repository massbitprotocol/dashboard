import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: sessionStorage.getItem("account")
      ? JSON.parse(sessionStorage.getItem("account"))
      : null, //当前账户
    accountList: sessionStorage.getItem("accountList")
      ? JSON.parse(sessionStorage.getItem("accountList"))
      : null, //当前账户
    category: sessionStorage.getItem("category")
      ? JSON.parse(sessionStorage.getItem("category"))
      : [
          {
            ID: 0,
            title: "All",
            count: "(Loading...)"
          }
        ], //项目类别
    selectedCategory: sessionStorage.getItem("selectedCategory")
      ? JSON.parse(sessionStorage.getItem("selectedCategory"))
      : {
          ID: 0,
          title: "All"
        }, //所选项目
    screenWidth: document.body.clientWidth,
    proposalList: []
  },
  getters: {
    account(state) {
      return state.account;
    },
    accountList(state) {
      return state.accountList;
    },
    category(state) {
      return state.category;
    },
    selectedCategory(state) {
      return state.selectedCategory;
    },
    screenWidth(state) {
      return state.screenWidth;
    },
    proposalList(state) {
      return state.proposalList;
    }
  },
  mutations: {
    setAccount(state, val) {
      state.account = val;
      sessionStorage.setItem("account", JSON.stringify(val));
    },
    setAccountList(state, val) {
      state.accountList = val;
      sessionStorage.setItem("accountList", JSON.stringify(val));
    },
    setCategory(state, val) {
      state.category = val;
      sessionStorage.setItem("category", JSON.stringify(val));
    },
    setSelectedCategory(state, val) {
      state.selectedCategory = val;
      sessionStorage.setItem("selectedCategory", JSON.stringify(val));
    },
    logout(state) {
      state.account = null;
      state.accountList = null;
      state.selectedCategory = {
        ID: 0,
        title: "All"
      };
      // 清除sessionStorage
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("accountList");
    },
    setScreenWidth(state, val) {
      state.screenWidth = val;
    },
    setProposals(state, val) {
      state.proposalList = val;
    }
  },
  actions: {
    setAccount(context, val) {
      context.commit("setAccount", val);
    },
    setAccountList(context, val) {
      context.commit("setAccountList", val);
    },
    setCategory(context, val) {
      context.commit("setCategory", val);
    },
    setSelectedCategory(context, val) {
      context.commit("setSelectedCategory", val);
    },
    logout(context) {
      context.commit("logout");
    },
    setScreenWidth(context, val) {
      context.commit("setScreenWidth", val);
    },
    setProposals(context, val) {
      context.commit("setProposals", val);
    }
  }
});
