import { useSortable } from "@dnd-kit/react/sortable";

export function TierItem({
  id,
  index,
  group,
  name,
  image,
  removeMode,
  onRemove,
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "tier-item",
    accept: "tier-item",
    group,
  });

  const draggingStyle = {
    opacity: "60%",
  };

  function handleItemClick() {
    if (removeMode) {
      onRemove(id);
    }
  }

  return (
    <img
      ref={ref}
      src={image}
      alt={name}
      className="tier-item"
      style={isDragging ? draggingStyle : {}}
      onClick={handleItemClick}
    />
  );
}
