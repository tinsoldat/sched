import { createContext } from "react";

export interface Event {
  date: Date,
  feat: [string, string][]
  description: '',
  note: ''
}

const defaultValue: Event[][] = []

export const EventsContext = createContext(defaultValue)