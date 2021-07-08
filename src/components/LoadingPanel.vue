<template>
  <b-row v-loading="true" id="loading"></b-row>
</template>
<script>
import Vue from 'vue';
import { Loading } from 'element-ui';

Vue.use(Loading.directive);
export default {};
</script>
<style>
#loading {
  min-height: 200px;
  display: flex;
  align-items: center;
  color: red !important;
  background: red !important;
}

.el-loading-spinner .path {
  stroke: #66615b !important;
  color: red !important;
  background: red !important;
}

.el-loading-mask {
  background: red !important;
  color: red !important;
}
</style>
