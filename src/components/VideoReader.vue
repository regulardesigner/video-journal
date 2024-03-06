<template>
  <video :class="`video${videoId}`" :ref="`video${videoId}`" controls>
    <source :src="getBlobUrl(videoSource)" type="video/webm" />
  </video>
</template>

<script>
export default {
  name: "video-reader",

  props: {
    videoId: { type: Number, required: true },
    videoSource: { type: Blob, required: true }
  },

  methods: {
    getBlobUrl(blob) {
      /**
       * Converts a Blob object into a URL representing the object in the browser's memory.
       * This URL can be used as the source in a <video> or <img> tag, or as a way to download the blob data.
       *
       * @param {Blob} blob - The Blob object to convert.
       * @return {string} - A URL representing the Blob object.
       */
      const url = URL.createObjectURL(blob);
      return url;
    }
  }
};
</script>
