<template>
  <footer class="block-footer">
    © 2020 - video journal - storage used: {{ dataUsed.toFixed(2) }}%
  </footer>
</template>

<script>
export default {
  name: "video-footer",

  data() {
    return {
      dataUsed: 0,
      dataRemaning: 0
    };
  },

  mounted() {
    this.getAvailbleDataStorage();
  },

  methods: {
    async getAvailbleDataStorage() {
      if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        // quota.usage -> Number of bytes used.
        // quota.quota -> Maximum number of bytes available.
        const percentageUsed = (quota.usage / quota.quota) * 100;
        this.dataUsed = percentageUsed;
        // console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        this.dataRemaning = remaining;
        // console.log(`You can write up to ${remaining} more bytes.`);
      }
    }
  }
};
</script>

<style lang="scss">
.block-footer {
  font-size: 1.2em;
  padding: 0.5rem;
  text-align: center;
}
</style>
