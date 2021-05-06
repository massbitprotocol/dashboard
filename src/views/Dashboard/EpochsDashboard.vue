<template>
  <div>
    <b-container fluid class="mt-6">
      <!--Widgets-->
      <b-row>
        <b-col xl="4">
          <b-card-group deck>
            <card gradient="default" no-body="">
              <b-card-body>
                <div class="mb-2">
                  <b-row class="mb-2" style="text-align-last: center;">
                    <b-col xl="12">
                      <sup class="text-white">SETTLING</sup>
                    </b-col>
                    <b-col xl="12">
                      <span class="h1 text-white">139 </span>
                    </b-col>
                    <b-col xl="12" class="mb-3">
                      <span class="h1 text-white"
                        ><circular-count-down-timer
                          :initial-value="86400"
                          :stroke-width="3"
                          :seconds-stroke-color="'#f00'"
                          :minutes-stroke-color="'#0ff'"
                          :hours-stroke-color="'#0f0'"
                          :underneath-stroke-color="'lightgrey'"
                          :seconds-fill-color="'#00ffff66'"
                          :minutes-fill-color="'#00ff0066'"
                          :hours-fill-color="'#ff000066'"
                          :size="150"
                          :padding="5"
                          :hour-label="'hours'"
                          :minute-label="'minutes'"
                          :second-label="'seconds'"
                          :show-second="false"
                          :show-minute="false"
                          :show-hour="true"
                          :show-negatives="true"
                        ></circular-count-down-timer>
                        
                          <!-- :paused="some_variable"
                          :notify-every="'minute'" -->
                      </span>
                    </b-col>
                    <b-col xl="6">
                      <b-row class="mb-2">
                        <b-col xl="12">
                          <sup class="text-white">START BLOCK</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class=" h1 text-white">#12377208</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="text-white">QUERY FEES</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class=" h1 text-white">26.1GRT</sup>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col xl="6">
                      <b-row class="mb-2">
                        <b-col xl="12">
                          <sup class="text-white">END BLOCK</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="h1 text-white">#12383854</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="text-white">INDEXING REWARDS</sup>
                        </b-col>
                        <b-col xl="12">
                          <sup class="h1 text-white">49.3KGRT</sup>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-card-body>
            </card>
          </b-card-group>
        </b-col>
        <b-col xl="8">
          <b-col xl="12">
            <b-card-group deck>
              <card gradient="default" no-body="">
                <b-card-body>
                  <div class="mb-2">
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">SETTLING</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">QUERY FEES</sup>
                      </b-col>
                      <b-col xl="4">
                        <span class="h1 text-white">139 </span>
                      </b-col>
                      <b-col xl="8">
                        <span class="h1 text-white">196.6GRT </span>
                      </b-col>
                    </b-row>
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">5 hours ago</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">INDEXING REWARDS</sup>
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h1 text-white"> 10.1BGRT </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class=" text-white"> BLOCK RANGE </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h5 text-white">
                            #12370562 ➔ #12377208
                          </span></sup
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-card-body>
              </card>

              <card gradient="default" no-body="">
                <b-card-body>
                  <div class="mb-2">
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">SETTLING</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">QUERY FEES</sup>
                      </b-col>
                      <b-col xl="4">
                        <span class="h1 text-white">138 </span>
                      </b-col>
                      <b-col xl="8">
                        <span class="h1 text-white">548.9GRT </span>
                      </b-col>
                    </b-row>
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">a day ago</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">INDEXING REWARDS</sup>
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h1 text-white"> 368.3KGRT </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class=" text-white"> BLOCK RANGE </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h5 text-white">
                            #12363916 ➔ #12370562
                          </span></sup
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-card-body>
              </card>
            </b-card-group>
          </b-col>
          <b-col xl="12">
            <b-card-group deck>
              <card gradient="default" no-body="">
                <b-card-body>
                  <div class="mb-2">
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">SETTLING</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">QUERY FEES</sup>
                      </b-col>
                      <b-col xl="4">
                        <span class="h1 text-white">137 </span>
                      </b-col>
                      <b-col xl="8">
                        <span class="h1 text-white">853.5GRT </span>
                      </b-col>
                    </b-row>
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">2 days ago</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">INDEXING REWARDS</sup>
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h1 text-white"> 1.4MGRT </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class=" text-white"> BLOCK RANGE </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h5 text-white">
                            #12357270 ➔ #12363916
                          </span></sup
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-card-body>
              </card>

              <card gradient="default" no-body="">
                <b-card-body>
                  <div class="mb-2">
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">SETTLING</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">QUERY FEES</sup>
                      </b-col>
                      <b-col xl="4">
                        <span class="h1 text-white">136 </span>
                      </b-col>
                      <b-col xl="8">
                        <span class="h1 text-white">196.6GRT </span>
                      </b-col>
                    </b-row>
                    <b-row class="mb-2">
                      <b-col xl="4">
                        <sup class="text-white">3 days ago</sup>
                      </b-col>
                      <b-col xl="8">
                        <sup class="text-white">INDEXING REWARDS</sup>
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h1 text-white"> 10.1BGRT </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class=" text-white"> BLOCK RANGE </span></sup
                        >
                      </b-col>
                      <b-col xl="4"> </b-col>
                      <b-col xl="8">
                        <sup class="text-white">
                          <span class="h5 text-white">
                            #12370562 ➔ #12377208
                          </span></sup
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-card-body>
              </card>
            </b-card-group>
          </b-col>
        </b-col>

        <b-col xl="12">
          <EpochsTable></EpochsTable>
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
import EpochsTable from "./EpochsTable";

export default {
  components: {
    BaseProgress,
    RouteBreadCrumb,
    EpochsTable,
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
