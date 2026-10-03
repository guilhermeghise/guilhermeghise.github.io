import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StickerCursor from "./StickerCursor";

test("follows the mouse and emits the phrase after each click", () => {
  const { container } = render(<StickerCursor />);
  const cursor = container.querySelector(".sticker-cursor");
  const move = new MouseEvent("pointermove", { clientX: 100, clientY: 200 });
  Object.defineProperty(move, "pointerType", { value: "mouse" });
  fireEvent(window, move);

  expect(cursor.style.getPropertyValue("--cursor-x")).toBe("73px");
  expect(cursor.style.getPropertyValue("--cursor-y")).toBe("144px");

  fireEvent.click(window, { clientX: 100, clientY: 200, detail: 1 });
  fireEvent.click(window, { clientX: 200, clientY: 300, detail: 1 });
  expect(screen.getAllByText("VALEUUUU PARCEIRO")).toHaveLength(2);
});
