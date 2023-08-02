<template>
  <div>
    <v-row>
      <score-chart />
    </v-row>
    <v-row>
      <v-col>
        <line-chart />
      </v-col>
      <v-col>
        <column-chart />
      </v-col>
      <v-col>
        <donut-chart />
      </v-col>
    </v-row>
    <v-row>
      <forum-data />
    </v-row>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import ScoreChart from '~/components/Dashboard/scoreChart.vue'
import LineChart from '~/components/Dashboard/lineChart.vue'
import ColumnChart from '~/components/Dashboard/columnChart.vue'
import DonutChart from '~/components/Dashboard/donutChart.vue'
import ForumData from '~/components/Dashboard/forumData.vue'

export default {
  data() {
    return {
      
    }
  },
  components: {
    apexchart: VueApexCharts,
    LineChart,
    ColumnChart,
    ForumData,
    DonutChart,
    ScoreChart,
  },
}
</script>

