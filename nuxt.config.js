import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s',
    title: 'nuxt2-boiler-hasura',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    { src: '@/plugins/set_token.js', mode: 'client' },
    {
      src: '@/plugins/intitial_app.js',
      mode: 'client',
    },
   // { src: "~/plugins/apollo-cache.js" },'~/plugins/apollo-cache.js', 
  ],

  components: true,

  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/pwa'],

  modules: [ '@nuxtjs/apollo', '@nuxtjs/i18n'],

  i18n: {
    // fallbackLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'lo',
        file: 'lo.json',
        name: 'ພາສາລາວ',
      },
    ],
    strategy: 'no_prefix',
    langDir: 'locales/',
    lazy: false,
    defaultLocale: 'en',
  },
  apollo: {
   // errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
      default: {
        httpEndpoint: 'https://poetic-jaybird-10.hasura.app/v1/graphql',
             //  wsEndpoint: 'ws://poetic-jaybird-10.hasura.app/v1/graphql',
        // wsLinkOptions: {
        //   reconnect: true,
        // },
        defaultOptions: {
          $query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all",
            notifyOnNetworkStatusChange: true,
          },
        },
        // httpLinkOptions: {
        //   credentials: 'same-origin',
        // },
        httpLinkOptions: {
                  headers: {
                    'content-type': 'application/json',
                    'x-hasura-admin-secret': 'TYsSW0j8voCC0607NUQNQU70nrQxHske5ipcUJX8sumBwwlyHQoYR8WukbDoznx5',
                    // 'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,PATCH,OPTIONS,DELETE,POST',
                  },
                },
        tokenName: 'token',
        authenticationType: 'Bearer',
        persisting: false,
        // websocketsOnly: true,
      },
    },
  },
  // apollo: {
  //   cookieAttributes: {
  //     expires: 7,
  //   },

  //   defaultOptions: {
  //     $query: {
  //       loadingKey: 'loading',
  //       fetchPolicy: 'no-cache',
  //       errorPolicy: 'all',
  //     },
  //   },
  //   clientConfigs: {
  //     default: {
  //       // YOUR ENDPOINT OF YOUR APOLLO CLIENT OR HASURA ENDPOINT
  //       // httpEndpoint: 'https://big-baboon-88.hasura.app/v1/graphql',
  //       // wsEndpoint: 'wss://big-baboon-88.hasura.app/v1/graphql',
  //       httpEndpoint: 'https://poetic-jaybird-10.hasura.app/v1/graphql',
  //       wsEndpoint: 'ws://poetic-jaybird-10.hasura.app/v1/graphql',
  //       tokenName: 'access_token',
  //       includeNodeModules: true,
  //       authenticationType: 'Bearer',
  //       httpLinkOptions: {
  //         headers: {
  //           'content-type': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //           'Access-Control-Allow-Methods': 'GET,PUT,PATCH,OPTIONS,DELETE,POST',
  //         },
  //       },
  //     },
  //   },
  // },

  //FIREBASE INNITAL APP
  // firebase: {
  //   // YOUR FIREBASE CONFIG
  //   lazy: false,
  //   config: {
  //     apiKey: '',
  //     authDomain: '',
  //     projectId: '',
  //     storageBucket: '',
  //     messagingSenderId: '',
  //     appId: '',
  //   },
  //   services: {
  //     auth: {
  //       // persistence: 'local',
  //       initialize: {
  //         onAuthStateChangedAction: 'onAuthStateChanged',
  //       },
  //       ssr: true,
  //     },
  //   },
  // },

  pwa: {
    // workbox: {
    //  // importScripts: ['/firebase-auth-sw.js'],
    //   dev: process.env.NODE_ENV === 'development',
    // },
    workbox: {
      icon: false,
      // manifest: false,
      // importScripts: ["/firebase-auth-sw.js"],
      // dev: process.env.NODE_ENV === "development",
    },
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#595CBC",
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: "#DA5644",
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
