<template>
  <div class="row Diagram">
    <b-col lg="12">
      <div class="col-md-12 mt-2">
        <div class="card">
          <div class="col-sm-auto mt-7 mb-1">
            <router-link class="btn btn-sm btn-dark " :to="{ path: '/dashboard'}">
              <em style="width: 30px; height: 75%" class="fa fa-plus">Dashboard</em>
            </router-link>
            <button
          class="btn btn-sm btn-primary "
          type="button"
          @click="this.actionGetData()"
          >
          Refresh
          </button>
          </div>
        
          <h2 class="title text-center pt-1 mt-1">BAR CHART DATA EMPLOYEE</h2>
          <div class="card-body">
            
            <Block
            :item="this.dataAll" 
            :agesRanges="this.rangeAge"/>
          </div>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import Block from "./Diagram.vue"
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarDiagram",
  components: { Block },
  data() {
    return {
      dataAll:[],
      rangeAge:[
        {
          start:0,
          end:15,
          label:'0-15'
        }, {
          start: 16,
          end:30,
          label:'15-30'
        },{
          start:31,
          end:60,
          label:'31-60'
        },{
          start:0,
          end:61,
          label:'>60'
        }
    ],
    };
  },
  created() {
    this.actionGetData();
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.user.isLoading,
      isError: (state) => state.user.isError,
      totalRows: (state) => state.user.totalRows,
      errorMessage: (state) => state.user.errorMessage,
    }),
  },
  methods: {
    ...mapActions('user', ['fetchUserAge']),
    
    async actionGetData() {
      const range = this.rangeAge
      const data = await this.fetchUserAge(range);
      this.dataAll = data;
      
    }, 
  },
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
