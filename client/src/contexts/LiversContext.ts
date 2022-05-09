import { createContext } from "react";

export interface Liver {
  name: string,
  avatar?: string,
  urls?: {
    twitter?: string,
    youtube?: string,
    twitch?: string,
  }
  color?: string
  units: [string]
}

const defaultValue: Liver[] = []

export const LiversContext = createContext(defaultValue)