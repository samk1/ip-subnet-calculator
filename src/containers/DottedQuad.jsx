import React from "react";

export default function DottedQuad(props) {
  const value = props.value & 0xffffffff;
  return (
    <>
      {[
        (0xff000000 & value) >>> 24,
        (0x00ff0000 & value) >>> 16,
        (0x0000ff00 & value) >>> 8,
        0x000000ff & value
      ].join(".")}
    </>
  );
}
