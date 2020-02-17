import {calculate, parse} from './Ip4Address.js'
import useCsv from './useCsv.js'

export default function useIp4AddressSpace() {
  const [csv] = useCsv()

  if (csv) {
    csv.map(record => ({
      record,
      network: calculate(parse(record["Prefix"]))
    }))

    return [ () => {} ]
    
  }

}
