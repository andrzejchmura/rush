import React, { useState } from "react";
import Vehicle from "../Vehicle/Vehicle";
import css from "./board.module.css";

const vs = [
  {
    id: 0,
    size: 2,
    position: { x: 2, y: 0 },
    isVertical: false
  },
  {
    id: 1,
    size: 3,
    position: { x: 0, y: 3 },
    isVertical: true
  }
];

const Board = () => {
  const [vehicles, setVehicles] = useState(vs);

  function handleVehicleChange(id, pos) {
    console.log(id);
    const result = vehicles.map(v => {
      if (v.id === id) {
        return 42;
      }
      return v;

      setVehicles(result);
    });
  }
  return (
    <div className={css.container}>
      {vehicles.map(v => (
        <Vehicle
          key={v.id}
          id={v.id}
          size={v.size}
          position={v.position}
          isVertical={v.isVertical}
          onClick={handleVehicleChange}
        />
      ))}
    </div>
  );
};

export default Board;
