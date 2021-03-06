<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// prettier-ignore
import { checkAndGetHomeSlug, generateMetaInfo } from '@wearelucid/vuecid-helpers'

export default {
  data() {
    return {
      exampleContent: [
        {
          acf_fc_layout: 'section',
          title: this.$t('exampleContent.title'),
          content: this.$t('exampleContent.text')
        }
      ]
    }
  },
  computed: {
    ...mapGetters('data', ['options', 'getPageBySlug', 'getPreviewData']),
    ...mapState(['data', 'ui']),
    page() {
      // Check if we visit a preview from WordPress -> load related data
      if (this.ui.preview.active) {
        return this.getPreviewData()
      } else {
        return this.getPageBySlug(
          checkAndGetHomeSlug(this.$route.path, this.$i18n.locale)
        )
      }
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.saveCurrentPage(this.page)
      },
      immediate: true
    }
  },
  mounted() {
    // Type `localStorage.debug = true` in your console to get fancy logs
    this.log('Hello world')
  },
  methods: {
    ...mapActions('data', ['saveCurrentPage']),
    say: message => {
      alert(message)
    }
  },
  head() {
    return generateMetaInfo(
      this.options || false,
      this.page || false,
      this.$i18n.locale || 'de',
      this.$route.path || false
    )
  }
}
</script>

