import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { TierItem } from "./TierItem";

export function TierContainer({ id, name, items, unassigned }) {
  const { ref } = useDroppable({
    id,
    type: "tier-container",
    accept: "tier-item",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className={"tier-container" + (unassigned ? " unassigned" : "")}
    >
      {items.map((item, index) => (
        <TierItem
          key={item.id}
          id={item.id}
          index={index}
          group={id}
          name={item.name}
          image={item.image}
        />
      ))}
    </div>
  );
}
