<template>
  <div class="q-pa-sm cal">
    <div class="shadow-3">
      <calendar-head
        :month="currentMonthYear"
        @change-month="handleChangeMonth"
      />

      <calendar-body />
    </div>
  </div>
</template>

<script>
import CalendarHead from "./CalendarHead"
import CalendarBody from "./CalendarBody"
import { mapGetters } from "vuex"

export default {
  name: "Calendar",
  components: { CalendarHead, CalendarBody },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentMonthYear: "calendar/currentMonthYear",
    }),
  },
  methods: {
    handleChangeMonth(action) {
      console.log(action)
    },
  },
}
</script>
<style lang="stylus" scoped>
.cal
  min-width 350px
  width 800px
</style>
