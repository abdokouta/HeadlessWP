const langs = process.env.LANGS
const defaultLang = process.env.DEFAULTLANG
/**
 * i18n middleware - Handles lang switching and redirections to default lang
 * Inspired by Nuxt.js i18n example: https://nuxtjs.org/examples/i18n
 * @param  {Object} options.app       Vue app
 * @param  {Object} options.store     Vuex store
 * @param  {Object} options.route     Current route
 * @param  {Function} options.error     Error function
 * @param  {Function} options.redirect  Redirect function
 * @param  {Boolean} options.isHMR True if middleware was called by hotreload
 * @return {void}
 */
export default function({ app, store, route, error, redirect, isHMR }) {
  // Check if middleware called from hot-reloading, ignore
  const initLocale = store.state.currentLang
  if (isHMR) return
  // Get locale from params
  let locale = defaultLang
  langs.forEach(l => {
    const regexp = new RegExp(`^/${l.slug}`)
    if (route.path.match(regexp)) {
      locale = l.slug
    }
  })
  if (langs.findIndex(l => l.slug === locale) === -1) {
    return error({
      message: 'Page not found.',
      statusCode: 404
    })
  }

  // set i18n locale and commit to store
  app.i18n.locale = locale
  store.commit('SET_LANG', locale)

  if (!process.static) {
    // Some important redirects (redirect does not work when generating):
    // Remove default lang slug
    let path = route.fullPath
    if (path.endsWith(`/${defaultLang}`)) {
      redirect(path.replace(`/${defaultLang}`, '/'))
    } else if (path.startsWith(`/${defaultLang}/`)) {
      redirect(path.replace(`/${defaultLang}/`, '/'))
    }
    // Remove home slug
    if (path.endsWith(`/${process.env.HOMESLUG}`)) {
      return redirect(path.replace(`/${process.env.HOMESLUG}`, '/'))
    } else if (path.includes(`/${process.env.HOMESLUG}`)) {
      return redirect(path.replace(`/${process.env.HOMESLUG}`, ''))
    }
  }

  // only load new data if currentLang changes
  if (locale !== initLocale) {
    store.dispatch('loadDataServer', locale)
  }
}
