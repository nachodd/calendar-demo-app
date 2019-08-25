<template>
  <div class="row bg-red-8 rounded-borders-bottom-12 text-white q-pa-md">
    <div v-if="!selectedDate" class="col-12 text-h4">
      <div class="text-center">
        Please, select a day! &nbsp;
        <span class="emoji">🙏</span>
      </div>
    </div>
    <div v-else class="col-12">
      <div class="text-center text-h5 q-mb-md">
        Reminders for
        <strong>{{ parsedDate }}</strong>
        &nbsp;
        <span class="emoji">📅</span>
      </div>
      <div v-if="!events.length" class="text-center text-body2">
        No reminders on this day!
        <span class="emoji">🎉</span>
      </div>
      <div v-else>
        Events!

        <q-list bordered padding>
          <q-item>
            <q-item-section top avatar>
              <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption lines="2">
                Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="col-12">
      <div class="text-center q-mt-lg">
        <q-btn color="white" outline size="18px" @click="createReminder">
          <span class="emoji">🔔</span>
          &nbsp; Add a new Reminder! &nbsp;
          <span class="emoji">🔔</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  name: "CalendarFooter",
  computed: {
    ...mapState("calendar", {
      selectedDate: state => state.selectedDate,
    }),
    ...mapGetters({
      events: "calendar/eventsForSelectedDate",
      parsedDate: "calendar/parsedSelectedDate",
    }),
  },
  methods: {
    ...mapActions({
      modalEventOpen: "calendar/modalEventOpen",
    }),
    createReminder() {
      if (!this.selectedDate) {
        this.$q.notify({
          icon: "error",
          message: "No date selected! Please, select one first!",
          color: "red",
        })
        return
      }
      this.modalEventOpen(true)
    },
  },
}
</script>

<style lang="stylus" scoped></style>
