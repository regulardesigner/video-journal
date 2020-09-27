<template>
  <header class="block-header">
    <span class="brand">
      <span class="brand-icon">😺 </span>
      <span class="brand-name">Video Journal</span>
    </span>
  </header>
</template>

<script>
export default {
  name: "video-header"
};
</script>

<style lang="scss">
.block-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brand {
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.4em 1em 0.2em 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);

  &-icon {
    font-size: 1.8em;
    margin-right: 0.4em;
  }

  &-name {
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
