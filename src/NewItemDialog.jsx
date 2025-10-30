import { useRef } from "react";
import { Icon } from "./Icon";

export function NewItemDialog({ onConfirm }) {
  const dialogRef = useRef(null);

  function handleOpenClick() {
    dialogRef.current.showModal();
  }

  function handleCancelClick() {
    dialogRef.current.close();
  }

  function handleSubmit(e) {
    const data = new FormData(e.target);
    const url = data.get("imageurl");
    e.target.reset();
    onConfirm(url);
  }

  return (
    <>
      <button onClick={handleOpenClick}>
        <Icon icon="plus" />
      </button>

      <dialog ref={dialogRef}>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="dialog-title">New item</div>
          <div className="dialog-content">
            <label htmlFor="imageurl">Image URL</label>
            <input type="text" name="imageurl" id="imageurl" />
          </div>
          <div className="dialog-actions">
            <button>Add</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
