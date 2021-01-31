<template>
  <section class="view-player">
    <div v-show="isNavigationOpen" class="camera__wrapper">
      <div class="controlers">
        <div class="camera-view">
          <canvas ref="canvas" class="player"></canvas>
          <video ref="player" class="canvas" muted="muted"></video>
          <audio ref="audio" class="audio"></audio>
        </div>
        <div class="buttons-group">
          <button
            @click="handleVideoRecording"
            class="button button--record"
            :class="rec_button"
          >
            Rec
          </button>
          <button
            @click="handleRecordingPause"
            class="button button--pause"
            :class="pause_button"
          >
            | |
          </button>
        </div>
      </div>
    </div>
    <!-- RecodedVideosList -->
    <recorded-videos-list v-show="!isNavigationOpen" v-on:remove-video-id="deleteVideo" :videos="savedVideos" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import constraints from "@/helpers/constraints.js";
import RecordedVideosList from "@/components/RecordedVideosList";
import { indexedDB } from "@/mixins/indexedDB";

export default {
  name: "video-player",

  props: {
    isNavigationOpen: { type: Boolean, default: undefined }
  },

  mixins: [indexedDB],

  components: {
    RecordedVideosList
  },

  computed: {
    ...mapGetters(["getCount"])
  },

  watch: {
    isNavigationOpen() {
      if (this.isNavigationOpen) {
        setInterval(this.videoPlayerInit(), 2000);
      } else {
        this.videoPlayerStop();
      }
    }
  },

  data() {
    return {
      videoConstraints: constraints,
      playerStyle: "",
      rec_button: "",
      pause_button: "",
      showButton: "record",
      mediaRecorder: "",
      recordedChunks: [],
      savedVideos: [],
      db: "",
      deviceInfos: {
        enumarateDevices: {},
        supportedConstraints: {}
      }
    };
  },

  async created() {
    this.db = await this.getIndexedDB();
    this.savedVideos = await this.getVideosFromDb();
  },

  methods: {
    videoPlayerInit() {   
      const player = this.$refs.player
      const canvas = this.$refs.canvas
      const audio = this.$refs.audio
      const ctx = canvas.getContext('2d'); 
      //
      const stream = canvas.captureStream(25);
      // stream.addTrack(player.srcObject.getAudioTracks()[0]);
      //
      const options = { mineType: "video/webm; codecs=vp9" };
      this.mediaRecorder = new MediaRecorder(stream, options);

      // Get device capabilities informations
      navigator.mediaDevices.enumerateDevices().then(res => {
        this.deviceInfos.enumarateDevices = res;
      });
      this.deviceInfos.supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

      const context = this

      if (navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia(this.videoConstraints)
          .then(function(mediaStream) {
            player.srcObject = mediaStream
            audio.srcObject = mediaStream

            player.onloadedmetadata = () => {
              player.play();
              context.streamOnCanvas()
            };
          })
          .catch(function(err) {
            console.error(err.name + ": " + err.message);
            // ctx.playerText = "☠️ Outch, you'll need a camera.";
            // ctx.playerStyle = "error";
          });
      } else {
        // ctx.playerText = "☠️ Outch, you'll need a camera.";
        // ctx.playerStyle = "error";
      }
    },

    streamOnCanvas() {
      console.log('stream on canvas')

      const player = this.$refs.player
      const canvas = this.$refs.canvas
      const audio = this.$refs.audio
      const ctx = canvas.getContext('2d');

      const width = player.videoWidth
      const height = player.videoHeight
      canvas.width = width
      canvas.height = height

      return setInterval(() => {
        ctx.drawImage(this.$refs.player, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // put them back
        ctx.putImageData(pixels, 0, 0);
        // add text on canvas
        this. addTextToCanvas('Video Journal');
      }, 40);
    },

    addTextToCanvas(title) {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      const today = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date)
      
      ctx.fillStyle = '#4dba87';
      ctx.fillRect(0,0, 520, 40)
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 3
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.textAlign = 'left'
      ctx.font = 'Bold 14px Monospace'
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      ctx.fillText(title, 16, 25)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.font = 'Bold 14px Monospace'
      ctx.textAlign = 'right'
      ctx.fillText(today, 500, 25)
    },

    videoPlayerStop() {
      const player = this.$refs.player;
      const stream = player.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });

      player.srcObject = null;
    },

    startRecord() {
      if (this.mediaRecorder.state === "inactive") {
        this.mediaRecorder.ondataavailable = this.saveVideoChunks;
        this.rec_button = "button--record__recording";
        this.mediaRecorder.stream.addTrack(this.$refs.audio.srcObject.getAudioTracks()[0]);
        this.mediaRecorder.start();
      }
    },

    stopRecord() {
      if (this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        this.rec_button = "";
        this.recordedChunks = [];
      }
    },

    pauseRecord() {
      if (this.mediaRecorder.state === "recording") {
        this.pause_button = "button--pause__active";
        this.rec_button = "button--record__recording paused";
        this.mediaRecorder.pause();
      }
    },

    resumeRecord() {
      if (this.mediaRecorder.state === "paused") {
        this.rec_button = "button--record__recording";
        this.pause_button = "";
        this.mediaRecorder.resume();
      }
    },

    saveVideoChunks(event) {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
        this.saveVideo();
      } else {
        // ...
      }
    },

    saveVideo() {
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

      this.addVideo(videoFileName, blob);
    },

    handleVideoRecording() {
      // by pressing on button we're
      // handeling start and stop video recording.
      const recording = this.mediaRecorder.state;
      if (recording === "recording") {
        this.stopRecord();
      } else {
        this.startRecord();
      }
    },

    handleRecordingPause() {
      const recording = this.mediaRecorder.state;

      if (recording === "paused") {
        this.resumeRecord();
      } else {
        this.pauseRecord();
      }
    }
  }
};
</script>

