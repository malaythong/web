<template>
  <div>
    <h3 class="d-flex justify-center ">ຈຳນວນການເຂົ້າອ່ານກະທູ້ໃນແຕ່ລະວັນ</h3>
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
          categories: ['20/07', '21/07', '22/07', '23/07', '24/07', '25/07', '26/07'],
        },
      },
      chartSeries: [
        {
          name: 'Series 1',
          data: [1, 2, 5, 4, 5, 3, 7],
        },
      ],
      series: [{
            data: [0, 1, 3, 2, 5, 3, 4, 6, 7, 3]
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