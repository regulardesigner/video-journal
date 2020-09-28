<template>
  <section class="view-player">
    <div class="controlers">
      <div class="camera-view">
        <span class="camera-view__intructions">{{ playerText }}</span>
        <video ref="player" class="player"></video>
      </div>
      <div class="audio">audio</div>
      <div class="canvas">canvas</div>
    </div>
  </section>
</template>

<script>
import constraints from "@/helpers/constraints.js";

export default {
  name: "video-player",

  data() {
    return {
      playerStyle: "",
      playerText: "Please autorize the camera."
    };
  },

  mounted() {
    this.videoPlayer();
  },

  methods: {
    videoPlayer() {
      const player = this.$refs.player;

      if (navigator.mediaDevices) {
        const ctx = this
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(mediaStream) {
            ctx.playerText = "";
            player.srcObject = mediaStream;
            player.onloadedmetadata = () => {
              player.play();
            };
          })
          .catch(function(err) {
            console.error(err.name + ": " + err.message);
            ctx.playerText = "☠️ Outch, you'll need a camera.";
            ctx.playerStyle = "error";
          });
      } else {
        ctx.playerText = "☠️ Outch, you'll need a camera.";
        ctx.playerStyle = "error";
      }
    }
  }
};
</script>

<style lang="scss">
.controlers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .camera-view {
    display: flex;
    align-items: center;
    justify-content: center;

    &__intructions {
      position: absolute;
    }

    &.error span {
      color: rgba(255, 255, 255, 0.9);
    }
    span {
      font-size: 1.2em;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .player {
    margin: 2em;
    border: 1px solid white;
    border-radius: 1.4em;
    width: 300px;
    height: 300px;
    box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);
  }
  .audio,
  .canvas {
    display: none;
  }
}
</style>
