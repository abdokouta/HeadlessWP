<script>
export default {
  name: 'Logo',
  computed: {
    homePath() {
      return this.$i18n.locale === process.env.DEFAULTLANG
        ? '/'
        : `/${this.$i18n.locale}/`
    }
  }
}
</script>

<template>
  <div class="Logo">
    <nuxt-link class="Logo__link" :to="homePath" aria-label="Go to home page">
      <img class="Logo__image" src="~/static/media/logo.png" alt="Logo Image">
    </nuxt-link>
  </div>
</template>

<style src='./Logo.scss' lang='scss' />
