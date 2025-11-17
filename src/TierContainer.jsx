import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { TierItem } from "./TierItem";
import { Icon } from "./Icon";

export function TierContainer({
  id,
  name,
  items,
  unassigned,
  removeMode,
  nameChanged,
  onRemove,
  onItemRemove,
  onItemView,
}) {
  const { ref } = useDroppable({
    id,
    type: "tier-container",
    accept: "tier-item",
    collisionPriority: CollisionPriority.Low,
  });

  function onNameChange(e) {
    nameChanged(e.target.value);
  }

  function handleRemoveClick(e) {
    onRemove();
  }

  return (
    <div className="tier">
      {!unassigned ? (
        <div className="tier-title">
          <input type="text" value={name} onChange={onNameChange} />
          <button type="button" onClick={handleRemoveClick}>
            <Icon icon="delete" />
          </button>
        </div>
      ) : null}
      <div
        ref={ref}
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
            onView={onItemView}
          />
        ))}
      </div>
    </div>
  );
}
