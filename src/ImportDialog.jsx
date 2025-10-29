import { useRef } from "react";

export function ImportDialog({ onImport }) {
  const dialogRef = useRef(null);

  function handleOpenClick() {
    dialogRef.current.showModal();
  }

  function handleCancelClick() {
    dialogRef.current.close();
  }

  function handleSubmit(e) {
    const data = new FormData(e.target);
    const file = data.get("jsonfile");

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      onImport(reader.result);
    });
    reader.readAsText(file);
  }

  return (
    <>
      <button onClick={handleOpenClick}>Import</button>

      <dialog ref={dialogRef}>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="dialog-title">Import</div>
          <div className="dialog-content">
            <input type="file" name="jsonfile" accept="application/json" />
          </div>
          <div className="dialog-actions">
            <button>Import</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
