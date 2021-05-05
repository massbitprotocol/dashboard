<template>
  <router-view></router-view>
</template>

<script>
import { web3Accounts } from "@polkadot/extension-dapp";
export default {
  components: {},
  data() {
    return {
      hasSidebar: true
    };
  },
  created() {
    web3Accounts();
  }
};
</script>