<template>
  <div v-if="page" class="Page">
    <BContentSection :modifiers="['centered']">
      <BHeading v-if="page.title" :level="1" has-clickable-anchor>{{ page.title }}</BHeading>
      <em>Let's render some content from json files generated by the <strong>API Fetcher</strong>:</em>
    </BContentSection>

    <BContentSection>
      <BFlexContent v-if="page.flex_content" :component-data="page.flex_content" />
    </BContentSection>

    <BContentSection :modifiers="['centered']">
      <em>We can also render content directly from json files in our <strong>locales</strong> folder:</em>
    </BContentSection>

    <BContentSection>
      <BFlexContent :component-data="exampleContent" />
    </BContentSection>

    <BContentSection style="background: #eee; padding-top: 2em; padding-bottom: 2em;">
      <BContentSection type="div" :modifiers="['centered']">
        <BHeading :level="2" has-clickable-anchor>Headings</BHeading>
        <BHeading :level="3">Heading Level 3</BHeading>
        <BHeading :level="3" has-clickable-anchor>Heading Level 3 with clickable anchor</BHeading>
        <BHeading :level="4" :rich-text="`Heading Level 4 with <em><strong>HTML</strong></em> <a href='/' target='_blank'>tags</a> passed as rich-text prop`" />
      </BContentSection>
    </BContentSection>

    <BContentSection :modifiers="['centered']">
      <BHeading :level="2" has-clickable-anchor>Buttons</BHeading>

      <BHeading :level="4">Links</BHeading>
      <BBtn :to="{ hash: 'buttons' }">Anchor</BBtn>
      <BBtn to="/beispielseite">Location</BBtn>
      <BBtn href="https://www.wearelucid.ch" external>External Page</BBtn><br>
      <em>(Note: Provide <code>href</code> and <code>external</code> attribute for external links)</em><br><br>

      <BHeading :level="4">Actions</BHeading>
      <BBtn disabled @click.native="say('Hello')">Disabled</BBtn>
      <BBtn @click.native="say('Hello')">Click Handler</BBtn>
      <BBtn button-type="submit" name="submit" value="submit-true">Form Submit</BBtn><br>

      <BHeading :level="4">Unstyled</BHeading>
      <BBtn to="/" naked>Naked</BBtn>
      <BBtn to="/" naked disabled>Naked Disabled</BBtn>
    </BContentSection>

    <BContentSection style="background: #eee; padding-top: 2em; padding-bottom: 2em;">
      <BContentSection type="div" :modifiers="['centered']">
        <BHeading :level="2" has-clickable-anchor>Sections</BHeading>
      </BContentSection>
      <BContentSection type="div" style="background: #ccc; text-align: center; padding-top: 4em; padding-bottom: 4em;">
        <em>Sections are full width by default</em>
      </BContentSection>
      <BContentSection type="div" :modifiers="['centered']" style="background: #ccc; text-align: center; padding-top: 4em; padding-bottom: 4em;">
        <em>Add a modifier for your custom section:</em><br><code>:modifiers="['centered']"</code>
      </BContentSection>
    </BContentSection>

    <BContentSection style="padding-top: 2em; padding-bottom: 2em;">
      <BContentSection type="div" :modifiers="['centered']">
        <BHeading :level="2" has-clickable-anchor>Grid</BHeading>
      </BContentSection>
      <BContentSection type="div" :modifiers="['centered']">
        <BGrid>
          <BGridRow>
            <BGridColumns>
              <div style="background-image: url('https://placekitten.com/800/300'); background-size: cover; background-position: center; height: 100px; width: 100%;" />
            </BGridColumns>
          </BGridRow>
          <BGridRow>
            <BGridColumns :columns="2" :items="2">
              <template slot="item-1"><div style="background-image: url('https://placekitten.com/600/350'); background-size: cover; background-position: center; height: 100px; width: 100%;" /></template>
              <template slot="item-2"><div style="background-image: url('https://placekitten.com/600/350'); background-size: cover; background-position: center; height: 100px; width: 100%;" /></template>
            </BGridColumns>
          </BGridRow>
          <BGridRow>
            <BGridColumns :columns="3" :items="4">
              <template slot="item-1"><div style="background-image: url('https://placekitten.com/400/200'); background-size: cover; background-position: center; height: 100px; width: 100%;" /></template>
              <template slot="item-2"><div style="background-image: url('https://placekitten.com/400/200'); background-size: cover; background-position: center; height: 100px; width: 100%;" /></template>
              <template slot="item-3"><div style="background-image: url('https://placekitten.com/400/200'); background-size: cover; background-position: center; height: 100px; width: 100%;" /></template>
              <template slot="item-4"><div style="background-image: url('https://placekitten.com/400/200'); background-size: cover; background-position: center; height: 100px; width: 100%;" /></template>
            </BGridColumns>
          </BGridRow>
        </BGrid>
      </BContentSection>
    </BContentSection>

    <BContentSection style="background: #eee; padding-top: 2em; padding-bottom: 2em;">
      <BContentSection type="div" :modifiers="['centered']">
        <BHeading :level="2" has-clickable-anchor>Breakpoints</BHeading>
        <p>Client-side, we have some information available:</p><br>
        <p><code>
          Current breakpoint: <strong>{{ ui.breakpointCurrent.name }}</strong><br>
          Previous breakpoint: <strong>{{ ui.breakpointPrevious.name }}</strong><br>
          Previous breakpoint was: <strong>{{ ui.breakpointCurrent.origin }}</strong><br>
        </code></p>
        <br>
        <BContentSection type="div">
          <BHeading :level="3">Conditional Displaying</BHeading>
          <em>It's almost always better to use CSS to display content based on the current viewport. But if you have to conditionally render content based on your window.innerWidth you can do so as follows. Just be aware that the static file will always render with <code>display:none;</code> (SEO).</em>
          <BContentSection
            v-show="ui.breakpointCurrent.iw <= ui.breakpoints.large"
            type="div"
            style="background: #bada55; text-align: center; padding-top: 2em; padding-bottom: 2em; margin-top: 2em;"
          >
            <p>👋 Hide me at large</p>
          </BContentSection>
          <BContentSection
            v-show="ui.breakpointCurrent.iw >= ui.breakpoints.medium"
            type="div"
            style="background: #bada55; text-align: center; padding-top: 2em; padding-bottom: 2em; margin-top: 2em;"
          >
            <p>👋 Show me at medium</p>
          </BContentSection>
        </BContentSection>
      </BContentSection>
    </BContentSection>
  </div>
</template>
