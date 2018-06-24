<template>
  <canvas id="home-trends"></canvas>
</template>

<script>
import Chart from "../js/Chart.bundle.js";
import HomeTrendsData from "../data/home-trends.js";

export default {
  name: "char-js-component",
  data() {
    return { chart: {} };
  },
  props: ["id"],
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId).getContext("2d");
      return new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  created() {},
  mounted() {
    // this.$set(this.createChart("home-trends", HomeTrendsData), "chart", 0);
    this.chart = this.createChart("home-trends", HomeTrendsData);
  },
  beforeDestroy() {
    this.chart.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
