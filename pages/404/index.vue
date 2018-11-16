<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('data', ['getPageBySlug']),
    page() {
      return this.getPageBySlug(this.$route.path)
    },
    homePath() {
      return this.$i18n.locale === process.env.DEFAULTLANG
        ? '/'
        : `/${this.$i18n.locale}/`
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.saveCurrentPage(this.page)
      }
    }
  },
  mounted() {
    this.saveCurrentPage(this.page)
  },
  methods: mapActions('data', ['saveCurrentPage']),
  head() {
    return {
      title: this.$t('error.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('error.message')
        }
      ]
    }
  }
}
</script>

<template>
  <div v-if="page" class="Page">
    <BContentSection :modifiers="['centered']">
      <BHeading :level="1">{{ $t('error.title') }}</BHeading>
      <p style="margin-bottom: 1em;">{{ $t('error.message') }} {{ $t('error.404') }}</p>
      <BBtn :to="homePath">{{ $t('error.link') }}</BBtn>
    </BContentSection>
  </div>
</template>
