import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import SocialApp from "./App";
import Header from "./components/header/Header";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SocialApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
