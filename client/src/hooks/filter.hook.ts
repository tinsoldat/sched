import { useCallback, useState } from "react";
import { Event } from "../typings";

export const useFilter = () => {
  const [start] = useState(new Date('2022-04-25'))
  const [end] = useState(new Date('2022-05-01'))

  const filter = useCallback((val: Event, index?: number, array?: Event[]) => {
    const isInDateRange = new Date(val.date) > start && new Date(val.date) < end
    return isInDateRange
  }, [end, start])

  return { filter, start, end }
}

