<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { generateMetaInfo } from '@wearelucid/vuecid-helpers'

export default {
  computed: {
    ...mapGetters('data', ['options', 'getPageBySlug', 'getPreviewData']),
    ...mapState(['data', 'ui']),
    page() {
      // Check if we visit a preview from WordPress -> load related data
      if (this.ui.preview.active) {
        return this.getPreviewData()
      } else {
        return this.getPageBySlug(this.$route.path)
      }
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
    return generateMetaInfo(
      this.options || false,
      this.page || false,
      this.$i18n.locale || 'en',
      this.$route.path || false
    )
  }
}
</script>

<template>
  <div v-if="page" class="Page">
    <BContentSection :modifiers="['centered']">
      <BHeading v-if="page.title" :level="1" has-clickable-anchor>{{ page.title }}</BHeading>
    </BContentSection>

    <BContentSection :modifiers="['centered']" style="background: #eee; text-align: center; padding: 1em;">
      <em>{{ page.content }}</em>
    </BContentSection>

    <BContentSection>
      <BFlexContent v-if="page.flex_content" :component-data="page.flex_content" />
    </BContentSection>
  </div>
</template>
