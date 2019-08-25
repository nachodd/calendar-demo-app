import {
  format,
  startOfMonth,
  isSunday,
  subDays,
  addDays,
  getDate,
  isSameMonth,
} from "date-fns"

export function currentMonthYear(state) {
  return format(state.currentDate, "MMMM yyyy")
}

export function currentMonthDays(state) {
  const currentMonth = state.currentDate
  const days = []
  let iterableDate = startOfMonth(currentMonth)

  // prepend days until first sunday to complete the grid
  if (!isSunday(iterableDate)) {
    let aux = startOfMonth(currentMonth)
    while (!isSunday(aux)) {
      aux = subDays(aux, 1)
      days.splice(0, 0, getDayObject(aux, state.events, false))
    }
  }

  // add days of the current month
  while (isSameMonth(currentMonth, iterableDate)) {
    days.push(getDayObject(iterableDate, state.events))
    iterableDate = addDays(iterableDate, 1)
  }

  // append days until first saturday to complete the grid
  if (!isSunday(iterableDate)) {
    while (!isSunday(iterableDate)) {
      days.push(getDayObject(iterableDate, state.events, false))
      iterableDate = addDays(iterableDate, 1)
    }
  }

  return days
}

const getDayObject = (date, events, isCurrentMonth = true) => {
  const formatedDate = format(date, "yyyy-MM-dd")
  return {
    number: getDate(date),
    fullDate: date,
    events: events[formatedDate] || [],
    dayKey: formatedDate,
    isCurrentMonth,
  }
}
