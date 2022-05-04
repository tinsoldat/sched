import { useMemo, useState } from "react";
import { Event } from "../typings";
import { useFetch } from "./fetch.hook";

export function useEvents(filter: (val: Event) => boolean, start: Date) {
  const [events, setEvents] = useState<Event[][]>()
  const { response, isLoading, error } = useFetch<Event[]>('api/events')

  useMemo(() => {
    if (isLoading) {
      setEvents([[], [], [], [], [], [], []])
      return
    }
    const newEvents = response?.filter((val) => filter(val)).reduce((acc, val) => {
      const diff = Math.floor(Math.abs(new Date(val.date).valueOf() - start.valueOf()) / (1000 * 60 * 60 * 24))
      acc[diff].push(val)
      return acc
    }, [[], [], [], [], [], [], []] as Event[][])
    setEvents(newEvents)

  }, [isLoading, filter, response, start])

  return { events, isLoading, error }
}