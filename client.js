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
            fetch("http://localhost:8080", {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: this.url,
                    }),
                })

                .then(response => {
                    this.loading = false
                    window.open(this.url, '_blank');
                    console.log(response)
                })

                .catch(err => {
                    this.loading = false
                    console.log(err)
                })
        }
    }
})