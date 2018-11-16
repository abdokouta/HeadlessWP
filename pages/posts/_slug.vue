<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { generateMetaInfo, findPostInArray } from '@wearelucid/vuecid-helpers'
import PostDetail from '~/components/PostDetail/PostDetail.vue'
import getDataServer from '~/api/getDataServer'

export default {
  components: {
    PostDetail
  },
  computed: {
    ...mapGetters('data', [
      'posts',
      'options',
      'getPreviewData',
      'getCompletePostBySlug'
    ]),
    ...mapGetters('ui', ['currentPaginationPage']),
    ...mapState(['data', 'ui'])
  },
  watch: {
    $route: {
      handler: function() {
        this.saveCurrentPage(this.completePost)
      },
      immediate: true
    }
  },
  async asyncData(ctx) {
    let completePost = {}
    let response = {}

    if (process.client) {
      if (ctx.app.store.state.ui.preview.active) {
        // Check if wer are visiting a preview
        return this.getPreviewData()
      } else {
        // Otherwise fetch it from the corresponding post JSON from the static folder.
        response = await ctx.app.$axios.$get(
          // prettier-ignore
          `/data/posts/posts.${ctx.app.store.getters.currentLang}.${ctx.params.slug}.json`
        )
        completePost = findPostInArray(response.items, ctx.params.slug)
        return { completePost }
      }
    } else {
      // prettier-ignore
      response = await getDataServer({
        name: `posts/posts.${ctx.app.store.getters.currentLang}.${ctx.params.slug}`
      })
      completePost = findPostInArray(response.items, ctx.params.slug)
      return { completePost }
    }
  },
  methods: {
    ...mapActions('data', ['saveCurrentPage']),
    getPageSlugOfCurrentPost() {
      // The page slug can differ in a multilang project, here we get the correct slug to pass to the postDetail view.
      return this.$route.path.slice(0, -(this.$route.params.slug.length + 1))
    }
  },
  head() {
    return generateMetaInfo(
      this.options || false,
      this.completePost || false,
      this.$i18n.locale || 'en',
      this.$route.path || false
    )
  }
}
</script>

<template>
  <PostDetail v-if="completePost" :post="completePost || {}" :current-pagination-page="currentPaginationPage" :page-slug="getPageSlugOfCurrentPost()" />
</template>
