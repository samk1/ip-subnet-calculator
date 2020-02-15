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
