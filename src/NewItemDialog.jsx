import { useRef } from "react";

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
      <button onClick={handleOpenClick}>Add</button>

      <dialog ref={dialogRef}>
        <form method="dialog" onSubmit={handleSubmit}>
          <label htmlFor="imageurl">Image URL</label>
          <input type="text" name="imageurl" id="imageurl" />
          <button>Add</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </dialog>
    </>
  );
}
