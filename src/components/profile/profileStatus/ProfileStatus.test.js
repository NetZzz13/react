import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="it.com" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("it.com");
  });

  test("after creation div should be displayed", () => {
    const component = create(<ProfileStatus status="it.com" />);
    const root = component.root;
    let div = root.findByType("div");
    expect(div).not.toBeNull();
  });

  test("after creation input shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="it.com" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });


  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="it.com" updateStatus ={mockCallback} />);
    const instance = component.getInstance();
    instance.deActivateMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  
  /* 
  test("after creation div should contains correct status", () => {
    const component = create(<ProfileStatus status="it.com" />);
    const root = component.root;
    let div = root.findByType("div");
    expect(div.children[0].value).toBe("it.com");
  });

  test("input should be displayed in editMode instead div", () => {
    const component = create(<ProfileStatus status="it.com" />);
    const root = component.root;
    let div = root.findByType("div");
    div.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("it.com");
  }); */


});
