<template>
  <div>
    <h3 class="d-flex justify-center ">ສັກສ່ວນຜູ້ໃຊ້</h3>
    <apexchart type="donut" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
  
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  data() {
    return {
      series: [44, 55, 13],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['ຍິງ', 'ຊາຍ', 'LGBTQ+'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  },

  components: {
    apexchart: VueApexCharts,
  },
}
</script>

<style>
</style>
