<template>
  <section class="recorded-videos">
    <div v-for="video in videos" :key="video.id" class="video">
      <a
        class="play-button"
        @click.prevent="displayVideo(video.blob, video.id)"
      >
        <span class="play-button__label">Play</span>
        <video :class="'video' + video.id" :ref="'video' + video.id">
          <source :src="convertBlobToUrl(video.blob)" type="video/webm" />
        </video>
      </a>
      <button class="delete" @click="warnBeforeVideoRemove(video.id)">🙀 Supprimer</button>
    </div>
    <div v-if="warnPopUp" class="warn popup">
        <h2>Supprimer la vidéo ?</h2>
        <button class="button delete" @click="removeSavedVideoFromId()">Supprimer</button>
        <button class="button cancel" @click="warnBeforeVideoRemove()">annuler</button>
      </div>
  </section>
</template>

<script>
export default {
  name: "recorded-videos-list",

  data() {
    return {
      warnPopUp: false,
      deleteVideoId: null
    }
  },

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
      const url = URL.createObjectURL(blob);
      return url;
    },

    warnBeforeVideoRemove(id) {
      if (this.warnPopUp) {
        this.warnPopUp = false
        this.deleteVideoId = null
      } else {
        this.warnPopUp = true
        this.deleteVideoId = id
      }
    },

    removeSavedVideoFromId() {
      this.$emit("remove-video-id", this.deleteVideoId);
      this.deleteVideoId = null
      this.warnPopUp = false
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
      bottom: 0.5em;
      text-transform: uppercase;
      border: none;
      padding: 0.4em 0.8em 0.3em 0.6em;
      border-radius: 0.4em;

      &:hover {
        background: red;
        color: white;
      }
    }
  }
}

.warn {
  position: fixed;
  top: 50%;
  background-color: white;
  padding: 2em;
  border-radius: 1em;
  border: 2px solid red;
  box-shadow: 0 0.8em 2em 0.8em rgba(0, 0, 0, 0.1);

  .button {
    display: block;
    width: 100%;
    text-transform: uppercase;
    padding: 0.4em 0.8em 0.3em 0.6em;
    border-radius: 0.4em;

    &:hover {
      color: white;
    }
  }
  
  .delete {
    border: 1px solid red;

    &:hover {
      background: red;
    }
  }
  .cancel {
    border: 1px solid grey;
    margin-top: 1rem;

    &:hover {
      background: grey;
    }
  }
}
</style>
