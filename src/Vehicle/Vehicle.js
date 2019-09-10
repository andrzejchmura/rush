import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";
import css from "./vehicle.module.css";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const Vehicle = ({ isPrimary, isVertical, size, position, onClick, id }) => {
  const ref = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const target = ref.current;

    target.addEventListener("mousedown", handleStart);

    let start;

    console.log("effect fires");

    function handleStart(event) {
      start = isVertical ? event.clientY : event.clientX;

      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleEnd);
    }

    function handleDrag(event) {
      event.stopPropagation();
      event.preventDefault();

      let delta = isVertical ? event.clientY - start : event.clientX - start;

      let result = clamp(distance + delta, 0, 600 - size * 100);
      console.log(result);
      setDistance(result);
    }

    function handleEnd(event) {
      start = null;
      setDistance(0);

      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleStart);
    }

    return () => {
      target.removeEventListener("mousedown", handleStart);
    };
  }, [distance]);

  const className = cx({
    [css.container]: true,
    [css.primary]: isPrimary,
    [css.horizontal]: !isVertical,
    [css.vertical]: isVertical,
    [css.two]: size === 2,
    [css.three]: size === 3
  });

  // const style = {
  //   // left: position.x * 100,
  //   // top: position.y * 100,
  //   transform: isVertical
  //     ? `translateY(${distance}px)`
  //     : `translateX(${distance}px)`
  // };

  const style = {
    // left: position.x * 100,
    // top: position.y * 100,
    transform: `translate(${position.x * 100 + distance}px, ${position.y *
      100})`
  };

  return (
    <div
      className={className}
      ref={ref}
      style={style}
      onClick={() => onClick(id)}
    />
  );
};

export default Vehicle;
