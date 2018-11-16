<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'TheFooter',
  components: {
    CookieLaw
  },
  methods: {
    enableTracking() {
      this.$ga.enable()
      this.$ga.page(this.$router)
    }
  }
}
</script>

<template>
  <footer class="TheFooter">
    <no-ssr>
      <CookieLaw
        button-class="BBtn"
        :button-text="$t('cookieLaw.buttonText')"
        :button-link="'#'"
        :button-link-text="$t('cookieLaw.buttonLinkText')"
        :message="$t('cookieLaw.message')"
        @accept="enableTracking()"
      />
    </no-ssr>
  </footer>
</template>

<style src="./TheFooter.scss" lang="scss">
</style>

<style src="~/components/_Base/BBtn/BBtn.scss" lang="scss" />
