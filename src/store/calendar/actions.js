export function selectDate({ commit }, date) {
  commit("SET_SELECTED_DATE", date)
}

export function changeMonth({ commit }, action) {
  commit("CHANGE_MONTH", action)
}

export function modalEventOpen({ commit }, newVal) {
  commit("SET_MODAL_EVENT_OPEN", newVal)
}

export function setEventSelected({ commit }, event) {
  commit("SET_EVENT_SELECTED", event)
}

export function saveReminder({ commit, getters }, reminder) {
  return new Promise(resolve => {
    // adds the parsedSelectedDate to the reminder object
    reminder.parsedSelectedDate = getters.parsedSelectedDate
    commit("SAVE_REMINDER", reminder)
    resolve()
  })
}

export function editEvent({ commit }, event) {
  commit("EDIT_EVENT", event)
}

export function deleteEvent({ commit }, event) {
  commit("DELETE_EVENT", event)
}

export function deleteAllReminders({ commit }) {
  commit("DELETE_ALL_REMINDERS")
}
