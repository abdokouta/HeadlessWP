<script>
import { mapState, mapActions } from 'vuex'
import TheSkipNavigationLink from '~/components/_SingleInstance/TheSkipNavigationLink/TheSkipNavigationLink.vue'
import TheHeaderBar from '~/components/_SingleInstance/TheHeaderBar/TheHeaderBar.vue'
import TheFooter from '~/components/_SingleInstance/TheFooter/TheFooter.vue'

export default {
  components: {
    TheSkipNavigationLink,
    TheHeaderBar,
    TheFooter
  },
  computed: mapState(['ui']),
  watch: {
    // Watch changes to $route and check if the page is viewed from a WordPress preview
    $route: {
      handler: 'checkAndLoadWordPressPreview'
    }
  },
  mounted() {
    this.checkAndLoadWordPressPreview()
  },
  methods: {
    ...mapActions('data', ['checkAndLoadWordPressPreview']),
    // Update current breakpoint in ui store
    updateBreakpoint(breakpoint) {
      this.$store.commit('ui/UPDATE_BREAKPOINT', breakpoint)
    },
    setFocusOnMain() {
      // Props to https://www.bignerdranch.com/blog/web-accessibility-skip-navigation-links/
      this.$refs.main.setAttribute('tabindex', -1)
      this.$refs.main.addEventListener('blur focusout', () => {
        this.$refs.skipnavigationlink.removeAttr('tabindex')
      })
      this.$refs.main.focus()
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.currentLang
      }
    }
  }
}</script>

<template>
  <div class="Layout">
    <no-ssr><VBreakpoint @change="updateBreakpoint($event)" /></no-ssr>
    <BAlert v-if="ui.preview.active" :is-error="ui.preview.error" :message="ui.preview.error ? `Preview Error: ${ui.preview.errorCode}` : 'Preview'" />
    <TheSkipNavigationLink ref="skipnavigationlink" @click.native="setFocusOnMain()" />
    <TheHeaderBar />
    <main id="main" ref="main" role="main" class="Layout__content">
      <nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<style src='./layout.scss' lang='scss' />
