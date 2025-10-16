import { Sortable } from "./Sortable";

export function TierItem({ id, index, group, name, image }) {
  return (
    <Sortable id={id} index={index} group={group}>
      <img src={image} alt={name} width={80} height={80} />
    </Sortable>
  );
}
