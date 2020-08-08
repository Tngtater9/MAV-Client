import React, { createContext, useState } from 'react'

export const DateContext = createContext()

function DateContextProvider (props) {
  const start = new Date()
  let year = String(start.getFullYear())
  let month = String(start.getMonth() + 1)
  let day = String(start.getDate())
  let stringStart = month + '/' + day + '/' + year
  if (month.length === 1) {
    month = '0' + month
  }
  if (day.length === 1) {
    day = '0' + day
  }
  let stringPickerDate = month + '/' + day + '/' + year

  const [date, setDate] = useState(stringStart)
  const [pickerDate, setPickerDate] = useState(stringPickerDate)
  return (
    <DateContext.Provider value={{ date, setDate, pickerDate, setPickerDate }}>
      {props.children}
    </DateContext.Provider>
  )
}

export default DateContextProvider
