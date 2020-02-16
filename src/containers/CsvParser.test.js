import { parseCsv, mapRecord, splitLine } from "./CsvParser";

describe("splitLine", () => {
  [
    { input: "a", expected: ["a"] },
    { input: "a,b", expected: ["a", "b"] },
    { input: '"a,b', expected: ['"a', "b"] },
    { input: 'a",b', expected: ['a"', "b"] },
    { input: '"a",b', expected: ["a", "b"] },
    { input: '"a,",b', expected: ["a,", "b"] },
    { input: '"a\nb"', expected: ["a\nb"] },
    { input: "a,,", expected: ["a", "", ""] },
    { input: '"\\"a\\""', expected: ['"a"'] }
  ].forEach(({ input, expected }) => {
    it("splits the line into fields", () => {
      expect(splitLine(input)).toEqual(expected);
    });
  });
});

describe("mapRecord", () => {
  it("maps headers to fields", () => {
    const headers = ["h1", "h2"]
    const fields = ["f1", "f2"]

    expect(mapRecord(headers, fields)).toEqual({
      h1: "f1",
      h2: "f2"
    })
  })

  describe("when there are more headers than records", () => {
    it("raises an error", () => {
      const headers = ["h1", "h2"]
      const fields = ["f1"]

      expect(() => mapRecord(headers, fields)).toThrow()
    })
  })

  describe("when there are more records than headers", () => {
    it("raises an error", () => {
      const headers = ["h1"]
      const fields = ["f1", "f2"]

      expect(() => mapRecord(headers, fields)).toThrow()
    })
  })
})
