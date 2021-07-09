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
            <Tab ref="schema" title="schema.rs">
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
            <base-button size="xl" type="success" @click="onProcess('compile')"
              >Compile code</base-button
            >
          </b-col>
          <b-col cols="12" class="mt-6">
            <base-button size="xl" type="default" @click="onProcess('deploy')"
              >Deploy</base-button
            >
          </b-col>
        </b-col>
        <b-col v-if="compileLog" cols="12" class=" pt-3">
          <h1>Log compile</h1>
          <div class="my-editor log-editor">
            <p>{{ covertToString(compileLog) }}</p>
          </div>
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
  data() {
    return {
      currentPage: 1,
      is: 1,
      compileLog: null,
      project:
        "schema:\n" +
        "  file: ./schema.graphql\n" +
        "\n" +
        "dataSources:\n" +
        "  - kind: substrate\n" +
        "    name: Index\n" +
        "    network: https://data-seed-prebsc-1-s1.binance.org:8545/\n" +
        "    mapping:\n" +
        "      language: rust\n" +
        "      handlers:\n" +
        "        - handler: handleBlock\n" +
        "          kind: substrate/BlockHandler\n" +
        "        - handler: handleCall\n" +
        "          kind: substrate/CallHandler\n" +
        "        - handler: handleEvent\n" +
        "          kind: substrate/EventHandler",
      up:
        "CREATE TABLE blocks (\n" +
        "    id SERIAL PRIMARY KEY,\n" +
        "    number BIGINT NOT NULL\n" +
        ")",
      mapping:
        "use super::models::NewBlock;\n" +
        "use super::schema::blocks;\n" +
        "use diesel::pg::PgConnection;\n" +
        "use diesel::prelude::*;\n" +
        "use massbit_chain_substrate::data_type::SubstrateBlock;\n" +
        "use plugin::core::{BlockHandler, InvocationError};\n" +
        "use std::env;\n" +
        "use index_store::core::IndexStore;\n" +
        "\n" +
        "#[derive(Debug, Clone, PartialEq)]\n" +
        "pub struct BlockIndexer;\n" +
        "\n" +
        "impl BlockHandler for BlockIndexer {\n" +
        "    fn handle_block(&self, store: &IndexStore, substrate_block: &SubstrateBlock) -> Result<(), InvocationError> {\n" +
        '        println!("[.SO File] triggered!");\n' +
        "\n" +
        "        let number = substrate_block.header.number as i64;\n" +
        "        let new_block = NewBlock { number };\n" +
        "\n" +
        "        store.save(blocks::table, new_block);\n" +
        "        Ok(())\n" +
        "    }\n" +
        "}",
      models:
        "use super::schema::blocks;\n" +
        "use diesel::{PgConnection, Connection, RunQueryDsl};\n" +
        "\n" +
        "#[derive(Insertable)]\n" +
        '#[table_name = "blocks"]\n' +
        "pub struct NewBlock {\n" +
        "    pub number: i64,\n" +
        "}",
      schema:
        "table! {\n" +
        "    blocks (id) {\n" +
        "        id -> Int4,\n" +
        "        number -> Int8,\n" +
        "    }\n" +
        "}"
    };
  },
  methods: {
    create: function() {
      this.$router.push("/createIndexer/" + this.chain);
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
        .post(`/mock/${action}`, {
          "mapping.rs": this.covertToURL(this.mapping),
          "models.rs": this.covertToURL(this.models),
          "schema.rs": this.covertToURL(this.schema),
          "project.yaml": this.covertToURL(this.project),
          "up.sql": this.covertToURL(this.up)
        })
        .then(async res => {
          if (res.data.payload) {
            await this.runGetProcess(true, res.data.payload, 100000, action);
          }
        })
        .catch(handleError)
        .finally(err => {
          this.$loading(false);
        });
    },

    async buildProcess() {
      var _this = this;

      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading"
      });
      await _this.stopProcess();
      setTimeout(function() {
        // _this.fn_select();
        loading.close();
      }, 2000);
    },

    runGetProcess(isRun, requestId, noEvolution, action) {
      var _this = this;

      console.log(requestId);
      if (!requestId) {
        _this.stopProcess();
      }
      this.uploadProgressResquestID = requestId;
      if (isRun) {
        var isRunNext = true;
        var _this = this;
        Request()
          .get(`/mock/${action}/status/${requestId}`)
          .then(res => {
            console.log(res);
            if (res.status != 200) {
              return;
            }
            if (res.data.payload) {
              _this.$successAlert({
                text: ""
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
