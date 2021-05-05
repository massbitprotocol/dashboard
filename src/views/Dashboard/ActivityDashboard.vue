<template>
  <div>
    <b-container fluid class="mt-3">
      <!--Widgets-->
      <b-row>
        <b-col xl="8">
          <b-col xl="12">
            <b-card-group deck>
              <card gradient="default" no-body="">
                <b-card-body>
                  <div class="mb-2">
                    <sup class="text-white">$</sup>
                    <span class="h2 text-white">3,300</span>
                    <div class="text-light mt-2 text-sm">
                      Your current balance
                    </div>
                    <div>
                      <span class="text-success font-weight-600">+ 15%</span>
                      <span class="text-light">($250)</span>
                    </div>
                  </div>
                  <b-button size="sm" variant="neutral" block
                    >Add credit</b-button
                  >
                </b-card-body>
              </card>

              <card gradient="danger">
                <b-row align-v="center" class="justify-content-between">
                  <b-col>
                    <img
                      src="img/icons/cards/bitcoin.png"
                      alt="Image placeholder"
                    />
                  </b-col>
                  <b-col md="auto">
                    <b-badge size="lg" variant="success">Active</b-badge>
                  </b-col>
                </b-row>
                <div class="my-4">
                  <span class="h6 surtitle text-light">
                    Username
                  </span>
                  <div class="h1 text-white">@johnsnow</div>
                </div>
              </card>
            </b-card-group>
          </b-col>
          <b-col xl="12">
            <b-card-group deck>
              <card gradient="default" no-body="">
                <b-card-body>
                  <div class="mb-2">
                    <sup class="text-white">$</sup>
                    <span class="h2 text-white">3,300</span>
                    <div class="text-light mt-2 text-sm">
                      Your current balance
                    </div>
                    <div>
                      <span class="text-success font-weight-600">+ 15%</span>
                      <span class="text-light">($250)</span>
                    </div>
                  </div>
                  <b-button size="sm" variant="neutral" block
                    >Add credit</b-button
                  >
                </b-card-body>
              </card>

              <card gradient="danger">
                <b-row align-v="center" class="justify-content-between">
                  <b-col>
                    <img
                      src="img/icons/cards/bitcoin.png"
                      alt="Image placeholder"
                    />
                  </b-col>
                  <b-col md="auto">
                    <b-badge size="lg" variant="success">Active</b-badge>
                  </b-col>
                </b-row>
                <div class="my-4">
                  <span class="h6 surtitle text-light">
                    Username
                  </span>
                  <div class="h1 text-white">@johnsnow</div>
                </div>
              </card>
            </b-card-group>
          </b-col>
        </b-col>

        <b-col xl="4">
          <b-card-group deck>
            <card gradient="default" no-body="">
              <b-card-body>
                <div class="mb-2">
                  <sup class="text-white">$</sup>
                  <span class="h2 text-white">3,300</span>
                  <div class="text-light mt-2 text-sm">
                    Your current balance
                  </div>
                  <div>
                    <span class="text-success font-weight-600">+ 15%</span>
                    <span class="text-light">($250)</span>
                  </div>
                </div>
                <div class="mb-2">
                  <sup class="text-white">$</sup>
                  <span class="h2 text-white">3,300</span>
                  <div class="text-light mt-2 text-sm">
                    Your current balance
                  </div>
                  <div>
                    <span class="text-success font-weight-600">+ 15%</span>
                    <span class="text-light">($250)</span>
                  </div>
                </div>
                <div class="mb-2">
                  <sup class="text-white">$</sup>
                  <span class="h2 text-white">3,300</span>
                  <div class="text-light mt-2 text-sm">
                    Your current balance
                  </div>
                  <div>
                    <span class="text-success font-weight-600">+ 15%</span>
                    <span class="text-light">($250)</span>
                  </div>
                </div>
                <div class="mb-2">
                  <sup class="text-white">$</sup>
                  <span class="h2 text-white">3,300</span>
                  <div class="text-light mt-2 text-sm">
                    Your current balance
                  </div>
                  <div>
                    <span class="text-success font-weight-600">+ 15%</span>
                    <span class="text-light">($250)</span>
                  </div>
                </div>
              </b-card-body>
            </card>
          </b-card-group>
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

export default {
  components: {
    BaseProgress,
    RouteBreadCrumb,
    StatsCard
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style></style>
