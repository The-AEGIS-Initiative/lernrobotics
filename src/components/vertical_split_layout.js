import React, { useEffect, useState, useContext, useRef } from "react";

import { Row, Col } from "antd";

import Unity from "react-unity-webgl";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./GamePage.css";

import { GamePageContext } from "../contexts/GamePageContext";

import { useWindowSize } from "../hooks/useWindowSize";

// Dynamically allocates remaining screen-space to the dependent component
// dependent = "top" or dependent = "bottom"
function HorizontalSplitLayout({
  top_section,
  bottom_section,
  dependent,
  parent_height,
  parent_width,
}) {
  const [dependentHeight, setDependentHeight] = useState(null);

  // Refs for controlling various DOM element sizes
  const topRef = useRef(null);
  const botRef = useRef(null);

  /**
   * Sets console height and editor width based on
   * unity game size and browser size
   */
  useEffect(() => {
    if (topRef.current && botRef.current) {
      topHeight = topRef.current.offsetHeight;

      setDependentHeight(parent_height - gameHeight);
    }
  }, [
    topRef.current,
    botRef.current,
    topRef.current.offsetHeight,
    botRef.current.offsetHeight,
  ]);

  if (dependent === "top") {
    return (
      <div>
        <div ref={topRef} style={{ height: `${dependentHeight}px` }}>
          Content
        </div>
        <div ref={botRef}>Content</div>
      </div>
    );
  } else {
    return (
      <Col>
        <Row ref={topRef}>Content</Row>
        <Row ref={botRef} style={{ height: `${dependentHeight}px` }}>
          Content
        </Row>
      </Col>
    );
  }
}

export default GamePage;
