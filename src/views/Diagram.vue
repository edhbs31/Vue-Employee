<template>
  <div class="row Diagram">
    <b-col lg="12">
      <div class="col-md-12 mt-2">
        <div class="card">
          <div class="card-body">
            <Bar :options="options" :data="computedChartData" ref="barChart" />
          </div>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { ref } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  props: {
      item: {
        type: Array,
        required: true,
      },
      agesRanges: {
        type: Array,
        required: true,
      }
  },
  name: "BarDiagram",
  components: { Bar },
  data() {
    return {
      rangeAge: this.agesRanges,
      loaded: false,
      options: {
        scales: {
          x: [
            {
              type: 'category',
              position: 'bottom',
            },
          ],
          y: [
            {
              beginAtZero: true,
            },
          ],
        },
      },
    };
  },
  computed: {
    computedChartData() {
      const reactiveArray = ref(this.item);
      const regularArray = Array.from(reactiveArray.value);
      return {
        labels: this.agesRanges.map(range => range.label),
        datasets: [
          {
            label: 'Age',
            backgroundColor: 'pink',
            data: Array.from(regularArray),
          },
        ]
      };
    },
  },
}
</script>