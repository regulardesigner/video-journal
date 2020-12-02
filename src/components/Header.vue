<template>
  <header class="block-header">
    <span class="brand">
      <span class="brand-icon">😺 </span>
      <span class="brand-name">Video Journal</span>
    </span>
    <span class="navigation">
      <button @click="handleNavigationClick">capturer</button>
    </span>
  </header>
</template>

<script>
export default {
  name: "video-header",

  methods: {
    handleNavigationClick() {
      this.$emit("handle-navigation")
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/stylesheets/header.scss';
</style>
