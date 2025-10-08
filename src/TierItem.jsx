import { Draggable } from "./Draggable";

export function TierItem({ id, name, image }) {
  return (
    <Draggable id={id}>
      <img src={image} alt={name} width={80} height={80} />
    </Draggable>
  );
}
