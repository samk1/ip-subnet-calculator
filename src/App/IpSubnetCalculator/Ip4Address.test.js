import { parse, calculate, contains } from "./Ip4Address.js";

const twosComplement = z => -(~z + 1);

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

      expect(parse("192/8")).toEqual({
        octets: [192, 0, 0, 0],
        netmask: 8
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

  describe("contains", () => {
    describe("when ip is inside network", () => {
      const network = {
        networkAddress: 0xc0000000,
        broadcastAddress: 0xc0ffffff
      };

      [0xc0000000, 0xc0ffffff, 0xc0000001, 0xc0fffffe].forEach(ipAddress => {
        it("returns true", () => {
          expect(contains(network, { ipAddress })).toBe(true);
        });
      });
    });

    describe("when ip is not inside network", () => {
      const network = {
        networkAddress: 0xc0000000,
        broadcastAddress: 0xc0ffffff
      };

      [0xca000000, 0xc1000000, 0xbfffffff, 0x00000001].forEach(ipAddress => {
        it("returns false", () => {
          expect(contains(network, { ipAddress })).toBe(false);
        });
      });
    });
  });
});
