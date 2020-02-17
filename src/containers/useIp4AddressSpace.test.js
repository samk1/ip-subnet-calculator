import { useState } from "react";
import useIp4AddressSpace from "./useIp4AddressSpace.js";
import useCsv from "./useCsv.js";
import { parse, calculate } from "./Ip4Address.js";

jest.mock("./useCsv.js");
jest.mock("./Ip4Address.js", () => ({
  parse: jest.fn(),
  calculate: jest.fn()
}));

beforeEach(() => {
  useCsv.mockClear();
  parse.mockClear();
  calculate.mockClear();
});

let wrapper;

//Prefix,Designation,Date,WHOIS,RDAP,Status [1],Note
describe("useIp4AddressSpace", () => {
  describe("when the ip address csv is available", () => {
    const csv = [
      { Prefix: "a prefix", Designation: "the designation" },
      { Prefix: "a second prefix", Designation: "the second designation" }
    ];

    let lookup;

    beforeEach(() => {
      useCsv.mockImplementation(() => [csv]);
      parse.mockImplementation(() => "parsed network");
      [lookup] = useIp4AddressSpace();
    });

    it("parses the prefix", () => {
      expect(parse).toHaveBeenCalledWith("a prefix");
    });

    it("calculates the network", () => {
      expect(calculate).toHaveBeenCalledWith("parsed network");
    });

    it("parses and calculates all the networks", () => {
      expect(parse).toHaveBeenCalledTimes(2);
      expect(calculate).toHaveBeenCalledTimes(2);
    })

    it("returns the lookup function", () => {
      expect(lookup).toBeInstanceOf(Function);
    });

    describe("lookup", () => {
      test.todo("it checks which networks contain the ip address");
      test.todo("it returns an array of the networks that contain the ip address")
    });
  });
});
