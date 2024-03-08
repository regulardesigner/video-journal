<template>
  <header class="block-header">
    <span class="brand">
      <header-emoji-select @emoji-selected="handleEmojiSelect" />
      <span class="brand-name">Video Journal</span>
    </span>
    <span class="navigation">
      <button @click="handleNavigationClick">capturer</button>
    </span>
  </header>
</template>

<script>
import HeaderEmojiSelect from "./HeaderEmojiSelect.vue";

export default {
  name: "video-header",

  components: {
    HeaderEmojiSelect
  },

  methods: {
    handleNavigationClick() {
      this.$emit("handle-navigation");
    }
  }
};
</script>

<style>
.block-header {
  position: absolute;
  width: 100vw;
  z-index: 200;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #4dba87;
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
}

.brand-icon {
  font-size: 2.2em;
  margin-right: 0.4em;
}

.brand-name {
  font-size: 1.6em;
  font-weight: bold;
  text-transform: uppercase;
}

.navigation {
  position: absolute;
  right: 1rem;
}
</style>
