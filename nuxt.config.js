module.exports = {
    mode: 'spa',
    modules: [
        '@nuxtjs/pwa'
    ],
    head: {
        title: 'lmgonzalves',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'lmgonzalves portfolio' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        '@/assets/scss/main.scss'
    ],
    loading: '~/components/Loading.vue',
    loadingIndicator: {
        name: 'cube-grid',
        color: 'white',
        background: '#2C323D'
    },
    build: {
        vendor: [
            'animejs',
            'lodash/throttle',
            '~/plugins/pieces.js',
            '~/plugins/segment.js',
            '~/plugins/text-scramble.js'
        ]
    }
};
