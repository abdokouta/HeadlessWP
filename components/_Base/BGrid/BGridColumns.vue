<script>
import { classNameMixin } from '~/mixins/classname'
import BGridColumn from './BGridColumn.vue'

export default {
  name: 'BGridColumns',
  components: {
    BGridColumn
  },
  mixins: [classNameMixin],
  props: {
    columns: {
      type: Number,
      default: 1,
      required: false
    },
    items: {
      type: Number,
      default: 1,
      required: false
    }
  }
}
</script>

<template>
  <div class="BGrid__columns" :class="`BGrid__columns--has-${columns}`">
    <BGridColumn v-for="(item, key) in items" :key="key">
      <slot v-if="items !== 1" :name="'item-'+(key+1)" />
      <slot v-else />
    </BGridColumn>
  </div>
</template>

<style src="./BGrid.scss" lang="scss" />
