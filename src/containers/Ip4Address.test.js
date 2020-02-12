import Ip4Address from "./Ip4Address.js";

describe("Ip4Address", () => {
  describe("Ip4Address.parse", () => {
    it("returns parsed ip address if given a valid ip address", () => {
      expect(Ip4Address.parse("192.168.254.0/24")).toEqual({
        octets: [192, 168, 254, 0],
        netmask: 24
      });

      expect(Ip4Address.parse("192.168.254.0")).toEqual({
        octets: [192, 168, 254, 0],
        netmask: 32
      });
    });

    [
      "999.123.123.9/24",
      "192.168.254.0/24aaa",
      "aaa192.168.254.0/24aaa",
      "123.123.123.9/58",
      "123.abc.123.9/58"
    ].forEach(invalid => {
      it("returns null if given an invalid ip address", () => {
        expect(Ip4Address.parse(invalid)).toBeNull();
      });
    });
  });

  describe("Ip4Address.dottedQuad", () => {
    it("renders an integer as a dotted quad", () => {
      expect(Ip4Address.dottedQuad(0xffffffff)).toEqual("255.255.255.255");
    });
  });

  describe("when the ip address is valid", () => {
    let ipAddress;

    beforeEach(() => {
      ipAddress = new Ip4Address("192.168.254.0/21");
    });

    describe("valid", () => {
      it("returns true", () => {
        expect(ipAddress.valid()).toBe(true);
      });
    });

    describe("renderIpAddress", () => {
      it("returns the ip address as a string", () => {
        expect(ipAddress.renderIpAddress()).toBe("192.168.254.0");
      });
    });

    describe("renderSubnetMask", () => {
      it("returns the subnet mask as a string", () => {
        expect(ipAddress.renderSubnetMask()).toBe("255.255.248.0");
      });
    });
  });

  describe("when the ip address is invalid", () => {
    let ipAddress;

    beforeEach(() => {
      ipAddress = new Ip4Address("abc");
    });

    describe("valid", () => {
      it("returns false", () => {
        expect(ipAddress.valid()).toBe(false);
      });
    });
  });
});
