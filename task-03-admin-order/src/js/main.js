import resetCSS from "../css/reset.css";
import style from "../css/main.scss";
import Vue from "./vue.js";
// import axios from "./axios.min.js";

/* vue components */
import chartComponent from "../components/chart-js-component.vue";

Vue.filter("formatCurrency", n => new Intl.NumberFormat().format(n));

new Vue({
  el: "#app",
  data: {
    activeMenu: "home"
  },
  components: {
    chartComponent
  },
  methods: {},
  computed: {
    totalRevenue() {
      return 54540;
    },
    totalCost() {
      return 12660;
    }
  },
  created() {}
});
