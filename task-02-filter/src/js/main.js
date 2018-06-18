import resetCSS from "../css/reset.css";
import style from "../css/main.scss";
import Vue from "./vue.js";
import axios from "./axios.min.js";

new Vue({
  el: "#app",
  data: {
    search: "",
    searchKeywords: [],
    data: [],
    currentPage: 0,
    sizePerPage: 3, // min 1
    maxPage: 0
  },
  methods: {
    loadData() {
      console.log("loadData");
      const vm = this;
      // const api ="https://cors-anywhere.herokuapp.com/opendata2.epa.gov.tw/AQI.json";
      const api =
        "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";

      axios
        .get(api)
        .then(function(response) {
          // console.log(response);
          vm.data = response.data.result.records;
          // console.log(vm.data);

          vm.maxPage = Math.floor(vm.data.length / vm.sizePerPage) + 1;
          vm.currentPage = 1;
        })
        .catch(function(error) {
          vm.error = { text: error.message };
          console.log(error);
        });

      vm.$forceUpdate();
    },
    addSearchKeywords() {
      console.log("addSearchKeywords");
      const trim = this.search ? this.search.trim() : this.search;
      if (trim === "") {
        return;
      }
      if (this.searchKeywords.indexOf(trim) < 0) {
        this.searchKeywords.push(trim);
      }
      this.search = "";
    },
    removeKeyword(item) {
      const foundIndex = this.searchKeywords.indexOf(item);
      if (foundIndex > -1) {
        this.searchKeywords.splice(foundIndex, 1);
      }
    }
  },
  computed: {
    currentPageData() {
      if (this.data.length <= this.sizePerPage) {
        this.currentPage = 1;
        return this.data;
      }

      // if (this.maxPage === this.currentPage) {
      //   return this.data.slice(this.data.length - 4, this.data.length);
      // }

      const begin = (this.currentPage - 1) * this.sizePerPage;
      let end = begin + this.sizePerPage;
      if (end >= this.data.length) {
        end = this.data.length;
      }
      return this.data.slice(begin, end);
    }
  },
  created() {
    this.loadData();
  }
});
