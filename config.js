// TODO: Add your urls
const urls = {
  backendUrlProduction: '',
  backendUrlLocal: 'https://headless.pixiedia.com',
  frontendUrlProduction: '',
  frontendUrlLocal: ''
}

// TODO: Add your langs
const langs = [
  {
    default: true, // Specify default lang
    lang: 'en',
    slug: 'en',
    locale: 'en_US',
    name: 'English'
  },
  {
    lang: 'ar',
    slug: 'ar',
    locale: 'ar_SA',
    name: 'Arabic'
  }
]

// TODO: Add your home slug from WordPress
const homeSlug = 'home'

// TODO: Add your default lang
const defaultLang = 'en'

const config = {
  env: {
    LANGS: langs,
    DEFAULTLANG: defaultLang,
    BACKENDURLPRODUCTION: urls.backendUrlProduction,
    BACKENDURLLOCAL: urls.backendUrlLocal,
    FRONTENDURLPRODUCTION: urls.frontendUrlProduction,
    FRONTENDURLLOCAL: urls.frontendUrlLocal,
    NETLIFYIFY: process.env.NETLIFYIFY,
    HOMESLUG: homeSlug
  },

  // TODO: Add your Google Analytics ID
  googleAnalyticsId: 'UA-74285401-2',

  // TODO: Add route aliases (for example for posts)
  // TODO: Add route aliases (for example for posts)
  routesAliases: {
    posts: {
      en: '/posts',
      ar: '/%d9%85%d9%86%d8%b4%d9%88%d8%b1%d8%a7%d8%aa'
    },
    'posts-slug': {
      en: '/posts/:slug',
      ar: '/articles/:slug'
    }
  },

  // TODO: Set data fetcher configuration (used in fetchData.js)
  fetcherConfig: {
    savePath: './static/data',
    // setting this to false may help debugging :-)
    compressJSON: true,
    perPage: 5000,
    languages: langs,
    //apiUrl: urls.backendUrlProduction + '/api'
    // Or fetch locally
    apiUrl: urls.backendUrlLocal + '/api'
  },
  // TODO: Set fetcher post configuration for paginated posts
  fetcherConfigPosts: {
    savePath: './static/data/posts',
    // setting this to false may help debugging :-)
    compressJSON: true,
    // arbitrary
    perPage: 5000,
    // this generates 1 file for each post (recommended for nice seo & generate handling)
    itemsPerPage: 1,
    // set true if you are sure that all posts are translated in the backend (navigation will then stay on pagination page)
    allPostsAreTranslated: false,
    languages: langs,
    //apiUrl: urls.backendUrlProduction + '/api'
    // Or fetch locally
    apiUrl: urls.backendUrlLocal + '/api'
  },
  // TODO: Set pagination
  // If we want paginated posts, we set the itemCount here (default 10)
  // Set itemCount to false if you want to display a full list of posts without any pagination
  paginationConfig: {
    postsPerPage: 10
  }
}

export default config
