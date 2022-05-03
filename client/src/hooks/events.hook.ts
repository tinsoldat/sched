import { Event } from "../contexts/EventsContext";
import { useFetch } from "./fetch.hook";

export function useEvents() {
  const { response: events, ...rest } = useFetch<Event[]>('api/events')
  return { events, ...rest }
}