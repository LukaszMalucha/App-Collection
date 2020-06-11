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
      fixed_acidity: "",
      volatile_acidity: "",
      citric_acid: "",
      residual_sugar: "",
      chlorides: "",
      free_sulfur_dioxide: "",
      total_sulfur_dioxide: "",
      density: "",
      pH: "",
      sulphates: "",
      alcohol: "",
      gradient_message: null,
      random_forest_message: null,
      vote_message: null,
      gtb_predict: null,
      rf_predict: null,
      vot_predict: null,
      statistics: ["mean", "std", "min", "25%", "50%", "75%", "max"]
    }
  },
  methods: {
    processData() {
          const url = "https://compilationapp.herokuapp.com/sommeliers/summary";
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
          window.scrollTo(0,0);
          document.getElementById("page-index-summary").style.display = "none";
          document.getElementById("page-index-build").style.display = "block";
          document.getElementById("page-index-fit").style.display = "none";
          document.getElementById("page-index-sommeliers").style.display = "none";
          const url = "https://compilationapp.herokuapp.com/sommeliers/build";
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
          window.scrollTo(0,0);
          document.getElementById("page-index-summary").style.display = "none";
          document.getElementById("page-index-build").style.display = "none";
          document.getElementById("page-index-fit").style.display = "block";
          document.getElementById("page-index-sommeliers").style.display = "none";
          const url = "https://compilationapp.herokuapp.com/sommeliers/fit";
          axios.get(url).then(response => {
            if (response.data) {
                this.accuracies_tune = response.data.accuracies_tune;
                this.accuracies_test = response.data.accuracies_test;
            }
            }).catch(error => {
                window.console.log(error);
              })
    },
    sommeliers() {
        window.scrollTo(0,0);
        document.getElementById("page-index-summary").style.display = "none";
        document.getElementById("page-index-build").style.display = "none";
        document.getElementById("page-index-fit").style.display = "none";
        document.getElementById("page-index-sommeliers").style.display = "block";

    },
    rateWine() {
        let formData = new FormData();
        formData.append("accuracies_initial", this.accuracies_initial);
        formData.append("accuracies_tune", this.accuracies_tune);
        formData.append("fixed_acidity", this.fixed_acidity);
        formData.append("volatile_acidity", this.volatile_acidity);
        formData.append("citric_acid", this.citric_acid);
        formData.append("residual_sugar", this.residual_sugar);
        formData.append("chlorides", this.chlorides);
        formData.append("free_sulfur_dioxide", this.free_sulfur_dioxide);
        formData.append("total_sulfur_dioxide", this.total_sulfur_dioxide);
        formData.append("density", this.density);
        formData.append("pH", this.pH);
        formData.append("sulphates", this.sulphates);
        formData.append("alcohol", this.alcohol);
        const url = "https://compilationapp.herokuapp.com/sommeliers/rate";
        axios.post(url,formData).then(data => {
          if (data.non_field_errors) {
              this.error = data.non_field_errors[0]
          } else if (!data) {
              window.console.log("Something went wrong. We couldn't proceed with your cash transfer")
          } else {
            window.console.log(data.data);
            this.random_forest_message = data.data.random_forest_message;
            this.gradient_message = data.data.gradient_message;
            this.vote_message = data.data.vote_message;
            this.gtb_predict = data.data.gtb_predict;
            this.rf_predict = data.data.rf_predict;
            this.vot_predict = data.data.vot_predict;
          }
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
  }
})
