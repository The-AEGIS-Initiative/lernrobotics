import React, { useEffect, useState, useContext, useRef } from "react";

import { Row, Col } from "antd";

import { useWindowSize } from "hooks/useWindowSize";

// Dynamically allocates remaining vertical screen-space to the dependent component
// dependent = "top" or dependent = "bottom"
function HorizontalSplitLayout({
  top_section,
  bottom_section,
  dependent,
  parent_height,
  ...update_flag
}) {
  const [dependentHeight, setDependentHeight] = useState(null);
  const [dependentWidth, setDependentWidth] = useState(null);
  // Refs for controlling various DOM element sizes
  const topRef = useRef(null);
  const botRef = useRef(null);

  /**
   * Sets console height and editor width based on
   * unity game size and browser size
   */
  useEffect(() => {
    if (topRef.current && botRef.current) {
      if (dependent === "top") {
        var height = botRef.current.offsetHeight;
        var width = botRef.current.offsetWidth;
      } else {
        var height = topRef.current.offsetHeight;
        var width = topRef.current.offsetWidth;
      }
      // console.log(`height: ${height}`);
      setDependentHeight(parent_height - height);
      setDependentWidth(width);
      // console.log(`dependentHeight: ${dependentHeight}`);
      // console.log(`dependentWidth: ${dependentWidth}`);
    }
  }, [update_flag, dependent, parent_height, dependentHeight, dependentWidth]);

  if (dependent === "top") {
    return (
      <div style={{ width: "100%" }}>
        <div ref={topRef}>
          <Row
            style={{
              height: `${dependentHeight}px`,
              width: `${dependentWidth}px`,
            }}
          >
            {top_section}
          </Row>
        </div>
        <div ref={botRef}>{bottom_section}</div>
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%" }}>
        <div ref={topRef}>
          <Row>{top_section}</Row>
        </div>
        <div ref={botRef}>
          <Row
            style={{
              height: `${dependentHeight}px`,
              width: `${dependentWidth}px`,
            }}
          >
            {bottom_section}
          </Row>
        </div>
      </div>
    );
  }
}

export default HorizontalSplitLayout;
