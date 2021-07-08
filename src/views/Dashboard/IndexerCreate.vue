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
            <base-button size="xl" type="success" @click="onCompile"
              >Compile code</base-button
            >
          </b-col>
          <b-col cols="12" class="mt-6">
            <base-button size="xl" type="default" @click="onDeploy"
              >Deploy</base-button
            >
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import projects from "../Tables/projects";
import users from "../Tables/users";
import Tab from "@/components/Tabs/Tab.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
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
      projects,
      users,
      currentPage: 1,
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
    onCompile() {
      // alert(`Compile`);
      // this.$loading(true)
      // this.$loading(false)

      this.$successAlert({
        text: "Compile Success"
      });
    },
    onDeploy() {
      this.$failAlert({
        text: "Deploy Fail"
      });
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
