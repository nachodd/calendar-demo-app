<template>
  <div>
    <div class="bg-white rounded-borders-bottom-12">
      <div v-for="row in [1, 2, 3, 4, 5]" :key="`cal_row_${row}`" class="row">
        <calendar-day v-for="day in monthDays" :key="day.key" v-bind="day" />
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
  },
  mounted() {
    console.log("currentMonthDays", this.currentMonthDays)
  },
}
</script>

<style lang="stylus" scoped>
.rounded-borders-bottom-12
  border-bottom-right-radius: 12px !important;
  border-bottom-left-radius: 12px !important;
</style>
