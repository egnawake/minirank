import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Sortable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
