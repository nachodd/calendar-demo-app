<template>
  <q-dialog
    v-model="modalEventOpen"
    full-height
    transition-show="scale"
    transition-hide="scale"
  >
    <q-layout container view="hHh lpR fFf" class="bg-white">
      <q-header elevated class="bg-deep-purple-10 text-white items-center">
        <q-toolbar class="q-pa-md">
          <q-toolbar-title>
            <div class="text-h6">{{ reminderTitle }}</div>
            <div class="text-subtitle2 text-white-7">
              {{ parsedDateFH }}
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container class="q-ma-md">
        <q-form ref="form">
          <q-input
            v-model="reminder"
            outlined=""
            type="text"
            counter
            label="What do you want to Remind?"
            color="deep-purple-10"
            :rules="[
              val =>
                !!val.length || 'Please write what\'s needs to be reminded!',
              val => val.length <= 30 || 'Please use maximum 30 characters',
            ]"
          />
          <br />

          <q-input
            v-model="city"
            outlined
            type="text"
            label="Where? (put name of the CITY)"
            color="deep-purple-10"
            :rules="[val => !!val.length || 'Please write the name of a city']"
            @input="debounceGetWeather"
          />
          <q-banner
            rounded
            class="bg-deep-purple-10 text-white text-center"
            style="height: 70px; opacity: 0.75"
          >
            <div class="text-caption text-gray-4">
              {{ weatherDisplayMsg }}
              <img
                v-if="weather && weather.iconUrl"
                :src="weather.iconUrl"
                style="vertical-align: middle;"
              />
            </div>
          </q-banner>

          <br />

          <q-input
            v-model="time"
            outlined
            mask="time"
            color="deep-purple-10"
            label="Select the time clicking on the Clock:"
            :rules="[val => !!val.length || 'Please specify a Time!', 'time']"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="time" landscape color="deep-purple-10" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <br />

          <q-input
            v-model="color"
            outlined
            color="deep-purple-10"
            label="Click the Dropper and select a color:"
            :rules="[
              val => !!val.length || 'Please select a color using the Dropper!',
              'anyColor',
            ]"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <br />
        </q-form>
      </q-page-container>

      <q-footer elevated class="bg-white">
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" @click="cancel" />
          <q-btn :label="buttonText" color="deep-purple-10" @click="save" />
        </q-card-actions>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { getWeather } from "src/api/weather"
export default {
  name: "CalendarModal",
  data() {
    return {
      reminder: "",
      city: "",
      time: "",
      color: "",
      weather: null,
      timestamp: null,
      weatherMsg: null,
      processing: false,
    }
  },
  computed: {
    ...mapState("calendar", {
      eventSelected: state => state.eventSelected,
      selectedDate: state => state.selectedDate,
    }),
    ...mapGetters({
      parsedDateFH: "calendar/parsedSelectedDateForHumans",
      parsedSelectedDate: "calendar/parsedSelectedDate",
    }),
    editEvent() {
      return !!this.eventSelected
    },
    reminderTitle() {
      return this.editEvent ? "Edit Reminder" : "New Reminder"
    },
    buttonText() {
      return this.editEvent ? "Edit" : "Save"
    },
    weatherDisplayMsg() {
      return this.weatherMsg === null
        ? "Type the city name to show the forecast..."
        : this.weatherMsg
    },
    modalEventOpen: {
      get() {
        return this.$store.state.calendar.modalEventOpen
      },
      set(value) {
        if (value !== this.$store.state.calendar.modalEventOpen) {
          return this.$store.dispatch("calendar/modalEventOpen", value)
        }
      },
    },
  },
  watch: {
    eventSelected(val) {
      if (val) {
        this.reminder = val.reminder
        this.city = val.city
        this.time = val.time
        this.color = val.color
        this.weather = val.weather
        this.timestamp = val.timestamp
      } else {
        this.reminder = ""
        this.city = ""
        this.time = ""
        this.color = ""
        this.weather = null
        this.timestamp = null
      }
    },
  },
  methods: {
    async save() {
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.$store.dispatch("calendar/saveReminder", {
            reminder: this.reminder,
            city: this.city,
            time: this.time,
            color: this.color,
            weather: this.weather,
            timestamp: this.timestamp,
          })
          this.$root.$emit("redraw_event", this.selectedDate)

          this.cancel()
        }
      } catch (ex) {
        this.$q.notify({
          icon: "error",
          message: "There are some error, please check",
          color: "red",
        })
      }
    },
    cancel() {
      this.modalEventOpen = false
      this.reminder = ""
      this.city = ""
      this.time = ""
      this.color = ""
      this.weather = null
      this.weatherMsg = null
      this.$refs.form.resetValidation()

      // force getter eventsForSelectedDate to refresh:
      const auxSelectedDate = this.selectedDate
      this.$store.dispatch("calendar/selectDate", null)
      this.$store.dispatch("calendar/selectDate", auxSelectedDate)
    },
    debounceGetWeather: _.debounce(async function() {
      if (this.city.length >= 3) {
        try {
          this.processing = true
          this.weather = await getWeather({
            city: this.city,
            time: this.parsedSelectedDate.getTime() / 1000,
          })

          this.weatherMsg = `Forecast: ${this.weather.desc}
            / T.Max: ${this.weather.tempMax}°C
            - T.Min: ${this.weather.tempMin}°C`
        } catch (ex) {
          this.weather = null
          this.weatherMsg = "Could not get the forecast for the city"
        } finally {
          this.processing = false
        }
      }
    }, 2000),
  },
  // async getWeatherFn() {},
}
</script>

<style lang="stylus" scoped></style>
