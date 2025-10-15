import { useSortable } from "@dnd-kit/react/sortable";

export function Sortable({ id, index, group, children }) {
  const { ref } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group,
  });

  return (
    <button ref={ref}>
      {children}
    </button>
  );
}
