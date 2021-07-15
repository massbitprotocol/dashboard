<template>
  <div>
    <base-header class="pb-2">
      <b-row align-v="center" class="py-4">
        <b-col lg="6" cols="7">
          <h6 class="h2 text-white d-inline-block mb-0">
            Create {{ chain }} Indexers
          </h6>
        </b-col>
        <b-col lg="6" cols="5" class="text-right"> </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt-6">
      <b-row>
        <b-col cols="9">
          <base-input
            label="Substrate Indexer Name"
            rules="required"
            name="Substrate Indexer Name"
            placeholder="Fill Your Indexer Name "
            v-model="table"
          >
          </base-input>
        </b-col>
        <b-col cols="9">
          <Tabs :centered="false">
            <Tab ref="project" title="project.yaml">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="project"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab>
            <Tab ref="up" title="up.sql">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="up"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab>
            <Tab ref="mapping" title="mapping.rs">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="mapping"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab>
            <Tab ref="models" title="models.rs">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="models"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab>
            <!-- <Tab ref="schema" title="schema.rs">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="schema"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab> -->
          </Tabs>
        </b-col>
        <b-col cols="3" class="text-center" style="place-self: center;">
          <b-col cols="12">
            <base-button size="xl" type="success" @click="loadDefaultTemp"
              >Load Default Template</base-button
            >
          </b-col>
          <b-col cols="12" class="mt-6">
            <base-button size="xl" type="success" @click="onProcess('compile')"
              >Compile code</base-button
            >
          </b-col>
          <b-col v-if="compilation_id" cols="12" class="mt-6">
            <base-button size="xl" type="default" @click="onProcess('deploy')"
              >Deploy Your Compile File</base-button
            >
          </b-col>
        </b-col>
        <b-col v-if="compileLog" cols="12" class=" pt-3">
          <h1>Log compile</h1>
          <div class="my-editor log-editor">
            <p>{{ covertToString(compileLog) }}</p>
          </div>
        </b-col>
        <b-col v-if="compilation_id" cols="12" class=" pt-3">
          <h1>Table Data</h1>
        </b-col>
        <b-col cols="12" class="text-center pt-3" style="place-self: center;">
          <iframe
            width="100%"
            height="700px"
            src="http://localhost:8080/console"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import Tab from "@/components/Tabs/Tab.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import { handleError, Request } from "../../util/Request";
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";

import { LOCAL_STORE } from "../../util/Constants";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    RouteBreadCrumb,
    PrismEditor,
    Tabs,
    Tab
  },
  computed: {
    chain() {
      return this.$route.params.chain;
    }
  },
  mounted() {
    this.mapping = localStorage.getItem(LOCAL_STORE.MAPPING);
    this.models = localStorage.getItem(LOCAL_STORE.MODELS);
    this.project = localStorage.getItem(LOCAL_STORE.PROJECT);
    this.up = localStorage.getItem(LOCAL_STORE.UP);
    this.table = localStorage.getItem(LOCAL_STORE.TABLE);
    this.compilation_id = localStorage.getItem(LOCAL_STORE.COMPILE);
  },
  beforeUpdate() {
    this.catchData();
  },
  beforeDestroy() {
    this.catchData();
  },
  data() {
    return {
      currentPage: 1,
      is: 1,
      compileLog: null,
      compilation_id: "",
      mapping: "",
      models: "",
      project: "",
      up: "",
      table: ""
    };
  },
  methods: {
    loadDefaultTemp: function() {
      this.mapping = DEFAULT_TEMPLATE.MAPPING;
      this.models = DEFAULT_TEMPLATE.MODELS;
      this.up = DEFAULT_TEMPLATE.UP;
      this.table = DEFAULT_TEMPLATE.TABLE;
      this.project = DEFAULT_TEMPLATE.PROJECT;
      this.compilation_id = "";
    },
    catchData() {
      localStorage.setItem(LOCAL_STORE.MAPPING, this.mapping);
      localStorage.setItem(LOCAL_STORE.MODELS, this.models);
      localStorage.setItem(LOCAL_STORE.PROJECT, this.project);
      localStorage.setItem(LOCAL_STORE.UP, this.up);
      localStorage.setItem(LOCAL_STORE.TABLE, this.table);
      localStorage.setItem(LOCAL_STORE.COMPILE, this.compilation_id);
    },
    isByteArray(array) {
      if (array && array.length > 0) return true;
      return false;
    },
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    async onProcess(action) {
      this.$loading(true);

      await Request()
        .post(`/${action}`, {
          "mapping.rs": this.covertToURL(this.mapping),
          "models.rs": this.covertToURL(this.models),
          // "schema.rs": this.covertToURL(this.schema),
          "project.yaml": this.covertToURL(this.project),
          "up.sql": this.covertToURL(this.up),
          table: this.table,
          // compilation_id: "d4b6b98121972be58b5b158757bfc35c"
          compilation_id: this.compilation_id
        })
        .then(async res => {
          if (res.data.payload && res.data.payload.length > 0) {
            this.compilation_id = res.data.payload;
            await this.runGetProcess(true, res.data.payload, 100000, action);
          } else if (res.data.status == "success") {
            this.$successAlert({
              text: "Deploy Success"
            });
          }
        })
        .catch(handleError);
      this.$loading(false);
    },

    runGetProcess(isRun, requestId, noEvolution, action) {
      var _this = this;

      _this.$loading(true);
      console.log(requestId);
      if (!requestId) {
        _this.stopProcess();
      }
      this.uploadProgressResquestID = requestId;
      if (isRun) {
        var isRunNext = true;
        var _this = this;
        Request()
          .get(`/${action}/status/${requestId}`)
          .then(res => {
            console.log(res);
            if (res.status != 200) {
              return;
            }
            if (res.data.status == "success") {
              _this.$successAlert({
                text: "Compile Success"
              });
              _this.compileLog = res.data.payload;
              isRunNext = false;
              _this.stopProcess();
            }
          })
          .catch(handleError);
        setTimeout(function() {
          _this.runGetProcess(isRunNext, requestId, noEvolution, action);
        }, 2000);
      } else {
        _this.stopProcess();
        _this.$loading(false);
      }
    },
    stopProcess() {
      var _this = this;
      setTimeout(function() {
        _this.$loading(false);
      }, 1000);
    },

    covertToURL(code) {
      return encodeURI(code);
    },
    covertToString(code) {
      return decodeURI(code);
    }
  }
};

const DEFAULT_TEMPLATE = {
  MAPPING:
    "use crate::models::Blockts52;\n" +
    "use massbit_chain_substrate::data_type::SubstrateBlock;\n" +
    "\n" +
    "pub fn handle_block(block: &SubstrateBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    let block_ts = Blockts52 {\n" +
    "        block_hash: block.header.hash().to_string(),\n" +
    "        block_height: block.header.number as i64,\n" +
    "    };\n" +
    "    block_ts.save();\n" +
    "    Ok(())\n" +
    "}",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct Blockts52 {\n" +
    "    pub block_hash: String,\n" +
    "    pub block_height: i64,\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for Blockts52 {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        Blockts52::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl Blockts52 {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("Blockts52".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: substrate\n" +
    "    name: Index",
  UP:
    "CREATE TABLE Blockts52 (\n" +
    "    block_hash varchar,\n" +
    "    block_height bigint\n" +
    ")",
  TABLE: "Blockts52"
};
</script>
<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: white !important;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
.log-editor {
  overflow: auto;
  height: 300px;
}

.prism-editor__editor {
  color: white !important;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

.cover-editor {
  background: #2d2d2d;
  height: 400px;
  padding: 10px;
}
</style>
