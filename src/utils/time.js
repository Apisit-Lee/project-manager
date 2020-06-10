import moment from 'moment'

export const $today = () => moment()

export const $lastMonthDayCountInPanel = (date) => moment(date).startOf('month').diff(moment(date).startOf('month').day(0), 'days')

export const $monthDayCount = (date) => moment(date).daysInMonth()

export const $getMomentByYMD = (year, month, day) => moment(`${year}-${month}-${day}`)
