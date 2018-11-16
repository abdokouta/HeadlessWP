import Vue from 'vue'
// prettier-ignore
import {
    checkIfWordPressPreview,
    cleanSlug,
    getPreviewData,
    getPathFromUrl
} from '@wearelucid/vuecid-helpers'

export const state = () => ({
  previewData: {},
  data: {},
  loading: false,
  loaded: false,
  error: false
})

export const actions = {
  saveCurrentPage({ dispatch, commit }, payload) {
    if (!payload) {
      // prettier-ignore
      dispatch('throwError', {
                statusCode: 404,
                message: 'Page not found'
            }, {
                root: true
            })
    } else {
      commit('DATA_SAVE_CURRENT_PAGE', payload)
    }
  },
  checkAndLoadWordPressPreview({ dispatch, commit, rootState }) {
    // Check if query strings of current route indicate a WordPress preview.
    if (checkIfWordPressPreview(rootState.route)) {
      // Load preview data
      dispatch('loadPreviewData')
    } else {
      commit('ui/PREVIEW', false, {
        root: true
      })
    }
  },
  loadPreviewData({ dispatch, commit, rootState }) {
    commit('DATA_LOAD')

    // Save query strings
    const wpnonce = rootState.route.query.preview_nonce
    const previewId = rootState.route.query.preview_id
    const previewUrl = `/api/previews/v1/preview/?id=${previewId}&_wpnonce=${wpnonce}`

    return getPreviewData(process.env.BACKENDURLPRODUCTION, previewUrl)
      .then(response => {
        if (response === null) {
          throw {}
        } else {
          commit('PREVIEW_DATA_SAVE', response)
          commit('ui/PREVIEW', true, {
            root: true
          })
        }
      })
      .catch(error => {
        commit('DATA_CANCEL_LOAD')
        commit('ui/PREVIEW', false, {
          root: true
        })
        // prettier-ignore
        dispatch('throwError', {
                    message: error.response ? error.response.data.message : 'Error',
                    statusCode: error.response ? error.response.data.data.status : ''
                }, {
                    root: true
                })
      })
  }
}

export const mutations = {
  DATA_LOAD(state) {
    state.loading = true
  },
  DATA_CANCEL_LOAD(state) {
    state.loading = false
  },
  DATA_ERROR(state, error) {
    state.error = error
    state.loading = false
  },
  DATA_SAVE_PAGINATED_ITEMS(state, payload) {
    state.loaded = true
    state.loading = false
    state.error = false
    state.data[`${payload.type}-paginated`] = {
      currentItemList: payload.data.items,
      paginatedProps: payload.data.paginatedProps
    }
  },
  DATA_SAVE_CURRENT_PAGE(state, page) {
    // We have to use Vue.set() here, see: https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    Vue.set(state.data, 'currentPage', page)
    // state.data.currentPage = page
  },
  DATA_SAVE(state, data) {
    state.data = data
    state.loaded = true
    state.loading = false
    state.error = false
  },
  PREVIEW_DATA_SAVE(state, data) {
    state.previewData = data
    state.loaded = true
    state.loading = false
    state.error = false
  }
}

export const getters = {
  /**
   * Getters that are a function must be called like this this.getMenu('main')
   */
  loaded: state => state.loaded,
  loading: state => state.loading,
  pages: state => (state.data && state.data.pages ? state.data.pages : false),
  posts: state => (state.data && state.data.posts ? state.data.posts : false),
  currentPage: state =>
    state.data && state.data.currentPage ? state.data.currentPage : false,
  options: (state, getters, rootState) => {
    return {
      global:
        state.data && state.data['options-global']
          ? state.data['options-global']
          : false,
      localized:
        state.data && state.data[`options-${rootState.currentLang}`]
          ? state.data[`options-${rootState.currentLang}`]
          : false
    }
  },
  getPaginatedItemType: state => type => {
    if (state.data && state.data[`${type}-paginated`])
      return state.data[`${type}-paginated`]
  },
  getMenu: state => location => {
    if (!state.loaded) return false
    if (!state.data.menus || !state.data.menus[location]) return false
    return state.data.menus[location].menu
  },
  getPreviewData: state => () => {
    return state.previewData
  },
  getPageBySlug: state => slug => {
    if (!state.loaded) return false
    if (!state.data.pages) return false
    return state.data.pages.find(p => p.uri === cleanSlug(slug))
  },
  getCompletePostBySlug: state => slug => {
    if (!state.loaded) return false
    if (!state.data.completePosts) return false
    return state.data.completePosts.find(p => p.slug === cleanSlug(slug))
  },
  getPageById: state => id => {
    if (!state.loaded) return false
    if (!state.data.pages) return false
    return state.data.pages.find(p => p.id === id)
  },
  getPostBySlug: state => slug => {
    if (!state.loaded) return false
    if (!state.data.posts) return false
    return state.data.posts.find(p => p.slug === cleanSlug(slug))
  },
  getParentsById: state => id => {
    if (!state.loaded) return false
    if (!state.data.pages) return false

    const parentsArray = []
    let currentPage = state.data.pages.find(p => p.id === id)
    parentsArray.unshift(currentPage)

    while (currentPage.parent) {
      const parentPage = state.data.pages.find(p => p.id === currentPage.parent)
      parentsArray.unshift(parentPage)
      currentPage = parentPage
    }

    return parentsArray
  },
  getLangLinks: state => () => {
    if (
      !state.loaded ||
      !state.data.currentPage ||
      !state.data.currentPage.wpml ||
      !state.data.currentPage.wpml.translations
    ) {
      return process.env.LANGS
    } else {
      // Go through all langs
      let items = process.env.LANGS
      items.map(l => {
        let translation = state.data.currentPage.wpml.translations.find(
          o => o.lang === l.lang
        )
        // Save link if we have a translation:
        l.link =
          translation && translation.permalink
            ? getPathFromUrl(translation.permalink)
            : ''

        // Save pageSlug if we have a translation:
        // We need this for "router-link exact path matching" if we have a $route.query like "?page=1"
        // As soon as this PR get merged, we can remove this extra code: https://github.com/vuejs/vue-router/pull/2278
        // Also remove the extra "$route.path.includes(item.pageSlug)" from Navigation.vue if you're on it :)
        l.pageSlug = translation && translation.slug ? translation.slug : false
      })
      return items
    }
  }
}
