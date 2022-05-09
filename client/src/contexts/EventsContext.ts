import { createContext } from "react";

export interface Event {
  date: Date,
  feat: Record<string, Record<string, string>>
  description: '',
  note: ''
  urls: {
    youtube: string
  },
  color: string
}

const defaultValue: Event[][] = []

export const EventsContext = createContext(defaultValue)