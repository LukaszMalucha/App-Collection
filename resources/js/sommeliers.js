Vue.component('quality-chart', {
	template:`
  	<canvas></canvas>
  `,
  props:['type', 'data', 'options'],
  mounted(){
  	this._chart = new Chart(this.$el, {
    	type:this.type,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
        fontSize: 16,
        fontColor: '#FFCB9A',
        display: true,
        text: 'Quality Distribution Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
             xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    fontColor: "white",
                },
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                display: true,
                ticks: {
                    fontColor: "white",
                    suggestedMin: 0,
                    beginAtZero: true
            }
          }]
        }
      }
    })
  },
})


new Vue({
  el: '#app',
  components: {


  },
  data () {
    return {
      describe: null,
      dataset_head: null,
      rows: null,
      columns: null,
      counter_dict: null,
      qualityData: null,
      X_head: null,
      y_head: null,
      X_transformed_df: null,
      X_train_len: null,
      X_test_len: null,
      accuracies_initial: null,
      accuracies_tune: null,
      statistics: ["mean", "std", "min", "25%", "50%", "75%", "max"]
    }
  },
  methods: {
    processData() {
          const url = "http://127.0.0.1:8000/sommeliers/summary";
          axios.get(url).then(response => {
            if (response.data) {
                this.describe = response.data.describe;
                this.dataset_head = response.data.dataset_head;
                this.counter_dict = response.data.counter_dict
                this.fillQualityChart();
            }
            }).catch(error => {
                window.console.log(error);
              })

    },
    classifierBuild() {
          const url = "http://127.0.0.1:8000/sommeliers/build";
          axios.get(url).then(response => {
            if (response.data) {
                this.X_head = response.data.X_head;
                this.y_head = response.data.y_head;
                this.X_transformed_df = response.data.X_transformed_df
                this.X_train_len = response.data.X_train_len;
                this.X_test_len = response.data.X_test_len;
                this.accuracies_initial = response.data.accuracies_initial;
                window.console.log(response.data.accuracies_initial)
            }
            }).catch(error => {
                window.console.log(error);
              })

    },
    classifierFit() {
          const url = "http://127.0.0.1:8000/sommeliers/fit";
          axios.get(url).then(response => {
            if (response.data) {
                this.accuracies_tune = response.data.accuracies_tune;
                this.accuracies_test = response.data.accuracies_test;
            }
            }).catch(error => {
                window.console.log(error);
              })
    },
    fillQualityChart() {
      var dataset = this.counter_dict
      var dataLabels = Object.keys(dataset)
      var dataValues = Object.values(dataset)
      this.qualityData = {
        labels: dataLabels,
        datasets: [
          {
            backgroundColor: [ '#a8a8a8', '#939393', 'white',"#d3d3d3",'#939393', '#939393'],
            data: dataValues
          }
        ]
      }
    },
  },
  created () {
      this.processData();
      this.classifierBuild();
      this.classifierFit();
  }
})
