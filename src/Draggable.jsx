import { useDraggable } from "@dnd-kit/react";

export function Draggable({ id, children }) {
  const { ref, isDragging } = useDraggable({ id });

  return (
    <button ref={ref} className={isDragging ? "dragging" : ""}>
      {children}
    </button>
  );
}
