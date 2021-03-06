import Vue from 'vue'
import breakpoints from '~/assets/css/_export.breakpoints.scss'

import { Ctor } from 'vue-breakpoint-component'

for (let key in breakpoints) {
  if (breakpoints.hasOwnProperty(key)) {
    // We have to prefix those, otherwise the plugin get's confused with default names (susch as `small`) and stops working
    const prefixedName = `mq-${key}`
    const query = `(min-width: ${breakpoints[key]})`
    breakpoints[prefixedName] = query
  }
}

// There is also a model available, but we don't need that
// export { Model } from 'vue-breakpoint-component'

const config = {
  debounceTime: 20,
  experimental: false,
  breakpoints: breakpoints
}

const components = { ...new Ctor(Vue, config) }

export default () => {
  Vue.component('VBreakpoint', components.VBreakpoint)
}
