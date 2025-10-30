import { useState, useRef } from "react";
import { Icon } from "./Icon";

export function ShareDialog({ tierListName, tiers, items }) {
  const dialogRef = useRef(null);
  const [href, setHref] = useState("");

  function handleOpenClick() {
    const data = {
      tiers,
      items,
    };
    const json = JSON.stringify(data);
    const href = `data:application/json,${json}`;
    setHref(href);

    dialogRef.current.showModal();
  }

  function handleCancelClick() {
    dialogRef.current.close();
  }

  return (
    <>
      <button onClick={handleOpenClick}>
        <Icon icon="export" />
      </button>

      <dialog ref={dialogRef}>
        <form method="dialog">
          <div className="dialog-title">Share</div>
          <div className="dialog-content">
            <a href={href} download={`${tierListName}.json`}>Download</a>
          </div>
          <div className="dialog-actions">
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
