const Enzyme = require("enzyme")
Enzyme.ShallowWrapper.prototype.testid = function(testid) {
  return this.find(`[data-testid="${testid}"]`);
};

require('jest-enzyme')
const Adapter = require("enzyme-adapter-react-16")
const { configure, mount, render, shallow } = require('enzyme');

// Setup Enzyme Adapter
configure({ adapter: new Adapter() });
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require('react');
