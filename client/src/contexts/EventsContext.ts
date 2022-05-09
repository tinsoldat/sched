import { createContext } from "react";

export interface IEvent {
  date: Date,
  feat: Record<string, Record<string, string>>
  description: '',
  note: ''
  urls: {
    youtube: string
  },
  color: string
}

const defaultValue: IEvent[][] = []

export const EventsContext = createContext(defaultValue)