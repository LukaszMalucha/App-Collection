
new Vue({
  el: '#app',
  components: {


  },
  data () {
    return {
      start_location: null,
      base_location: null,
      astronauts: null,
      desert_storm_1: null,
      desert_storm_2: null,
      desert_storm_3: null,
      desert_storm_4: null,
      path: null,
    }
  },
  methods: {
    processData() {
          let formData = new FormData();
          formData.append("start_location", this.start_location);
          formData.append("base_location", this.base_location);
          formData.append("astronauts", this.astronauts);
          formData.append("desert_storm_1", this.desert_storm_1);
          formData.append("desert_storm_2", this.desert_storm_2);
          formData.append("desert_storm_3", this.desert_storm_3);
          formData.append("desert_storm_4", this.desert_storm_4);
          const url = "http://127.0.0.1:8000/pathfinder/";
          axios.post(url,formData).then(response => {
            if (response.data) {
                this.path = response.data.path;
                window.console.log(this.path);
            }
            }).catch(error => {
                window.console.log(error);
              })

    },
  },
  created () {

  }
})
