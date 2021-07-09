<template>
  <b-card style="backround: transparent;" class="mt-3">
    <b-card-header class="bg-transparent border-0">
      <h1 class="mb-0">Overview Tab</h1>
    </b-card-header>

    <b-row>
      <b-col xl="12">
        <b-card-group deck>
          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">ACTIVE SINCE</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">Today </span>
                  </b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col xl="4">
                    <sup class="text-white">WALLET</sup>
                  </b-col>
                  <b-col xl="8">
                    <sup class="text-white">IN PROTOCOL</sup>
                  </b-col>
                  <b-col xl="4">
                    <span class="h1 text-white">
                      0 MBT
                    </span>
                  </b-col>
                  <b-col xl="8">
                    <span class="h1 text-white">
                      10.1B MBT
                    </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>
        </b-card-group>
      </b-col>
      <b-col xl="6">
        <b-card-group @click="goToIndexing" deck>
          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-4">
                  <b-col xl="12">
                    <span class="h1 text-white">Indexing </span>
                  </b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col xl="6">
                    <sup class="text-white">Owned stake</sup>
                  </b-col>
                  <b-col xl="6">
                    <sup class="text-white">Unstaked</sup>
                  </b-col>
                  <b-col xl="6">
                    <span class="h1 text-white">142.77M </span>
                  </b-col>
                  <b-col xl="6">
                    <span class="h1 text-white">
                      0 MBT
                    </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>
        </b-card-group>
      </b-col>
      <b-col xl="6">
        <b-card-group @click="goToDelegating" deck>
          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-4">
                  <b-col xl="12">
                    <span class="h1 text-white">Delegating </span>
                  </b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">Stake Delegating</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">60.54M MBT </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  name: "overview-tab",
  components: {},
  data() {
    return {};
  },
  methods: {
    goToIndexing: function() {
      this.$emit("goToIndexing");
    },
    goToDelegating: function() {
      this.$emit("goToDelegating");
    }
  }
};
</script>
