<template>
  <section class="view-player">
    <div class="controlers">
      <div class="camera-view">
        <span class="camera-view__intructions">{{ playerText }}</span>
        <video ref="player" class="player" muted="muted"></video>
      </div>
      <div class="buttons-group">
        <button @click="handleVideoRecording" class="button button--record" :class="rec_button">
          Rec
        </button>
        <button @click="handleRecordingPause" class="button button--pause" :class="pause_button">| |</button>
      </div>
      <div class="audio">audio</div>
      <div class="canvas">canvas</div>
    </div>
    <!-- RecodedVideosList -->
    <recorded-videos-list
      v-on:remove-video-id="deleteVideo"
      :videos="savedVideos"
    />
  </section>
</template>

<script>
import constraints from "@/helpers/constraints.js";
import RecordedVideosList from "@/components/RecordedVideosList";
import { indexedDB } from "@/mixins/indexedDB";

export default {
  name: "video-player",

  mixins: [indexedDB],

  components: {
    RecordedVideosList
  },

  data() {
    return {
      playerStyle: "",
      rec_button: '',
      pause_button: '',
      showButton: 'record',
      playerText: "Please autorize the camera.",
      mediaRecorder: "",
      recordedChunks: [],
      savedVideos: "",
      db: ""
    };
  },

  async created() {
    this.db = await this.getIndexedDB();
    this.savedVideos = await this.getVideosFromDb();
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
        this.rec_button = 'button--record__recording'
        this.mediaRecorder.start();
      }
    },

    stopRecord() {
      if (this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        this.rec_button = ''
        this.recordedChunks = [];
      }
    },

    pauseRecord() {
      if (this.mediaRecorder.state === "recording") {
        this.pause_button = 'button--pause__active'
        this.rec_button = 'button--record__recording paused'
        this.mediaRecorder.pause();
      }
    },

    resumeRecord() {
      if (this.mediaRecorder.state === "paused") {
        this.rec_button = 'button--record__recording'
        this.pause_button = ''
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
    border: 1px solid white;
    border-radius: 1.4em;
    box-shadow: 0 0.4em 1em 0.4em rgba(0, 0, 0, 0.1);
  }

  .buttons-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 3em;
  }

  .button--record, .button--pause {
    cursor: pointer;
    display: block;
    background-color:red;
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
    opacity: .5;
    background-color: grey;
    font-weight: bolder;
    margin: .75em;
    width: 2.5em;
    height: 2.5em;

    &__active {
      opacity: 1;
      background-color: #4DBA87;
    }
  }

  .button--record:hover {
    border-width: 4px;
    background-color: red;
  }

  .button--pause:hover {
    border-width: 4px;
    background-color: #4DBA87;
  }

  .button--record__recording {
    animation: recording 1s infinite alternate;
  }

  .button--record__recording.paused {
    opacity: .8;
    animation: recording_paused 1s infinite alternate;
  }

  @keyframes recording {
    from {
      background-color: red;
      border-width: 16px;
      color:transparent;
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
