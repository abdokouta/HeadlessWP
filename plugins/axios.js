/* eslint-disable */

// You can extend axios with this plugin. For example, if you need to customize axios by registering interceptors and changing global config.

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    const message = error.response && error.response.statusText ? error.response.statusText : ''
    if (typeof window !== 'undefined') {
      $nuxt.error({ statusCode: code, message: message })
    }
  })
}
