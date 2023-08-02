<template>
  <div>
    <h3 class="d-flex justify-center ">ແທັກທີ່ກຳລັງນິຍົມ</h3>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  data() {
    return {
      series: [
        {
          data: [5, 4, 4, 3, 1],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'ການຮຽນ',
            'ອາຊີບ',
            'ປັນຫາຄອບຄົວ',
            'ຄວາມຮັກ',
            'ການສຶກສາ',
          ],
        },
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