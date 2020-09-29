export default {
    css: [
        'bulma/css/bulma.css',
        '~/css/main.css'
    ],
    generate: {
        routes: function () {
            return [
                '/users/1',
                '/users/2',
                '/users/3'
            ];
        }
    },
    loading: '~/components/loading.vue',
    head: {
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: [{
            rel: 'stylesheet',
            href: 'https://font.com',
        }]
    },
    plugins: ['~/plugins/vue-notifications']
}