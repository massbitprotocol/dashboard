<template>
  <div>
    <base-header class="pb-2">
      <b-row align-v="center" class="py-4">
        <b-col lg="6" cols="7">
          <h6
            class="h2 text-white d-inline-block mb-0"
            style="text-transform: capitalize;"
          >
            Create {{ chain }} Indexers
          </h6>
        </b-col>
        <b-col lg="6" cols="5" class="text-right">
          <base-button
            size="xl"
            type="success"
            @click="authenticate('github')"
            class="mt-2"
            >Import Github</base-button
          >
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt-6">
      <b-row>
        <!-- <b-col cols="9">
          <base-input
            label="Indexer Name"
            rules="required"
            name="Indexer Name"
            placeholder="Fill Your Indexer Name "
            v-model="table"
          >
          </base-input>
        </b-col> -->
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
            <!-- <Tab ref="lib" title="lib.rs">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="lib"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab> -->
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
            <!-- <Tab ref="models" title="models.rs">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="models"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab> -->
            <Tab ref="schema" title="schema.graphql">
              <div class="cover-editor mt-3">
                <prism-editor
                  class="my-editor"
                  v-model="schema"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </div>
            </Tab>
          </Tabs>
        </b-col>
        <b-col cols="3" class="text-center" style="place-self: center;">
          <b-col cols="12">
            <base-button
              v-for="item in templates"
              :key="item.name"
              size="xl"
              type="warning"
              @click="loadTemplate(item.data)"
              class="mt-2"
              style="min-width:50%;"
              >{{ item.name + " Templates" }}</base-button
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
        <b-col v-if="isShowHasura" cols="12" class=" pt-3">
          <h1>Table Data</h1>
        </b-col>
        <b-col
          v-if="isShowHasura"
          cols="12"
          class="text-center pt-3"
          style="place-self: center;"
        >
          <iframe
            width="100%"
            height="700px"
            :src="hasura_url"
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

