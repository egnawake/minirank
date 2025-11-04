import { useRef } from "react";
import { Icon } from "./Icon";
import { TrashBin } from "./TrashBin";

export function NewItemDialog({ isDragHappening, onConfirm }) {
  const dialogRef = useRef(null);

  function handleOpenClick() {
    dialogRef.current.showModal();
  }

  function handleCancelClick() {
    dialogRef.current.close();
  }

  function handleSubmit(e) {
    const data = new FormData(e.target);
    const name = data.get("name");
    const url = data.get("imageurl");

    e.target.reset();

    onConfirm(name, url);
  }

  return (
    <>
      {isDragHappening ? (
        <TrashBin />
      ) : (
        <button onClick={handleOpenClick} className="add-item-button">
          <Icon icon="plus" />
        </button>
      )}

      <dialog ref={dialogRef}>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="dialog-title">New item</div>
          <div className="dialog-content">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="form-field">
              <label htmlFor="imageurl">Image URL</label>
              <input type="text" name="imageurl" id="imageurl" />
            </div>
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
