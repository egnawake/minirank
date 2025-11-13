import { useEffect, useRef } from "react";

export function Tooltip() {
  const tooltipRef = useRef(null);

  useEffect(() => {
    function handleMouseMove(e) {
      console.log(e.clientX, e.clientY);
      tooltipRef.current.style = {
        transform: `translate(${e.clientX}, ${e.clientY})`,
      };
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={tooltipRef} className="tooltip">Tooltip</div>
  );
}
