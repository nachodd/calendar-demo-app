<template>
  <div class="col">
    <div class="text-right q-mr-sm">{{ number }}</div>
    <br />
  </div>
</template>
<!-- <div class="col text-center ellipsis">1</div> -->
<script>
export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
    fullDate: {
      type: Date,
      required: true,
    },
    events: {
      type: [Array, Boolean],
      default: false,
    },
    key: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="stylus" scoped></style>
