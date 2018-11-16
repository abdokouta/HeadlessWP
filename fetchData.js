import fetcher from '@wearelucid/api-fetcher'
import config from './config'
// prettier-ignore
import {
    flattenACF,
    removeFieldsFromPost,
    decodeTitle,
    reduceBundle
} from '@wearelucid/vuecid-helpers'

// TODO: setup your fetcher settings (posts, pages, options, menus, paginated posts ect.)

fetcher.log.printText('HeadlessWP')
fetcher.log.printConfig(config.fetcherConfig)

// comment if you don't want paginated posts
fetcher.paginate(
  'posts',
  {
    posts: {
      method: fetcher.getWPPostType,
      postType: 'posts',
      transforms: [removeFieldsFromPost, decodeTitle]
    }
  },
  config.fetcherConfigPosts
)

fetcher.bundle(
  'basic',
  {
    // Reduced bundle for all pages
    pages: {
      method: fetcher.getWPPostType,
      postType: 'pages',
      transforms: [flattenACF, removeFieldsFromPost, decodeTitle]
    },
    // Reduced bundle for all posts
    posts: {
      method: fetcher.getWPPostType,
      postType: 'posts',
      transforms: [flattenACF, removeFieldsFromPost, decodeTitle, reduceBundle]
    },
    menus: {
      method: fetcher.getWPMenus
    },
    'options-global': {
      method: fetcher.getWPOptionsPage,
      slug: 'global-site-settings'
    },
    'options-en': {
      method: fetcher.getWPOptionsPage,
      slug: 'en-site-settings'
    },
    'options-ar': {
      method: fetcher.getWPOptionsPage,
      slug: 'ar-site-settings'
    }
  },
  config.fetcherConfig
)
