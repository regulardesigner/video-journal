<template>
  <div id="app">
    <video-header />
    <video-player />
    <video-footer />
  </div>
</template>

<script>
import VideoHeader from "./components/Header.vue";
import VideoPlayer from "./components/Player.vue";
// import VideoRecordedList from "./components/RecordedVideosList.vue";
import VideoFooter from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    VideoHeader,
    VideoPlayer,
    // VideoRecordedList,
    VideoFooter
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-size: 62.5%;
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
</style>
