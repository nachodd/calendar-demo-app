<template>
  <div class="row bg-red-8 rounded-borders-bottom-12 text-white q-pa-md">
    <div
      v-if="!selectedDate"
      class="text-center justify-center items-center text-h4"
    >
      Please, select a day!
    </div>
    <div v-else class="col">
      <div class="text-center text-h5">
        Reminders for
        <strong>{{ parsedDate }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { format } from "date-fns"

export default {
  name: "CalendarFooter",
  computed: {
    ...mapState("calendar", {
      selectedDate: state => state.selectedDate,
    }),
    parsedDate() {
      if (this.selectedDate) {
        const parts = this.selectedDate.split("-")
        const currDate = new Date(
          parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10),
        )
        return format(currDate, "eeee, LLLL do (yyyy)")
      }
      return ""
    },
  },
}
</script>

<style lang="stylus" scoped></style>
