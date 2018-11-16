<script>
import { mapGetters } from 'vuex'
// prettier-ignore
import { checkIfSlugIsHome, getPathFromUrl, removeHomeSlug } from '@wearelucid/vuecid-helpers'

export default {
  name: 'TheNavigation',
  computed: {
    ...mapGetters(['allLangs', 'defaultLang', 'currentLang']),
    ...mapGetters('data', ['getMenu', 'posts', 'getLangLinks']),
    ...mapGetters('ui', ['showMobileNavigation', 'navMenuOpen']),
    menu() {
       if (this.$i18n.locale === 'en') {
    return this.getMenu('main-menu-en')
  } else if(this.$i18n.locale === 'ar') {
    return this.getMenu('main-menu-ar')
  }
    },
    langLinks() {
      return this.getLangLinks()
    }
  },
  watch: {
    showMobileNavigation: function() {
      if (!this.showMobileNavigation) this.$store.dispatch('ui/closeMenu')
    }
  },
  methods: {
    path(url) {
      return this.$i18n.locale === 'en' ? url : `/${this.$i18n.locale}${url}`
    },
    toggleNavMenu() {
      this.$store.dispatch('ui/toggleMenu')
    },
    closeNavMenu() {
      this.$store.dispatch('ui/closeMenu')
    },
    checkSlugForHome(slug) {
      return checkIfSlugIsHome(slug)
    },
    getCorrectSlug(slug) {
      return this.checkSlugForHome(slug) ? '/' : `/${slug}`
    },
    getPathFromUrl(url) {
      return getPathFromUrl(url)
    },
    removeHomeSlug(url) {
      return removeHomeSlug(url)
    }
  }
}</script>

<template>
  <nav
    v-if="menu.items && allLangs"
    id="navigation"
    :class="[$options.name, navMenuOpen ? 'is-open' : '']"
    @keyup.esc="closeNavMenu"
  >
    <no-ssr>
      <BBurger class="TheTheNavigation__burger" :is-active="navMenuOpen" @click.native="toggleNavMenu" />
    </no-ssr>
    <ul :class="['TheNavigation__list', navMenuOpen ? 'is-open' : '']">
      <li
        v-for="(item, key) in menu.items"
        :key="`nav-item-${key}`"
        :class="['TheNavigation__item', item.children ? 'TheNavigation__item--has-children' : '']"
        @click="closeNavMenu"
      >
        <nuxt-link
          class="TheNavigation__link"
          :to="path(getCorrectSlug(item.object_slug))"
          :exact="checkSlugForHome(item.object_slug)"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="item.title" />
        </nuxt-link>
        <!-- TODO: We should be able to access the subList by tab (A11Y) -->
        <ul v-if="item.children" class="TheNavigation__sub-list">
          <li
            v-for="(child, childkey) in item.children"
            :key="`nav-item-child-${childkey}`"
            class="TheNavigation__item TheNavigation__item--child"
            @click="closeNavMenu"
          >
            <nuxt-link class="TheNavigation__link" :to="getPathFromUrl(child.url)">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="child.title" />
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li class="TheNavigation__item">
        <span
          v-for="(item, key) in langLinks"
          :key="`nav-lang-${key}`"
          class="TheNavigation__lang-item"
          @click="closeNavMenu"
        >
          <BBtn
            class="TheNavigation__link is-exact"
            naked
            :to="item && item.link ? removeHomeSlug(item.link) : $route.path"
            :title="item && item.name ? item.name : ''"
            :disabled="!item.link"
            type="nuxt-link"
            exact
          >{{ item.lang }}</BBtn>
        </span>
      </li>
    </ul>
  </nav>
</template>

<style src='./TheNavigation.scss' lang='scss' />
