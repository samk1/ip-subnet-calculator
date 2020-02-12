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

  constructor(ipAddress) {
    this.value = Ip4Address.parse(ipAddress);
  }

  renderIpAddress() {
    if (this.value === null) {
      return "";
    }

    const { octets, netmask } = this.value;
    return `${octets.join(".")}/${netmask}`;
  }
}
