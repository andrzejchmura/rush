import { useEffect } from "react";

function useDrag(ref) {
  useEffect(() => {
    const target = ref.target;
    if (!target) return;

    target.addEventListener("mousedown", handleStart);

    let start;

    function handleStart(event) {
      start = event.clientX;

      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleEnd);
    }

    function handleDrag(event) {
      event.stopPropagation();
      event.preventDefault();

      const distance = event.clientX - start;
      console.log(distance);
    }

    function handleEnd(event) {
      start = null;

      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleStart);
    }

    return () => {
      target.removeEventListener("mousedown", handleStart);
    };
  }, []);
}

export default useDrag;
