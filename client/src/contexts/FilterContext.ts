import { createContext } from "react";

const defaultValue = (val: string) => false

export const FilterContext = createContext(defaultValue)