<script>
import config from '~/config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { generateMetaInfo } from '@wearelucid/vuecid-helpers'
import Paginate from '~/components/Paginate/Paginate.vue'
import PostsList from '~/components/PostsList/PostsList.vue'

export default {
  components: {
    Paginate,
    PostsList
  },
  data: () => ({
    // postPerPage
    postsPerPage: config.paginationConfig.postsPerPage
  }),
  computed: {
    ...mapGetters('data', [
      'posts',
      'options',
      'getPageBySlug',
      'getPreviewData'
    ]),
    ...mapGetters('ui', ['currentPaginationPage']),
    ...mapState(['data', 'ui']),
    currentPostsList() {
      // Returns the currentPostList based on your postsPerPage and the currentPaginationPage
      const currentPage = this.currentPaginationPage
        ? this.currentPaginationPage
        : 1
      if (this.posts)
        return this.posts.slice(
          (currentPage - 1) * this.postsPerPage,
          currentPage * this.postsPerPage
        )
    },
    pagesTotal() {
      // Returns a number of how manye pages there are in total (ceiled)
      if (this.posts) return Math.ceil(this.posts.length / this.postsPerPage)
    },
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
    $route: function() {
      // Check after each route change – query or current set pagination from store
      this.$store.dispatch(
        'ui/saveCurrentPaginationPage',
        this.$route.query.page
          ? parseInt(this.$route.query.page)
          : this.currentPaginationPage
      )
      this.saveCurrentPage(this.page)
    }
  },
  created() {
    // Check upon creation – set to 1 to ensure lang switch works
    this.$store.dispatch(
      'ui/saveCurrentPaginationPage',
      this.$route.query.page ? parseInt(this.$route.query.page) : 1
    )
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
}</script>

<template>
  <div class="Posts">
    <BContentSection :modifiers="['centered']">
      <BHeading v-if="page" :level="1">{{ page.title }}</BHeading>
    </BContentSection>
    <!-- if there is a postsPerPage paginate posts -->
    <Paginate
      v-if="currentPostsList && currentPostsList.length && postsPerPage"
      :pages-total="pagesTotal"
      :item-list="currentPostsList"
      :current-pagination-page="currentPaginationPage"
    />
    <!-- if there is no postsPerPage we display all posts at once -->
    <PostsList v-if="posts && !postsPerPage" :posts="posts" />
  </div>
</template>
