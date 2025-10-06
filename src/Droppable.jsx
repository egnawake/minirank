import { useDroppable } from "@dnd-kit/core";

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    height: "85px",
    width: "85px",
    border: "1px solid white",
    borderColor: isOver ? "white" : "#cccccc",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
