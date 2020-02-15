import { parse, calculate } from "./Ip4Address.js";

describe("Ip4Address", () => {
  describe("parse", () => {
    it("returns parsed ip address if given a valid ip address", () => {
      expect(parse("192.168.254.0/24")).toEqual({
        octets: [192, 168, 254, 0],
        netmask: 24
      });

      expect(parse("192.168.254.0")).toEqual({
        octets: [192, 168, 254, 0],
        netmask: 32
      });
    });

    [
      "999.123.123.9/24",
      "192.168.254.0/24aaa",
      "aaa192.168.254.0/24aaa",
      "123.123.123.9/58",
      "123.abc.123.9/58",
      undefined,
      null,
      {},
      [],
      "",
      "garbl"
    ].forEach(invalid => {
      it("returns null if given an invalid ip address", () => {
        expect(parse(invalid)).toBeNull();
      });
    });
  });

  describe("calculate", () => {
    it("calculates ip address information", () => {
      const twosComplement = z => -(~z + 1);

      expect(
        calculate({
          octets: [192, 168, 254, 5],
          netmask: 24
        })
      ).toEqual({
        ipAddress: twosComplement(0xc0a8fe05),
        lowAddress: twosComplement(0xc0a8fe01),
        networkAddress: twosComplement(0xc0a8fe00),
        highAddress: twosComplement(0xc0a8fefe),
        broadcastAddress: twosComplement(0xc0a8feff),
        subnetMask: twosComplement(0xffffff00)
      });
    });
  });
});
