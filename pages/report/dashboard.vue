<template>
  <div>
    <v-container>
      <v-row>
        <!-- Card 1 -->
        <v-col cols="4">
          <v-card>
            <v-card-title></v-card-title>
            <v-card-text></v-card-text>
          </v-card>
        </v-col>

        <!-- Card 2 -->
        <v-col cols="4">
          <v-card>
            <v-card-title></v-card-title>
            <v-card-text></v-card-text>
          </v-card>
        </v-col>

        <!-- Card 3 -->
        <v-col cols="4">
          <v-card>
            <v-card-title></v-card-title>
            <v-card-text></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col>
        <line-chart />
      </v-col>
      <v-col>
        <column-chart />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import LineChart from '~/components/Dashboard/lineChart.vue'
import ColumnChart from '~/components/Dashboard/columnChart.vue'

export default {
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'apexchart-example',
        },
        xaxis: {
          categories: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
        },
      },
      chartSeries: [
        {
          name: 'Series 1',
          data: [30, 40, 35, 50, 49, 60, 70],
        },
      ],
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
      ],
    }
  },
  components: {
    apexchart: VueApexCharts,
    LineChart,
    ColumnChart,
  },
}
</script>

