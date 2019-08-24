<template>
  <div class="text-white cal--head">
    <div
      class="row bg-red-8 text-center justify-center items-center rounded-borders-top-12"
    >
      <div class="col-auto">
        <q-btn icon="keyboard_arrow_left" flat round class="q-ma-sm" />
      </div>
      <div colspan="5" class="col cal--month">
        {{ month }}
      </div>
      <div class="col-auto">
        <q-btn icon="keyboard_arrow_right" flat round class="q-ma-sm" />
      </div>
    </div>
    <div class="row text-strong text-body2 q-py-sm bg-red-10">
      <div class="col text-center ellipsis">Sunday</div>
      <div class="col text-center ellipsis">Monday</div>
      <div class="col text-center ellipsis">Tuesday</div>
      <div class="col text-center ellipsis">Wednesday</div>
      <div class="col text-center ellipsis">Thursday</div>
      <div class="col text-center ellipsis">Friday</div>
      <div class="col text-center ellipsis">Saturday</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    month: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
.cal--month
  font-size: 2.5rem;
  font-weight: 400;

.cal--head > .row
  height auto !important

.rounded-borders-top-12
  border-top-right-radius: 12px !important;
  border-top-left-radius: 12px !important;
</style>
