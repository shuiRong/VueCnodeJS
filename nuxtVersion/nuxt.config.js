module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'VueCnodeJS(Nuxt.js)',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    css: ['element-ui/lib/theme-default/index.css'],
    build: {
        /*
        ** Run ESLINT on save
        */
        // extend(config, ctx) {
        //     if (ctx.dev && ctx.isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/
        //         })
        //     }
        // },
        vendor: ['axios', 'element-ui']
    },
    plugins: [{
        src: '~/plugins/element-ui',
        ssr: true
    }],
    bundleRenderer: {
        shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type)
    },
    loaders: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        }
    ],
    babel: {
        plugins: [['component', [
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-default'
            },
            'transform-async-to-generator',
            'transform-runtime'
        ]]],
        comments: true
    }
}
