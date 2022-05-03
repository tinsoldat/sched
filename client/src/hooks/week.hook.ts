import { Event } from "../contexts/EventsContext";
import { useFetch } from "./fetch.hook";
import { useFilter } from "./filter.hook";

export function useWeek(start: Date) {
  const filter = useFilter()
  const { response: events, ...rest } = useFetch<Event[]>('api/events')

  const week = events
    ?.filter((val: Event) => { val.date = new Date(val.date); return val.date >= start })
    .reduce((acc: Event[][], cur) => {
      const day = Math.floor(Math.abs(cur.date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      console.log(day);
      acc[day].push(cur)

      
      return acc
    }, [[], [], [], [], [], [], []])

  return { week, ...rest }
}