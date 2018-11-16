import getDataServer from '~/api/getDataServer'

export const state = () => ({
  // Get a list of all languages
  langs: process.env.LANGS,
  defaultLang: process.env.DEFAULTLANG,
  currentLang: process.env.DEFAULTLANG
})

export const actions = {
  nuxtServerInit({ dispatch }) {
    return dispatch('loadDataServer')
  },
  loadDataServer({ commit, state }) {
    commit('data/DATA_LOAD')
    return getDataServer({
      lang: state.currentLang,
      name: 'basic'
    }).then(data => {
      commit('data/DATA_SAVE', data)
    })
  },
  throwError(context, payload) {
    // Throw me an error, see '~/plugins/throwNuxtError'
    this.$throwNuxtError({
      message: payload.message ? payload.message : '',
      statusCode: payload.statusCode ? payload.statusCode : ''
    })
  }
}

export const mutations = {
  SET_LANG(state, lang) {
    state.currentLang = lang
  }
}

export const getters = {
  allLangs: state => (state.langs ? state.langs : false),
  defaultLang: state => (state.defaultLang ? state.defaultLang : false),
  currentLang: state => (state.currentLang ? state.currentLang : false)
}
