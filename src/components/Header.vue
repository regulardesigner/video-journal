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
  background-color: #4DBA87;
  justify-content: center;
  height: 4.4em;
  box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);
}
.brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.4em 1em 0.2em 0.6em;
  border-radius: 0.6em;

  &-icon {
    font-size: 2.2em;
    margin-right: 0.4em;
  }

  &-name {
    font-size: 1.6em;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
