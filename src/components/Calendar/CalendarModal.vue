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
              {{ parsedDate }}
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
          />
          <br />

          <q-input
            v-model="time"
            outlined
            mask="time"
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
          <q-btn label="Save" color="deep-purple-10" @click="save" />
        </q-card-actions>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
  name: "CalendarModal",
  data() {
    return {
      reminder: "",
      city: "",
      time: "",
      color: "",
    }
  },
  computed: {
    ...mapState("calendar", {
      eventSelected: state => state.eventSelected,
    }),
    ...mapGetters({
      parsedDate: "calendar/parsedSelectedDate",
    }),
    editEvent() {
      return !!this.eventSelected
    },
    reminderTitle() {
      return this.editEvent ? "Edit Reminder" : "New Reminder"
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
  mounted() {
    if (this.eventSelected) {
      this.reminder = this.eventSelected.reminder
      this.city = this.eventSelected.city
      this.time = this.eventSelected.time
      this.color = this.eventSelected.color
    }
  },
  methods: {
    async save() {
      try {
        await this.$refs.form.validate()
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
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style lang="stylus" scoped></style>
