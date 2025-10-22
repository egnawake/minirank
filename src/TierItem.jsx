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
  const { ref } = useSortable({
    id,
    index,
    type: "tier-item",
    accept: "tier-item",
    group,
  });

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
      width={50}
      height={50}
      className="tier-item"
      onClick={handleItemClick}
    />
  );
}
