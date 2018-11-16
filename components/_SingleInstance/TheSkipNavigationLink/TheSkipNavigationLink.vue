<script>
export default {
  name: 'TheSkipNavigationLink'
}
</script>

<template>
  <BBtn :to="{ hash: 'main' }" class="TheSkipNavigationLink" naked>{{ $t('skipNavigation.text') }}</BBtn>
</template>

<style src="./TheSkipNavigationLink.scss" lang="scss" />
