import { useDroppable } from "@dnd-kit/react";
import { Icon } from "./Icon";

export function TrashBin() {
  const { ref, isDropTarget } = useDroppable({
    id: "trash",
    accepts: "tier-item",
  });

  return (
    <div
      ref={ref}
      className={"trash-bin" + (isDropTarget ? " drop-target" : "")}
    >
      <Icon icon="trash" />
    </div>
  );
}
