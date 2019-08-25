export function selectDate({ commit }, date) {
  commit("SET_SELECTED_DATE", date)
}

export function changeMonth({ commit }, action) {
  commit("CHANGE_MONTH", action)
}
