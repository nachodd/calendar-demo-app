<template>
  <div>
    <div class="bg-white">
      <div v-for="row in [0, 1, 2, 3, 4]" :key="`cal_row_${row}`" class="row">
        <calendar-day
          v-for="day in monthDaysChunked[row]"
          :key="day.dayKey"
          v-bind="day"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CalendarDay from "./CalendarDay"
export default {
  name: "CalendarBody",
  components: { CalendarDay },
  computed: {
    ...mapGetters({
      monthDays: "calendar/currentMonthDays",
    }),
    monthDaysChunked() {
      return _.chunk(this.monthDays, 7)
    },
  },
  mounted() {
    console.log("currentMonthDays", this.currentMonthDays)
  },
  methods: {},
}
</script>

<style lang="stylus" scoped></style>
