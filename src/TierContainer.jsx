import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { TierItem } from "./TierItem";

export function TierContainer({ id, name, items }) {
  const { ref } = useDroppable({
    id,
    type: "container",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  const style = {
    width: "280px",
    height: "100px",
    border: "1px solid #dddddd",
    padding: "8px",
  };

  return (
    <div>
      <p>{name}</p>
      <div style={style} ref={ref}>
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
    </div>
  );
}
