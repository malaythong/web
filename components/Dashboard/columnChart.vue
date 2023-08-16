<template>
  <div>
    <h3 class="d-flex justify-center">ແທັກທີ່ກຳລັງນິຍົມ</h3>
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
import gql from 'graphql-tag'

export default {
  data() {
    return {
      tag: null,
      series: [],
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
          categories: [],
        },
      },
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  apollo: {
    barChart: {
      query: gql`
        query BarChart {
          tag(
            where: { status: { _gte: 1, _lte: 2 } }
            order_by: { forum_details_aggregate: { count: desc } }
          ) {
            name
            forum_details_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `,
      result({ data }) {
        this.chartOptions.xaxis.categories = data.tag.map(detail => detail.name);
        this.series = [
          {
            data: data.tag.map(detail => detail.forum_details_aggregate.aggregate.count),
          },
        ];
      },
    },
  },
}
</script>