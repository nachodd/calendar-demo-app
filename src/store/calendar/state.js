export default {
  currentDate: new Date(),
  selectedDate: null,
  events: localStorage.getItem("events") || [],
  modalEventOpen: false,
  eventSelected: null,
}
