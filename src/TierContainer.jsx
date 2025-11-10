import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { TierItem } from "./TierItem";
import { Icon } from "./Icon";

export function TierContainer({
  id,
  name,
  index,
  items,
  unassigned,
  removeMode,
  nameChanged,
  onRemove,
  onItemRemove,
}) {
  const { ref, handleRef } = useSortable({
    id,
    index,
    type: "tier-container",
    accept: ["tier-item", "tier-container"],
    collisionPriority: CollisionPriority.Low,
  });

  function onNameChange(e) {
    nameChanged(e.target.value);
  }

  function handleRemoveClick(e) {
    onRemove();
  }

  return (
    <div ref={ref} className="tier">
      {!unassigned ? (
        <div className="tier-title">
          <button type="button" ref={handleRef} className="drag-handle">
            <Icon icon="arrow-unsorted" />
          </button>
          <input type="text" value={name} onChange={onNameChange} />
          <button type="button" onClick={handleRemoveClick}>
            <Icon icon="delete" />
          </button>
        </div>
      ) : null}
      <div
        className={"tier-container" + (unassigned ? " unassigned" : "")}
      >
        {items.map((item, index) => (
          <TierItem
            key={item.image}
            id={item.image}
            index={index}
            group={id}
            name={item.name}
            image={item.image}
            removeMode={removeMode}
            onRemove={onItemRemove}
          />
        ))}
      </div>
    </div>
  );
}
