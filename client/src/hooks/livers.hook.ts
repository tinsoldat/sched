import assert from "assert";
import { useMemo, useState } from "react";
import { ILiver } from "../contexts/LiversContext";
import { useFetch } from "./fetch.hook";

export function useLivers() {
  let { response, isLoading: isLiversLoading, error } = useFetch<ILiver[]>('api/livers')

  const livers = useMemo(() => {
    return Object.entries(
      (response || []).reduce((acc, val) => {
        if (!acc[val.units[0]]) acc[val.units[0]] = [val]
        else acc[val.units[0]].push(val)
        return acc
      }, {} as { [type: string]: ILiver[] })
    )
  }, [response])

  return { livers, isLiversLoading, error }
}