<template>
  <div>
    <select @change="handleEmojiSelect" v-model="selectedEmoji">
      <option value="😢">😢</option>
      <option value="😔">😔</option>
      <option value="😐">😐</option>
      <option value="😀">😀</option>
      <option value="🤩">🤩</option>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    selectedEmoji: {
      get() {
        return this.$store.state.selectedEmoji;
      },
      set(value) {
        this.$store.commit("SET_EMOJI", value);
      }
    }
  },
  methods: {
    handleEmojiSelect(event) {
      const selectedEmoji = event.target.value;
      this.$emit("emoji-selected", selectedEmoji);
    }
  }
};
</script>

<style>
select {
  font-size: 2em;
  padding: 0.2em;
  margin-right: 0.2em;
  border-radius: 0.4em;
  border: 1px solid #b7ead3;
  background-color: #4dba87;
  color: black;
}
</style>
