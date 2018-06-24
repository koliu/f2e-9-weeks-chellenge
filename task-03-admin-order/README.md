# No.3 admin order

---

## spec

https://hexschool.github.io/THE_F2E_Design/week3-admin%20order/#artboard0

## fontawesome.com

- \<i class="fas fa-hand-holding-usd"></i>
- \<i class="fas fa-boxes"></i>
- \<i class="fas fa-money-bill"></i>

---

## [Chart.js](https://www.chartjs.org/)

### References

- [Using Chart.js with Vue.js](https://alligator.io/vuejs/vue-chart-js/)

### Setup

- 下載/安裝 Chart.js
- Chart.js 的使用方式

```html
<canvas id="XXX">

<script>
// 引入 Chart module
import Chart from "../js/Chart.js";

// 綁定 canvas 並取得 context
const ctx = document.getElementById("XXX").getContext("2d");

// 以 context 及 資料物件 建構 Chart 實例
const myChart = new Chart(ctx, {
  type: {
    /* ... */
  },
  data: {
    /* ... */
  },
  options: {
    /* ... */
  }
});
</script>
```

- 也可將 資料物件 抽成 js 檔再 import

```js
// data obj
const data = {
  type: {
    /* ... */
  },
  data: {
    /* ... */
  },
  options: {
    /* ... */
  }
};

export default data;
```

```js
import Chart from "../js/Chart.js";
import Data from "../data/data.js";

// 綁定 canvas 並取得 context
const ctx = document.getElementById("XXX").getContext("2d");

// 以 context 及 資料物件 建構 Chart 物件
const myChart = new Chart(ctx, Data);
```

- 控制圖型的寬高--[Set height of chart in Chart.js](https://stackoverflow.com/a/43658507)

  由於 Chart.js 的圖表預設支援 RWD，若要根據自己頁面的需要進行調整，要在 canvas 外包一層 div，再針對該 div 設置 height/width

  ```js
  // 需把 Chart 的 maintainAspectRatio option 關閉:
  options: {
    maintainAspectRatio: false,
  }
  ```

- 在 vue 中使用

```js
import Chart from "../js/Chart.js";
import ChartData from "../data/data.js";

new Vue({
  el: "#app",
  data: {},
  methods: {
    // 會把 Chart 物件的建構寫成方法
    createChart(chartId, chartData) {
      console.info(chartId, chartData);
      const ctx = document.getElementById(chartId).getContext("2d");
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    // 在 mounted 時初始化 Chart
    this.createChart("XXX", ChartData);
  }
});
```

---

## Q & A

- [Ignore Moment Locales](https://webpack.js.org/plugins/ignore-plugin/#ignore-moment-locales)
  > ./src/js/moment-with-locales.min.js Module not found: Error: Can't resolve './locale' in 'W:\_workspace\the-f2e-exercises-2018\task-03-admin-order\src\js'

```js
// webpack.config.js
import webpack from "webpack";

module: {
  plugins: [
    // for installed from npm
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)

    // for built-in moment.js
    // new webpack.IgnorePlugin(/^\.\/locale$/, /js$/)
  ],
}
```
