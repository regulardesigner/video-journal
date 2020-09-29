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
    <section class="recorded-videos">
      <div v-for="(savedVideo, index) in savedVideos" :key="savedVideo[1]" class="video">
        <a class="play-button" @click.prevent="displayVideo(savedVideo[0], index)" :href="savedVideo[0]">
          <span class="play-button__label">play</span>
          <video :ref="'video'+index" width='300' height="300">
            <source :src="savedVideo[0]" type="video/webm">
          </video>
        </a>
      </div>
    </section>
  </section>
</template>

<script>
import constraints from "@/helpers/constraints.js";

export default {
  name: "video-player",

  data() {
    return {
      playerStyle: "",
      playerText: "Please autorize the camera.",
      mediaRecorder: '',
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
      if (this.mediaRecorder.state === 'inactive') {
        this.mediaRecorder.ondataavailable = this.saveVideoChunks;
        this.mediaRecorder.start();
      }
    },

    stopRecord() {
      if (this.mediaRecorder.state === 'recording') {
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

      this.savedVideos.push([url, videoFileName])
    },

    displayVideo(blob, id) {
      const video = this.$refs['video'+id][0];
      video.src = blob;
      if(video.paused) {
        video.play();
      } else {
        video.pause();
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
.recorded-videos {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  .video {
    margin: 2em;
    border: 2px solid #f40;
    border-radius: 1.4em;
    width: 300px;
    height: 300px;
    box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);
    overflow: hidden;

    &:hover .play-button__label {
      opacity: .8;
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
        transition: all .4s ease;
      }
    }
  }
}

</style>
