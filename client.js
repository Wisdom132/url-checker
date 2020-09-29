var app = new Vue({
  el: "#app",
  data: {
    url: "",
    loading: false,
    message: "Hello Vue!",
  },
  methods: {
    async checkURL() {
      this.loading = true;
      const testURL = this.url;
      const myInit = {
        method: "HEAD",
        mode: "no-cors",
      };

      const myRequest = new Request(testURL, myInit);

      fetch(myRequest).then(function (response) {
        return response;
      }).then((response) => {
        this.loading = false;
        if (response.statusText == "Not Found") {
          Swal.fire({
            title: "Error!",
            text: "URL does not exist",
            icon: "error",
          });
        } else {
          var now = new Date();
          now.setMonth(now.getMonth() + 1);
          let cookievalue = Math.random() + ";";
          document.cookie = "name=" + cookievalue;
          document.cookie = "expires=" + now.toUTCString() + ";";
          console.log(response);
          window.location.replace(this.url);
          // window.open(this.url, "_blank");
        }
      }).catch((e) => {
        Swal.fire({
          title: "Error!",
          text: "URL does not exist",
          icon: "error",
        });
        this.loading = false;
      });

      // fetch("http://localhost:8080", {
      //         method: "POST",
      //         mode: 'no-cors',
      //         headers: {
      //             'Accept': 'application/json',
      //             'Content-Type': 'application/json'
      //         },
      //         body: JSON.stringify({
      //             url: this.url,
      //         }),
      //     })

      //     .then(response => response.json())
      //     .then(json => console.log(json))
      //     .catch(err => console.log(err))
    },
  },
});