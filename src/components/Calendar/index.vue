<template>
  <div class="q-pa-sm cal text-unselectable">
    <div class="shadow-3 rounded-borders-12">
      <calendar-head
        :month="currentMonthYear"
        @change-month="handleChangeMonth"
      />

      <calendar-body />

      <calendar-footer />

      <calendar-modal />
    </div>
  </div>
</template>

<script>
import CalendarHead from "./CalendarHead"
import CalendarBody from "./CalendarBody"
import CalendarFooter from "./CalendarFooter"
import CalendarModal from "./CalendarModal"
import { mapGetters } from "vuex"

export default {
  name: "Calendar",
  components: { CalendarHead, CalendarBody, CalendarFooter, CalendarModal },
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
      this.$store.dispatch("calendar/changeMonth", action)
    },
  },
}
</script>
<style lang="stylus" scoped>
.cal
  min-width 350px
  width 800px
</style>
