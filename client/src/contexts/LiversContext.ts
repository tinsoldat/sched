import { createContext } from "react";

export interface Liver {
  name: string,
  urls: {
    twitter?: string,
    youtube?: string,
    twitch?: string,
  }
  color: string
}

const defaultValue: Liver[] = []

export const LiversContext = createContext(defaultValue)