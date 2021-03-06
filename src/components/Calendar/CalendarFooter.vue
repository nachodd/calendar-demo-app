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
        <div class="row justify-center q-mb-md">
          <q-btn color="white" outline size="18px" @click="deleteAllReminders">
            <span class="emoji">❌</span>
            &nbsp; Delete ALL reminders &nbsp;
            <span class="emoji">❌</span>
          </q-btn>
        </div>

        <q-list bordered padding class="bg-white text-black rounded-borders-12">
          <q-item
            v-for="event in events"
            :key="`event_${event.timestamp.getTime()}`"
          >
            <q-item-section
              avatar
              class="avatar-forecast"
              :style="{ 'background-color': `${event.color}` }"
            >
              <img
                v-if="event.weather && event.weather.iconUrl"
                :src="event.weather.iconUrl"
              />
              <span v-else class="emoji" style="padding-left: 10px">🤷🏻‍</span>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">
                <span
                  class="dot"
                  :style="{ 'background-color': `${event.color}` }"
                >
                  &nbsp;
                </span>
                {{ event.reminder }}
              </q-item-label>
              <q-item-label caption>
                <div class="q-mb-xs">City: {{ event.city }}</div>
                <div v-if="event.weather">
                  {{ getForecastText(event.weather) }}
                </div>
                <div v-else class="text-italic">
                  Sorry, no forecast information!
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <span class="emoji cursor-pointer" @click="editReminder(event)">
                ✏️
              </span>
            </q-item-section>

            <q-item-section side>
              <span class="emoji cursor-pointer" @click="deleteReminder(event)">
                ❌
              </span>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ event.time }}</q-item-label>
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
      eventsForDate: "calendar/eventsForDate",
      parsedDate: "calendar/parsedSelectedDateForHumans",
    }),
    events() {
      return _.orderBy(
        this.eventsForDate(this.selectedDate),
        "timestamp",
        "asc",
      )
    },
  },
  methods: {
    ...mapActions({
      modalEventOpen: "calendar/modalEventOpen",
    }),
    getForecastText(weather) {
      return `Forecast: ${weather.desc}
            / T.Max: ${weather.tempMax}°C
            - T.Min: ${weather.tempMin}°C`
    },
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
    editReminder(event) {
      this.$store.dispatch("calendar/editEvent", event)
    },
    deleteReminder(event) {
      this.$store.dispatch("calendar/deleteEvent", event)
    },
    deleteAllReminders() {
      this.$store.dispatch("calendar/deleteAllReminders")
      this.$root.$emit("redraw_event", this.selectedDate)
    },
  },
}
</script>

<style lang="stylus" scoped>
.avatar-forecast
  width 50px
  height 50px
  border-radius 10px
  align-self center
  margin-right 5px
  border 1px dashed black
</style>
