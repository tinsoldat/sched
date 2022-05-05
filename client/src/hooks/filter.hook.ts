import { useCallback, useState } from "react";
import { Event } from "../contexts/EventsContext";

export const useFilter = () => {
  const [options] = useState({
    livers: ['Layla Alstroemeria'],
  })
  const [start] = useState(new Date('2022-04-25'))
  const [end] = useState(new Date('2022-05-01'))

  const filter = useCallback((val: Event) => {
    const isInDateRange = new Date(val.date) > start && new Date(val.date) < end
    let isIn = options.livers.length === 0
    for (const name of options.livers) {
      for (const participant of val.feat) {
        if (participant[0] === name) {
          isIn = true
          break
        }
      }
      if (isIn === true) break
    }
    return isInDateRange && isIn
  }, [])

  return { filter, start, end }
}

