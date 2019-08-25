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
            <div class="text-subtitle3 text-white-7">
              {{ reminderDate }}
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

          <div class="text-body text-grey-8 q-mb-sm">Select the time:</div>
          <div class="text-center">
            <q-time v-model="time" landscape color="deep-purple-10" />
          </div>

          <br />

          <q-input
            v-model="color"
            outlined
            color="deep-purple-10"
            label="Click the Dropper and select a color:"
            :rules="[
              'anyColor',
              val => !!val.length || 'Please write the name of a city',
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
    reminderTitle() {
      return "New Reminder"
    },
    reminderDate() {
      return "..."
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
  methods: {
    save() {
      this.$refs.form.validate()
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
