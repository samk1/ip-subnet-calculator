import React from "react";
import DottedQuad from "./DottedQuad";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<DottedQuad value={0xffffffff} />);
});

it("renders an integer as a dotted quad", () => {
  expect(wrapper.text()).toEqual("255.255.255.255");
});
