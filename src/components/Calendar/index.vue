<template>
  <div class="q-pa-sm cal">
    <div class="shadow-3">
      <calendar-head :month="currentMonthYear" />

      <div class="row bg-white q-py-sm rounded-borders-bottom-12">
        <div class="col text-center ellipsis">1</div>
        <div class="col text-center ellipsis">2</div>
        <div class="col text-center ellipsis">3</div>
        <div class="col text-center ellipsis">4</div>
        <div class="col text-center ellipsis">5</div>
        <div class="col text-center ellipsis">6</div>
        <div class="col text-center ellipsis">7</div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarHead from "./CalendarHead"
import { mapGetters } from "vuex"

export default {
  name: "Calendar",
  components: { CalendarHead },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentMonthYear: "calendar/currentMonthYear",
    }),
  },
}
</script>
<style lang="stylus" scoped>
.cal
  min-width 350px
  width 800px

.rounded-borders-bottom-12
  border-bottom-right-radius: 12px !important;
  border-bottom-left-radius: 12px !important;
</style>
