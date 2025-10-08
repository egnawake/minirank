import { useDroppable } from "@dnd-kit/core";
import { TierItem } from "./TierItem";

export function TierContainer({ id, name, items }) {
  const { setNodeRef } = useDroppable({ id });

  const style = {
    minWidth: "100px",
    height: "100px",
    border: "1px solid #dddddd",
  };

  return (
    <div>
      <input type="text" defaultValue={name} />
      <div style={style} ref={setNodeRef}>
        {items.map((item) => (
          <TierItem
            key={item.name}
            id={item.id}
            name={item.name}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
