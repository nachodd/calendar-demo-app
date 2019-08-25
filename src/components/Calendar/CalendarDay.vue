<template>
  <div
    class="col cal__day"
    :class="{
      'bg-grey-2': dayIsWeekend,
      'cursor-not-allowed': !isCurrentMonth,
      'cal__day--selected': isDateSelected,
    }"
    @click="selectDate"
  >
    <div
      class="text-right q-mr-sm q-mb-sm text-weight-bold"
      :class="{ 'text-grey-6': !isCurrentMonth }"
    >
      {{ number }}
    </div>
    <div v-for="(event, i) in firstEvents" :key="`event_${i}_${dayKey}`"></div>
    <div v-if="hasMoreEvents"></div>
  </div>
</template>
<script>
import { isWeekend } from "date-fns"
import { mapState } from "vuex"

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
      type: Array,
      default: () => [],
    },
    dayKey: {
      type: String,
      required: true,
    },
    isCurrentMonth: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    dayIsWeekend() {
      return isWeekend(this.fullDate)
    },
    ...mapState("calendar", {
      selectedDate: state => state.selectedDate,
    }),
    isDateSelected() {
      return this.dayKey === this.selectedDate
    },
    firstEvents() {
      return _(this.events)
        .orderBy("timestamp", "asc")
        .take(3)
        .value()
    },
    hasMoreEvents() {
      return this.events.length > 3
    },
  },
  methods: {
    selectDate() {
      if (this.isCurrentMonth) {
        this.$store.dispatch("calendar/selectDate", this.dayKey)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.cal__day
  height 90px
  border 1px dashed $grey-4
  cursor pointer
.cal__day--selected
  background-color: $deep-purple-2 !important
</style>
