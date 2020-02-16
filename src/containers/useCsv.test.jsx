import React, { Component } from "react";
import useCsv from "./useCsv";
import CsvParser from "./CsvParser";
import useAxios from "axios-hooks"

jest.mock("./CsvParser.js", () => ({ parseCsv: jest.fn() }));
jest.mock("axios-hooks");

let wrapper;

beforeEach(() => {
  CsvParser.parseCsv.mockClear();
  useAxios.mockClear();
})

describe("useCsv", () => {
  function TestComponent(props) {
    useCsv("csv-url");

    return null;
  }

  describe("when data is returned from axios", () => {
    beforeEach(() => {
      const data = "some data"
      useAxios.mockImplementation(() => [{data}])
      wrapper = mount(<TestComponent />);
    })

    it("parses the data", () => {
      expect(CsvParser.parseCsv).toHaveBeenCalled();
    })

    describe("when the component is mounted again", () => {
      beforeEach(() => {
        wrapper.mount()
      })

      it("does not parse the data again", () => {
        expect(CsvParser.parseCsv).toHaveBeenCalledTimes(1);
      })
    })
  })

  describe("when data is not returned from axios", () => {
    beforeEach(() => {
      useAxios.mockImplementation(() => [{}])

      wrapper = mount(<TestComponent />);
    })

    it("does not parse the data", () => {
      expect(CsvParser.parseCsv).not.toHaveBeenCalled();
    })
  })

});
