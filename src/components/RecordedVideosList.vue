<template>
  <section class="recorded-videos">
    <div v-for="video in videos" :key="video.id" class="video">
      <a
        class="play-button"
        @click.prevent="displayVideo(video.blob, video.id)"
      >
        <span class="play-button__label">play</span>
        <video :class="'video' + video.id" :ref="'video' + video.id">
          <source :src="convertBlobToUrl(video.blob)" type="video/webm" />
        </video>
      </a>
      <button @click="handleEmit(video.id)">🙀 Delete</button>
    </div>
  </section>
</template>

<script>

export default {
  name: "recorded-videos-list",

  props: {
    videos: { type: Array, default: [] }
  },

  methods: {
    displayVideo(blob, id) {
      const video = this.$refs["video" + id][0];
      video.src = this.convertBlobToUrl(blob);
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },

    convertBlobToUrl(blob) {
      const url = URL.createObjectURL(blob)
      return url
    },

    handleEmit(id) {
      this.$emit('remove-video-id', id)
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
  .video {
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
  }
}
</style>
