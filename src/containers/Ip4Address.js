function parse(ipAddress) {
  if (typeof ipAddress !== "string") {
    return null;
  }

  const match = ipAddress.match(
    /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?(?:\/(\d+))?$/
  );

  if (match === null) {
    return null;
  }

  const [_, octet1, octet2, octet3, octet4, maybeNetmask] = match;

  const octets = [octet1, octet2, octet3, octet4].map(o => o ? parseInt(o) : 0);
  const netmask = parseInt(maybeNetmask) || 32;

  if (netmask > 32) {
    return null;
  }

  if (octets.find(o => o > 255)) {
    return null;
  }

  return { octets, netmask };
}

function calculate({ octets, netmask }) {
  const ipAddress = octets.reduce((ipAddress, octet, i) => {
    return (ipAddress << 8) + octet;
  }, 0);

  const subnetMask = 0xffffffff ^ ((1 << (32 - netmask)) - 1);

  const networkAddress = subnetMask & ipAddress;

  const lowAddress = networkAddress + 1;

  const broadcastAddress = networkAddress | (subnetMask ^ 0xffffffff);

  const highAddress = broadcastAddress - 1;

  return {
    ipAddress,
    subnetMask,
    networkAddress,
    lowAddress,
    broadcastAddress,
    highAddress
  };
}

module.exports = {parse, calculate}
