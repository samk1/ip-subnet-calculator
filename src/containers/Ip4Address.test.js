import Ip4Address from "./Ip4Address.js";

describe("Ip4Address", () => {
  describe("Ip4Address.valid", () => {
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
});
