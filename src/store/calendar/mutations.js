import { addMonths, subMonths } from "date-fns"

export function SET_SELECTED_DATE(state, newDate) {
  if (newDate === state.selectedDate) {
    state.selectedDate = null
  } else {
    state.selectedDate = newDate
  }
}

export function CHANGE_MONTH(state, action) {
  state.currentDate =
    action === "prev"
      ? subMonths(state.currentDate, 1)
      : addMonths(state.currentDate, 1)
}

export function SET_MODAL_EVENT_OPEN(state, newVal) {
  state.modalEventOpen = newVal
}

export function SET_EVENT_SELECTED(state, event) {
  state.eventSelected = event
}

export function SAVE_REMINDER(
  state,
  { reminder, city, time, color, weather, parsedSelectedDate, timestamp },
) {
  if (!state.events[state.selectedDate]) {
    state.events[state.selectedDate] = []
  }
  // new reminder
  if (!timestamp) {
    const auxTime = time.split(":")
    const timestamp = _.cloneDeep(parsedSelectedDate)
    timestamp.setHours(auxTime[0], auxTime[1], 0)

    state.events[state.selectedDate] = [
      ...state.events[state.selectedDate],
      {
        reminder,
        city,
        time,
        color,
        weather: _.cloneDeep(weather),
        timestamp,
      },
    ]
  }
  // edit reminder
  else {
    const reminderObject = _.find(state.events[state.selectedDate], r => {
      return r.timestamp === timestamp
    })
    reminderObject.reminder = reminder
    reminderObject.city = city
    reminderObject.time = time
    reminderObject.color = color
    reminderObject.weather = weather
  }

  // force getter eventsForSelectedDate to refresh:
  const aux = state.selectedDate
  state.selectedDate = null
  state.selectedDate = aux

  state.eventSelected = null
}

export function EDIT_EVENT(state, event) {
  state.eventSelected = event
  state.modalEventOpen = true
}

export function DELETE_EVENT(state, { timestamp }) {
  const index = _.findIndex(state.events[state.selectedDate], r => {
    return r.timestamp === timestamp
  })
  state.events[state.selectedDate].splice(index, 1)

  // force getter eventsForSelectedDate to refresh:
  const aux = state.selectedDate
  state.selectedDate = null
  state.selectedDate = aux
}

export function DELETE_ALL_REMINDERS(state) {
  state.events[state.selectedDate] = []

  // force getter eventsForSelectedDate to refresh:
  const aux = state.selectedDate
  state.selectedDate = null
  state.selectedDate = aux
}
