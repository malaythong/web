<template>
  <div>
    <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'apexchart-example',
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
      },
      chartSeries: [
        {
          name: 'Series 1',
          data: [30, 40, 35, 50, 49, 60, 70],
        },
      ],
      series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          }],
          
    }

  },
  components: {
    apexchart: VueApexCharts,
  },
};
</script>

<style>

</style>