<style lang="scss">
video {
  width: 100% !important;
  height: auto !important;
}

.view-player {
  padding-top: 5em;
}

@mixin full-page {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgb(226, 226, 226);
  width: 100vw;
  height: 100vh;
}

@mixin flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.camera__wrapper {
  @include full-page;
  @include flex-center;
}

.controlers {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  .camera-view {
    margin: 2em;
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
    border-radius: 1.4em;
    box-shadow: 0 2em 10em 4em rgba(255, 255, 255, 0.1);
  }

  .buttons-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 3em;
  }

  .button--record,
  .button--pause {
    cursor: pointer;
    display: block;
    background-color: red;
    text-transform: uppercase;
    color: white;
    border: 2px solid white;
    border-radius: 4em;
    width: 4em;
    height: 4em;
    outline: none;
    transition: all ease-in 150ms;
  }

  .button--record {
    margin-left: 4em;
  }

  .button--pause {
    opacity: 0.5;
    background-color: grey;
    font-weight: bolder;
    margin: 0.75em;
    width: 2.5em;
    height: 2.5em;

    &__active {
      opacity: 1;
      background-color: #4dba87;
    }
  }

  .button--record:hover {
    border-width: 4px;
    background-color: red;
  }

  .button--pause:hover {
    border-width: 4px;
    background-color: #4dba87;
  }

  .button--record__recording {
    animation: recording 1s infinite alternate;
  }

  .button--record__recording.paused {
    opacity: 0.8;
    animation: recording_paused 1s infinite alternate;
  }

  @keyframes recording {
    from {
      background-color: red;
      border-width: 16px;
      color: transparent;
    }
    to {
      background-color: white;
      border-color: red;
      border-width: 16px;
      color: transparent;
    }
  }

  @keyframes recording_paused {
    from {
      background-color: rgb(124, 72, 72);
      border-color: rgb(124, 72, 72);
      border-width: 16px;
      color: transparent;
    }
    to {
      background-color: lightgray;
      border-color: rgb(124, 72, 72);
      border-width: 16px;
      color: transparent;
    }
  }

  .audio,
  .canvas {
    display: none;
  }
}
</style>
