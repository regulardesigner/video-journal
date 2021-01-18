<template>
  <video :class="`video${id}`" :ref="`video${id}`" controls>
    <source :src="convertBlobToUrl(source)" type="video/webm" />
  </video>
</template>

<script>
export default {
  name: "video-reader",

  props: {
    videoId: { type: Number, required: true },
    source: { type: Blob, required: true }
  },

  methods: {
    convertBlobToUrl(blob) {
      const url = URL.createObjectURL(blob);
      return url;
    },
  }

}
</script>
