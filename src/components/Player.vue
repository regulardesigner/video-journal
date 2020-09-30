<template>
  <section class="view-player">
    <div class="controlers">
      <div class="camera-view">
        <span class="camera-view__intructions">{{ playerText }}</span>
        <video ref="player" class="player" muted="muted"></video>
      </div>
      <button @click="startRecord" class="start">Start Rec</button>
      <button @click="stopRecord" class="stop">Stop Rec</button>
      <div class="audio">audio</div>
      <div class="canvas">canvas</div>
    </div>
    <!-- RecodedVideosList -->
    <recorded-videos-list :videos="savedVideos" />
  </section>
</template>

<script>
import constraints from "@/helpers/constraints.js";
import RecordedVideosList from "@/components/RecordedVideosList";

export default {
  name: "video-player",

  components: {
    RecordedVideosList
  },

  data() {
    return {
      playerStyle: "",
      playerText: "Please autorize the camera.",
      mediaRecorder: "",
      recordedChunks: [],
      savedVideos: []
    };
  },

  mounted() {
    this.videoPlayerInit();
  },

  methods: {
    videoPlayerInit() {
      const player = this.$refs.player;
      const stream = player.captureStream(25);
      const options = { mineType: "video/webm; codecs=vp9" };
      this.mediaRecorder = new MediaRecorder(stream, options);

      const ctx = this;

      if (navigator.mediaDevices) {
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
    },

    startRecord() {
      if (this.mediaRecorder.state === "inactive") {
        this.mediaRecorder.ondataavailable = this.saveVideoChunks;
        this.mediaRecorder.start();
      }
    },

    stopRecord() {
      if (this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        this.recordedChunks = [];
      }
    },

    saveVideoChunks(event) {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
        this.downloadVideo();
      } else {
        // ...
      }
    },

    downloadVideo() {
      var date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const blob = new Blob(this.recordedChunks, {
        type: "video/webm"
      });

      const videoFileName = `video_journal_${month}_${day}_${year}_${hours}h_${minutes}m_${seconds}s_.mp4`;

      const url = URL.createObjectURL(blob);

      this.savedVideos.push([url, videoFileName]);
    }
  }
};
</script>

<style lang="scss">
video {
  width: 100% !important;
  height: auto !important;
}
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
    margin: 2.4em;
    border: 1px solid white;
    border-radius: 1.4em;
    box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);
  }
  .audio,
  .canvas {
    display: none;
  }
}
</style>
