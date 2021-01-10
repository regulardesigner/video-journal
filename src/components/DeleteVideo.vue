<template>
  <div class="delete__control">
    <button class="delete" @click="warnBeforeVideoRemove(videoId)">🗑️</button>
    
    <div v-if="warnPopUp" class="warn popup">
      <button class="button button--delete" @click="removeSavedVideoFromId()">
        Supprimer
      </button>
      <button class="button button--cancel" @click="warnBeforeVideoRemove()">
        annuler
      </button>
    </div>
  </div>
</template>

<script>
import { indexedDB } from "@/mixins/indexedDB";

export default {
  name: "delete-video-options",

  data() {
    return {
      warnPopUp: false,
    };
  },

  props: {
    videoId: { type: Number, required: true }
  },

  mixins: [indexedDB],

  methods: {
    warnBeforeVideoRemove(id) {
      console.log('VIDEO ID:', id)
      if (this.warnPopUp) {
        this.warnPopUp = false;
      } else {
        this.warnPopUp = true;
      }
    },

    removeSavedVideoFromId() {
      console.log('DELETE VIDEO ID:', this.videoId)
      this.$emit("remove-video-id", this.videoId);
      // this.deleteVideo(this.videoId)
      this.warnPopUp = false;
    }
  }
};
</script>

<style lang="scss">
.warn {
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  background-color: white;
  padding: 1em;
  border-radius: 0.4rem;
  min-width: 10rem;

  .button {
    display: block;
    width: 100%;
    text-transform: uppercase;
    padding: 0.4em 0.8em 0.3em 0.6em;
    border-radius: 1em;

    &:hover {
      color: white;
    }

    &--delete {
      border: 1px solid red;

      &:hover {
        background: red;
      }
    }
    
    &--cancel {
      border: 1px solid grey;
      margin-top: .5rem;

      &:hover {
        background: grey;
      }
    }
  }
}
</style>
