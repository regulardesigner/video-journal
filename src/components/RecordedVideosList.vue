<template>
  <section class="recorded-videos">
    <div v-for="video in videos" :key="video.id" class="player">
      <video-reader :video-id="video.id" :source="video.blob" />
      <delete-video-options v-on:remove-video-id="passVideoId" :video-id="video.id" />
    </div>
  </section>
</template>

<script>
import DeleteVideoOptions from "@/components/DeleteVideo";
import VideoReader from '@/components/VideoReader';

export default {
  name: "recorded-videos-list",

  components: {
    DeleteVideoOptions,
    VideoReader
  },

  props: {
   videos: { type: Array, default: [] }
  },

  methods: {
    passVideoId(id) {
      this.$emit("remove-video-id", id)
    }
  }
};
</script>

<style lang="scss">
.recorded-videos {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  
  .player {
    display: flex;
    justify-content: center;
    position: relative;
    max-width: 512px;
    margin: 2em;
    border: 2px solid #f40;
    border-radius: 1.4em;
    box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);
    overflow: hidden;

    &:hover .play-button__label {
      opacity: 0.8;
    }

    .play-button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__label {
        color: white;
        font-weight: bold;
        font-size: 4em;
        display: block;
        position: absolute;
        opacity: 0;
        transition: all 0.4s ease;
      }
    }

    .delete {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      text-transform: uppercase;
      border: 2px solid white;
      padding: 0.3em 0.5em;
      border-radius: 0.4em;

      &:hover {
        border: 2px solid red;
        color: white;
      }
    }
  }
}
</style>
