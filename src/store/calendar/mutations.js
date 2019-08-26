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
  state.eventSelected = null
}

export function EDIT_EVENT(state, event) {
  state.eventSelected = event
  state.modalEventOpen = true
}
