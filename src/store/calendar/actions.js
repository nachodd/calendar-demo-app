export function selectDate({ commit }, date) {
  commit("SET_SELECTED_DATE", date)
}

export function changeMonth({ commit }, action) {
  commit("CHANGE_MONTH", action)
}

export function modalEventOpen({ commit }, newVal) {
  commit("SET_MODAL_EVENT_OPEN", newVal)
}
