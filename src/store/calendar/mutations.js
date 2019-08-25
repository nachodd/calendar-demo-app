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
