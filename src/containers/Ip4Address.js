export default class Ip4Address {
  static parse(ipAddress) {
    const match = ipAddress.match(
      /^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)(?:\/([0-9]+))?$/
    );

    if (match === null) {
      return null;
    }

    const [_, octet1, octet2, octet3, octet4, maybeNetmask] = match;

    const octets = [octet1, octet2, octet3, octet4].map(o => parseInt(o));
    const netmask = parseInt(maybeNetmask) || 32;

    if (netmask > 32) {
      return null;
    }

    if (octets.find(o => o > 255)) {
      return null;
    }

    return { octets, netmask };
  }

  static dottedQuad(input) {
    const uint32 = input & 0xFFFFFFFF; 
    return [
      (0xFF000000 & uint32) >>> 24,
      (0x00FF0000 & uint32) >>> 16,
      (0x0000FF00 & uint32) >>> 8,
      (0x000000FF & uint32)
    ].join(".")
  }

  constructor(ipAddress) {
    this._parsed = Ip4Address.parse(ipAddress);
    if (this._parsed !== null) {
      const { octets, netmask } = this._parsed;

      this.rawIpAddress = octets.reduce((ipAddress, octet, i) => {
        return (ipAddress << 8) + octet
      }, 0)

      this.rawSubnetMask = 0xFFFFFFFF ^ ((1 << (32 - netmask)) - 1)
    }
  }

  valid() {
    return !!this._parsed
  }

  renderIpAddress() {
    return Ip4Address.dottedQuad(this.rawIpAddress)
  }

  renderSubnetMask() {
    return Ip4Address.dottedQuad(this.rawSubnetMask)
  }
}
