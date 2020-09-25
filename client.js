var app = new Vue({
    el: '#app',
    data: {
        url: '',
        message: 'Hello Vue!'
    },
    methods: {

        checkURL() {
            fetch("http://localhost:8080", {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    // Adding body or contents to send 
                    body: JSON.stringify({
                        url: this.url,
                    }),
                })

                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
        }
    }
})