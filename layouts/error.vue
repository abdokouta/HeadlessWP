<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || '<%= messages.client_error %>'
    }
  },
  mounted() {
    this.log('this.error: ', this.error)
  },
  created() {
    let fired = false
    process.env.LANGS.map(x => {
      if (this.$route.path.startsWith(`/${x.slug}/`)) {
        if (!fired) {
          this.$router.push(`/${x.slug}/404`)
          fired = true
        }
      }
    })
    if (!fired) {
      this.$router.push('/404')
      fired = true
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>An error occurred</h1>
    <div v-if="statusCode === 404">
      <h1>404</h1>
      <p>
        {{ message }}
      </p>
    </div>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>
