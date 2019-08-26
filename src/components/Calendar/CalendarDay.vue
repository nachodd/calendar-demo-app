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
      class="text-right q-mr-sm text-weight-bold"
      :class="{ 'text-grey-6': !isCurrentMonth }"
    >
      {{ number }}
    </div>
    <div>
      <div
        v-for="(event, i) in firstEvents"
        :key="`event_${i}_${dayKey}`"
        class="ellipsis"
      >
        <span class="dot" :style="{ 'background-color': `${event.color}` }">
          &nbsp;
        </span>
        {{ event.reminder }}
      </div>
      <div
        v-if="hasMoreEvents"
        class="text-weight-bold text-caption text-center"
        style="font-size: 11px"
      >
        More Reminders
      </div>
    </div>
  </div>
</template>
<script>
import { isWeekend } from "date-fns"
import { mapState, mapGetters } from "vuex"

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
    dayKey: {
      type: String,
      required: true,
    },
    isCurrentMonth: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      events: [],
    }
  },
  computed: {
    dayIsWeekend() {
      return isWeekend(this.fullDate)
    },
    ...mapState("calendar", {
      selectedDate: state => state.selectedDate,
      eventsArr: state => state.events,
    }),
    ...mapGetters({
      eventsForDate: "calendar/eventsForDate",
    }),
    // events() {
    //   // return this.eventsForDate(this.dayKey)
    //   return this.eventsArr[this.dayKey] || []
    // },
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
  mounted() {
    this.events = this.eventsForDate(this.dayKey)

    this.$root.$on("redraw_event", dayKey => {
      if (this.dayKey === dayKey) {
        this.events = this.eventsForDate(dayKey)
      }
    })
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
  height 110px
  border 1px dashed $grey-4
  cursor pointer
.cal__day--selected
  background-color: $deep-purple-2 !important
</style>
