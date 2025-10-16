import { useSortable } from "@dnd-kit/react/sortable";

export function TierItem({ id, index, group, name, image }) {
  const { ref } = useSortable({
    id,
    index,
    type: "tier-item",
    accept: "tier-item",
    group,
  });

  return (
    <img
      ref={ref}
      src={image}
      alt={name}
      width={50}
      height={50}
      className="tier-item"
    />
  );
}
