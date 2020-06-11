
new Vue({
  el: '#app',
  components: {


  },
  data () {
    return {
      start_location: "empty",
      base_location: "empty",
      astronauts: "empty",
      desert_storm_1: "empty",
      desert_storm_2: "empty",
      desert_storm_3: "empty",
      desert_storm_4: "empty",
      path: null,
      error: null,
    }
  },
  methods: {
    processData() {
          document.getElementById("loader").style.display = "block";
          let formData = new FormData();
          formData.append("start_location", this.start_location);
          formData.append("base_location", this.base_location);
          formData.append("astronauts", this.astronauts);
          formData.append("desert_storm_1", this.desert_storm_1);
          formData.append("desert_storm_2", this.desert_storm_2);
          formData.append("desert_storm_3", this.desert_storm_3);
          formData.append("desert_storm_4", this.desert_storm_4);
          const url = "https://3.249.1.158:8000/pathfinder/";
          axios.post(url,formData).then(response => {
            if (response.data) {
                document.getElementById("loader").style.display = "none";
                this.path = response.data.path;
                window.console.log(this.path);
            }
            }).catch(error => {
                document.getElementById("loader").style.display = "none";
                window.console.log(error);
                this.error = "Locations too close. Make sure there is one tile gap between objects.";
                setTimeout(() => this.error = null, 3000);
              })

    },
  },
  created () {

  }
})
