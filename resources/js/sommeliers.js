new Vue({
  el: '#app',
  components: {


  },
  data () {
    return {

    }
  },

  methods: {
    processData() {
          const url = "http://127.0.0.1:8000/sommeliers/build";
          axios.get(url).then(response => {
            if (response.data) {
                window.console.log(response.data)
            }
            }).catch(error => {
                window.console.log(error);
              })

    },

  },
  created () {
      this.processData()
  }
})
