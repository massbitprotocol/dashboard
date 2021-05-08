<template>
  <b-card style="backround: transparent;" class="mt-3">
    <b-card-header class="bg-transparent border-0">
      <h1 class="mb-0">Delegating Tab</h1>
    </b-card-header>

    <b-row>
      <b-col xl="12">
        <b-card-group deck>
          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class="text-white">DELEGATING • TOTAL</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">60.54M MBT </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="8">
                    <span class=" text-white">Original </span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 59.70M MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Unrealized rewards</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 836.35K MBT </span>
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
                    <sup class="text-white">DELEGATION REWARDS • TOTAL</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class="h1 text-white">836.35K MBT </span>
                  </b-col>
                </b-row>

                <hr class="my-1 mb-2" style="background: white;" />

                <b-row class="mb-2">
                  <b-col xl="8">
                    <span class="h3 text-white">Unrealized </span>
                  </b-col>
                  <b-col xl="4">
                    <span class="h3 text-white">836.35K MBT </span>
                  </b-col>

                  <b-col xl="8">
                    <span class=" text-white">Realized</span>
                  </b-col>
                  <b-col xl="4">
                    <span class=" text-white"> 0.00 MBT </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>

          <card gradient="default" no-body="">
            <b-card-body>
              <div class="mb-2">
                <b-row class="mb-4">
                  <b-col xl="12">
                    <sup class="text-white">ONGOING UNDELEGATION</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class=" text-white">
                      - Indicates an undelegation in progress</span
                    >
                  </b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col xl="12">
                    <sup class=" text-white">WITHDRAW AVAILABLE</sup>
                  </b-col>
                  <b-col xl="12">
                    <span class=" text-white">
                      - Indicates a finalized undelegation. The funds can be
                      withdrawn.
                    </span>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="12"> <IndexersTable></IndexersTable> </b-col
    ></b-row>
  </b-card>
</template>
<script>
import IndexersTable from "../DashboardTable/IndexersTable";
export default {
  name: "delegating-tab",
  components: { IndexersTable },
  data() {
    return {};
  }
};
</script>
