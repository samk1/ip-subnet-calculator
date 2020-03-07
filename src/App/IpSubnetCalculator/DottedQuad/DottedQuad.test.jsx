import React from "react";
import DottedQuad from "./DottedQuad.jsx";

let wrapper;

describe("when given an integer value", () => {
  beforeEach(() => {
    wrapper = shallow(<DottedQuad value={0xffffffff} />);
  });

  it("renders an integer as a dotted quad", () => {
    expect(wrapper.text()).toEqual("255.255.255.255");
  });
});

describe("when given an invalid value", () => {
  [undefined, null, true, false, "", "garbl", {}, []].forEach(invalid => {
    it("renders an empty string", () => {
      wrapper = shallow(<DottedQuad value={invalid} />);
      expect(wrapper.text()).toBe("");
    });
  });
});
