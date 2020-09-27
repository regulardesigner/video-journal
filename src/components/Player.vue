<template>
  <section class="view-player">
    <div class="controlers">
      <div ref="player" class="player" :class="playerStyle">
        <span>{{ playerText }}</span>
      </div>
      <div class="audio">audio</div>
      <div class="canvas">canvas</div>
    </div>
  </section>
</template>

<script>
import Loader from "./Loader.vue";

export default {
  name: "video-player",

  data() {
    return {
      playerStyle: "",
      playerText: "Please autorize the camera."
    };
  },

  mounted() {
    console.log(this.$refs.player);
    this.videoPlayer();
  },

  methods: {
    videoPlayer() {
      const player = this.$refs.player;

      const constraints = {
        audio: true,
        video: {
          facingMode: "user",
          width: { exact: 512 },
          height: { exact: 512 }
        }
      };

      if (!navigator.mediaRecorder) {
        this.playerText = "☠️ Outch, you'll need a camera.";
        this.playerStyle = "error";
      } else {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(mediaStream) {
            player.srcObject = mediaStream;
            player.onloadedmetadata = () => {
              player.play();
            };
          })
          .catch(function(err) {
            console.error(err.name + ": " + err.message);
          });
      }
    }
  },

  components: {
    Loader
  }
};
</script>

<style lang="scss">
.controlers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .player {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em;
    border: 1px solid white;
    border-radius: 1.4em;
    width: 300px;
    height: 300px;
    box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);

    &.error {
      background-image: url("../assets/error.gif");
      box-shadow: inset 0 0 60px 20px black;
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
  .audio,
  .canvas {
    display: none;
  }
}
</style>
