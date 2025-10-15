import { useDroppable } from "@dnd-kit/react";

export function Droppable({ id, children }) {
  const { ref, isDropTarget } = useDroppable({ id });
  const style = {
    width: "80vw",
    height: "85px",
    border: "1px solid white",
    borderColor: isDropTarget ? "white" : "#cccccc",
    marginBlock: "20px",
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
