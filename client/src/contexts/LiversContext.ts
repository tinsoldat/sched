import { createContext } from "react";

export interface ILiver {
  name: string;
  avatar?: string;
  urls?: {
    twitter?: string;
    youtube?: string;
    twitch?: string;
  }
  color?: string;
  units: [string];
}

const defaultValue: ILiver[] = []

export const LiversContext = createContext(defaultValue)