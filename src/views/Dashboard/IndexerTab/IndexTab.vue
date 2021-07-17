<template>
  <b-card style="backround: transparent;" class="mt-3">
    <b-card-header class="bg-transparent border-0">
      <h1 class="mb-0">Index Tab</h1>
    </b-card-header>

    <b-row>
      <b-col xl="12">
        <b-card-group deck>
          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">STAKE • TOTAL</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">340.5M MBT </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="8">
                    <span class=" text-white">Owned </span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 142.77M MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Delegated</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 197.73M MBT </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="8">
                    <span class=" text-white">Allocated </span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 340.50M MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Delegated</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 8.51K MBT </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>
          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">INCOME • TOTAL</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">6.3M MBT </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="8">
                    <span class="h3 text-white">Indexing Rewards </span>
                  </b-col>
                  <b-col xl="4">
                    <span class="h3 text-white"> 6.30M MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Indexer Rewards</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 2.77M MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Delegator Rewards </span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 3.53M MBT </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="8">
                    <span class="h3 text-white">Query Fees </span>
                  </b-col>
                  <b-col xl="4">
                    <span class="h3 text-white"> 1.39K MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Indexer Query Fees</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 659.59 MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Delegator Query Fees</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 753.08 MBT </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>

          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">DELEGATION AVAILABLE</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">2.1B MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Delegation Received </span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 197.7M</span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Max Capacity</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 2.3B </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">DELEGATION PARAMETERS</sup>
                  </b-col>
                  <b-col xl="8">
                    <span class=" text-white">Indexing Reward Cut </span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 50% </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white"
                      >Effective Indexing Reward Cut</span
                    >
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white">13.90% </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Query Fee Cut</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white">50% </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Cooldown Remaining</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white">0 </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>
        </b-card-group>
      </b-col>

      <b-col cols="12" class="text-center pt-3" style="place-self: center;">
        <iframe
          width="100%"
          height="700px"
          :src="hasura_url"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import { HASURA_URL } from "../../../util/Constants";
export default {
  computed: {
    hasura_url() {
      return HASURA_URL;
    }
  }
};
</script>
