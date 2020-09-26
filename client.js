var app = new Vue({
    el: '#app',
    data: {
        url: '',
        loading: false,
        message: 'Hello Vue!'
    },
    methods: {

        async checkURL() {
            this.loading = true
            const testURL = this.url;
            const myInit = {
                method: 'HEAD',
                mode: 'no-cors',
            };

            const myRequest = new Request(testURL, myInit);

            fetch(myRequest).then(function (response) {
                return response;
            }).then(response => {
                this.loading = false
                window.open(this.url, '_blank')
            }).catch(function (e) {
                Swal.fire({
                    title: 'Error!',
                    text: 'URL does not exist',
                    icon: 'error',
                })
                this.loading = false
                console.log(e);
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
        }
    }
})