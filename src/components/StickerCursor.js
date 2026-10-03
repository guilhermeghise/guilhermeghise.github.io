import React, { useEffect, useRef, useState } from "react";
import sticker from "../assets/valeuuuu-cursor.png";
import "./StickerCursor.css";

export default function StickerCursor() {
  const cursorRef = useRef(null);
  const nextMessageId = useRef(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") return;
      cursorRef.current?.style.setProperty("--cursor-x", `${event.clientX - 27}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${event.clientY - 56}px`);
    };

    const handleClick = (event) => {
      if (event.pointerType === "touch" || event.detail === 0) return;
      setMessages((current) => [...current, {
        id: nextMessageId.current++,
        x: event.clientX,
        y: event.clientY,
      }]);
    };

    document.documentElement.classList.add("sticker-cursor-active");
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);
    return () => {
      document.documentElement.classList.remove("sticker-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const removeMessage = (id) => {
    setMessages((current) => current.filter((message) => message.id !== id));
  };

  return (
    <>
      <img
        ref={cursorRef}
        className="sticker-cursor"
        src={sticker}
        alt=""
        aria-hidden="true"
      />
      {messages.map((message) => (
        <span
          key={message.id}
          className="cursor-message"
          style={{ left: message.x, top: message.y }}
          onAnimationEnd={() => removeMessage(message.id)}
          aria-hidden="true"
        >
          VALEUUUU PARCEIRO
        </span>
      ))}
    </>
  );
}
