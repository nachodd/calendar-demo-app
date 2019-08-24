import { format } from "date-fns"

export function currentMonthYear(state) {
  return format(state.currentDate, "MMMM yyyy")
}
