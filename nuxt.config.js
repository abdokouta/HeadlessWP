import config from './config'
import {
    generateLocalizedRoutes,
    generateRoutesFromData
} from '@wearelucid/vuecid-helpers'

// TODO: Add your post types
const postTypes = [{
    type: 'pages'
}, {
    type: 'posts',
    paginated: true
}]

// TODO: Add your site title
const siteTitle = 'vuecid-nuxt'
const shortTitle = 'Vuecid Demo'
const siteDescription = 'Vuecid Nuxt demonstrated with a wonderful example'
const themeColor = '#ffffff'
    // TODO: Replace favicon source file in /static/icon.png (512px x 512px)
const iconSizes = [16, 32, 57, 60, 72, 76, 144, 120, 144, 152, 167, 180, 192, 512]

module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Loading…',
        htmlAttrs: {
            lang: config.env.DEFAULTLANG,
            dir: 'ltr' // define directionality of text globally
        },
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },

            // TODO: Check this info
            {
                name: 'author',
                content: 'Lucid – wearelucid.ch'
            },
            {
                name: 'theme-color',
                content: themeColor
            },

            // TODO: Add or remove google-site-verification
            {
                name: 'google-site-verification',
                content: 'LHfMKDN9ClPzK9o_YM_wg_W6Dz6Y_NeiWrW7T7W1GdU'
            }
        ],
        link: []
    },

    /*
     ** env: lets you create environment variables that will be shared for the client and server-side.
     */
    env: config.env,

    /*
     ** Customize the progress-bar color
     ** TODO: Set your desired loading bar color
     */
    loading: {
        color: '#0000ff'
    },

    /*
     ** CSS
     */
    css: ['@/assets/css/main.scss'],

    /*
     ** Plugins
     */
    plugins: [{
            src: '~/plugins/global.js'
        },
        {
            src: '~/plugins/throwNuxtError.js'
        },
        {
            src: '~/plugins/axios'
        },
        {
            src: '~/plugins/whatinput.js',
            ssr: false
        },
        {
            src: '~/plugins/i18n.js',
            injectAs: 'i18n'
        },
        {
            src: '~/plugins/vuex-router-sync'
        },
        {
            src: '~/plugins/vue-bows'
        },
        {
            src: '~/plugins/vue-breakpoint-component',
            ssr: false
        }
    ],

    /*
     ** Modules
     */
    modules: [
        '@nuxtjs/axios',
        // Google Analytics Module
        // Be aware that there is still a bug where the page title is not updated:
        // Demo: https://imgur.com/QSv4n12
        // Issue to watch/subscribe and fix this ASAP: https://github.com/nuxt-community/analytics-module/issues/8
        ['@nuxtjs/google-analytics', {
            id: config.googleAnalyticsId,
            // Opt out by default and enable tracking if user accepts cookies
            disabled: true,
            set: [{
                field: 'anonymizeIp',
                value: true
            }],
            debug: {
                // Uncomment the following line to debug GA in development environment (check your console output):
                // enabled: process.env.NODE_ENV === 'development',
                // Only send hit task in production. To test locally run `$ yarn netlifyify` (sets NODE_ENV to production).
                sendHitTask: process.env.NODE_ENV === 'production'
            }
        }],
        '@nuxtjs/sitemap', [
            '@nuxtjs/pwa', {
                icon: {
                    sizes: iconSizes
                },
                // Override certain meta tags
                meta: {
                    viewport: 'width=device-width, initial-scale=1',
                    favicon: true // Generates only apple-touch-icon
                },
                manifest: {
                    name: siteTitle,
                    lang: config.env.DEFAULTLANG,
                    dir: 'ltr',
                    short_name: shortTitle,
                    theme_color: themeColor,
                    start_url: '/',
                    display: 'standalone',
                    background_color: '#fff',
                    description: siteDescription
                }
            }
        ]
    ],

    /*
     ** Workbox config
     */
    workbox: {
        config: {
            debug: false,
            cacheId: siteTitle
        }
    },

    /*
     ** Axios config
     */
    axios: {
        baseURL: '/'
    },

    /*
     ** Generate
     */
    generate: {
        subFolders: true,
        routes: [
            ...generateRoutesFromData({
                langs: config.env.LANGS,
                postTypes: postTypes,
                dataPath: '../../../../../static/data',
                bundle: 'basic',
                homeSlug: config.env.HOMESLUG
            }),
            '/404'
        ]
    },

    /*
     ** Build configuration
     */
    build: {
        extend(config, {
            isDev,
            isClient
        }) {
            /*
             ** Run ESLINT on save
             */
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true
                    }
                })
            }
        }
    },

    /*
     ** Router
     */
    router: {
        linkActiveClass: 'is-active',
        linkExactActiveClass: 'is-active-exact',
        middleware: ['i18n'],
        extendRoutes(routes) {
            // extends basic routes (based on your files/folders in pages directory) with i18n locales (from our config.js)
            const newRoutes = generateLocalizedRoutes({
                // Remove 404 so it doesn't get localized
                baseRoutes: routes,
                defaultLang: config.env.DEFAULTLANG,
                langs: config.env.LANGS,
                routesAliases: config.routesAliases
            })

            // Clear array
            routes.splice(0, routes.length)

            // Push newly created routes
            routes.push(...newRoutes)
        }
    },

    /*
     ** Sitemap Configuration
     */
    sitemap: {
        path: '/sitemap.xml',
        hostname: config.env.FRONTENDURLPRODUCTION,
        cacheTime: 1000 * 60 * 15,
        // Enable me when using nuxt generate
        generate: true,
        // exclude: [
        //   '/secret',
        //   '/admin/**'
        // ],
        routes: [
            ...generateRoutesFromData({
                langs: config.env.LANGS,
                postTypes: postTypes,
                dataPath: '../../../../../static/data',
                bundle: 'basic',
                homeSlug: config.env.HOMESLUG
            })
        ]
    }
}