import { LOCAL_STORE, HASURA_URL } from "../../util/Constants";
import { DEFAULT_SCHEMA } from "../../util/Templates";
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
      return this.$route.params.chain.toLowerCase();
    },
    hasura_url() {
      return HASURA_URL;
    }
  },
  watch: {
    chain(newValue, oldValue) {
      this.loadEmpty();
    }
  },
  mounted() {
    if (this.chain == localStorage.getItem(LOCAL_STORE.CHAIN)) {
      this.mapping = localStorage.getItem(LOCAL_STORE.MAPPING);
      this.models = localStorage.getItem(LOCAL_STORE.MODELS);
      this.project = localStorage.getItem(LOCAL_STORE.PROJECT);
      this.lib = localStorage.getItem(LOCAL_STORE.LIB);
      this.schema = localStorage.getItem(LOCAL_STORE.SCHEMA);
      this.table = localStorage.getItem(LOCAL_STORE.TABLE);
      this.compilation_id = localStorage.getItem(LOCAL_STORE.COMPILE);
    }

    this.loadDefaultSchema();
    localStorage.setItem(LOCAL_STORE.CHAIN, this.chain);
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
      templates: [],
      compileLog: "",
      compilation_id: "",
      mapping: "",
      models: "",
      schema: DEFAULT_SCHEMA,
      project: "",
      lib: "",
      table: "",
      isShowHasura: false
    };
  },
  methods: {
    authenticate: async function(provider) {
      try {
        await this.$auth.authenticate(provider).then(async result => {
          console.log(result);
          await this.$successAlert({ text: `Your code ${result.code}` });

          //Block by CORS : https://stackoverflow.com/questions/42150075/cors-issue-on-github-oauth/42150336
          // Request("https://github.com")
          //   .post(
          //     `/login/oauth/access_token`,
          //     {
          //       client_id: result.clientId,
          //       client_secret: "18db239188c0b9911eaa53468afe0e824c4983fa ",
          //       code: result.code,
          //       redirect_uri: result.redirectUri
          //     },
          //     {
          //       "Accept": "application/json",
          //       "Content-Type": "application/x-www-form-urlencoded"
          //     }
          //   )
          //   .then(async res => {
          //     console.log("pop res");
          //     console.log(res);
          //     this.$successAlert({ text: `access token ${res.access_token}` });
          //   });
        });
      } catch (error) {
        this.$failAlert({ text: error });
      }
    },
    loadEmpty() {
      this.mapping = "";
      this.models = "";
      this.lib = "";
      this.table = "";
      this.project = "";
      this.schema = "";
      this.compilation_id = "";
      this.schema = DEFAULT_SCHEMA;
    },
    async loadDefaultSchema() {
      this.$loading(true);
      try {
        this.templates = await Request(`https://raw.githubusercontent.com`)
          .get(
            `https://raw.githubusercontent.com/massbitprotocol/massbitprotocol/main/user-example/examples.json`
          )
          .then(res => {
            var data = res.data[this.chain];
            var result = [];
            if (data) {
              var listKey = Object.keys(data);
              for (let index = 0; index < listKey.length; index++) {
                const element = listKey[index];
                result.push({ name: element, data: data[element] });
              }
            }
            return result;
          })
          .catch(handleError);
      } catch (error) {
        this.$failAlert({
          text: error
        });
      }

      this.$loading(false);
    },
    async loadRawDataGit(url) {
      if (url && url.length > 1) {
        return await Request(`https://raw.githubusercontent.com`)
          .get(url)
          .then(res => {
            return res.data || "";
          })
          .catch(handleError);
      } else {
        return "";
      }
    },
    async loadTemplate(data) {
      this.$loading(true);
      this.mapping = await this.loadRawDataGit(data["mapping.rs"] || "");
      this.models = await this.loadRawDataGit(data["models.rs"] || "");
      this.lib = await this.loadRawDataGit(data["lib.rs"] || "");
      this.project = await this.loadRawDataGit(data["project.yaml"] || "");
      this.schema = await this.loadRawDataGit(data["schema.graphql"] || "");
      this.compilation_id = "";
      this.$loading(false);
    },
    catchData() {
      localStorage.setItem(LOCAL_STORE.MAPPING, this.mapping);
      localStorage.setItem(LOCAL_STORE.MODELS, this.models);
      localStorage.setItem(LOCAL_STORE.PROJECT, this.project);
      localStorage.setItem(LOCAL_STORE.LIB, this.lib);
      localStorage.setItem(LOCAL_STORE.TABLE, this.table);
      localStorage.setItem(LOCAL_STORE.COMPILE, this.compilation_id);
      localStorage.setItem(LOCAL_STORE.SCHEMA, this.schema);
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

      this.isShowHasura = false;

      try {
        await Request()
          .post(`/${action}`, {
            "mapping.rs": this.covertToURL(this.mapping),
            // "models.rs": this.covertToURL(this.models),
            "project.yaml": this.covertToURL(this.project),
            "schema.graphql": this.covertToURL(this.schema),
            // "lib.rs": this.covertToURL(this.lib),
            // table: this.table,
            compilation_id: this.compilation_id
            // network_type: this.chain
          })
          .then(async res => {
            if (res.data.payload && res.data.payload.length > 0) {
              this.compilation_id = res.data.payload;
              await this.runGetProcess(true, res.data.payload, 100000, action);
            } else if (res.data.status == "success") {
              this.$successAlert({
                text: "Deploy Success"
              });

              var _this = this;
              setTimeout(function() {
                _this.isShowHasura = true;
              }, 2000);
            }
          })
          .catch(handleError);
      } catch (error) {
        this.$failAlert({ text: error });
        this.$loading(false);
      }
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

            if (res.status != 200 || res.data.status == "error") {
              _this.$failAlert({
                text: ""
              });
              _this.compileLog = res.data.payload;
              isRunNext = false;
              _this.stopProcess();
              // return;
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
