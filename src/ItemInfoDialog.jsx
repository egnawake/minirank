export function ItemInfoDialog({ ref, name, imageUrl }) {
  return (
    <dialog ref={ref} closedby="any" className="item-info-dialog">
      <div class="item-info-box">
        <img src={imageUrl} className="item-info-image" />
        <span className="item-info-name">{name}</span>
      </div>
    </dialog>
  );
}
