/* eslint-disable */

export default ({ app }, inject) => {
  inject('throwNuxtError', error => {
    if (process.client) {
      $nuxt.error(error)
    }
  })
}
