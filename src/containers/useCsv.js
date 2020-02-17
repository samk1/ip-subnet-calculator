import { useState } from "react";
import useAxios from "axios-hooks";
import { parseCsv } from "./CsvParser";

export default function useCsv(url) {
  const [state, setState] = useState({
    csv: null,
    data: null
  })

  const [{ data }] = useAxios(url);

  if (data && data !== state.data) {
    setState({
      data, csv: parseCsv(data)
    })
  }

  return [state.csv]
}
