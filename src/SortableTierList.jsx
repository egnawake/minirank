import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TierContainer } from "./TierContainer";
import { NewItemDialog } from "./NewItemDialog";
import "./TierList.css";

export function SortableTierList(props) {
  const [tiers, setTiers] = useState(props.tiers);
  const [items, setItems] = useState(props.items);

  // TODO: make tierIdIncrement a ref
  const [tierIdIncrement, setTierIdIncrement] = useState(props.tiers.length);

  const [removeMode, setRemoveMode] = useState(false);

  const unassigned = tiers.itemPlacement["t0"];
  const unassignedItems = unassigned.map((itemId) => {
    return items.find((item) => item.image === itemId);
  });

  const assigned = tiers.order.filter((id) => id !== "t0");

  function onNameChanged(id, name) {
    const newTiers = {
      ...tiers,
      names: {
        ...tiers.names,
        [id]: name,
      },
    };

    setTiers(newTiers);
  }

  function handleNewItemSubmit(imageUrl) {
    if (imageUrl === "") {
      return;
    }

    if (items.find((item) => item.image === imageUrl) !== undefined) {
      return;
    }

    const newItem = {
      name: "",
      image: imageUrl,
    };
    setItems([...items, newItem]);

    const newTiers = {
      ...tiers,
      itemPlacement: {
        ...tiers.itemPlacement,
        ["t0"]: [imageUrl, ...tiers.itemPlacement["t0"]],
      },
    };
    setTiers(newTiers);
  }

  function handleAddTierClick() {
    const newId = `t${tierIdIncrement}`;
    const newTiers = {
      itemPlacement: {
        ...tiers.itemPlacement,
        [newId]: [],
      },
      names: {
        ...tiers.names,
        [newId]: "New tier",
      },
      order: [...tiers.order, newId],
    };
    setTiers(newTiers);

    setTierIdIncrement(tierIdIncrement + 1);
  }

  function handleTierRemove(id) {
    // Keep at least 1 tier (plus 1 - the unassigned tier)
    if (tiers.order.length <= 2) {
      return;
    }

    const itemsInTier = tiers.itemPlacement[id];

    const newTiers = {
      ...tiers,
      itemPlacement: {
        ...tiers.itemPlacement,
        ["t0"]: [...tiers.itemPlacement["t0"], ...itemsInTier],
      },
      order: tiers.order.filter((tierId) => id !== tierId),
    };

    delete newTiers.itemPlacement[id];
    delete newTiers.names[id];

    setTiers(newTiers);
  }

  function handleRemoveItemsClick() {
    setRemoveMode(!removeMode);
  }

  function handleItemRemove(id) {
    setItems(items.filter((item) => item.image !== id));

    const newTiers = {
      ...tiers,
      itemPlacement: {
        ...tiers.itemPlacement,
        ["t0"]: tiers.itemPlacement["t0"].filter((itemId) => itemId !== id),
      },
    };

    setTiers(newTiers);
  }

  function handleShareClick() {
    console.log("Not implemented yet");
  }

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setTiers((tiers) => {
          return {
            ...tiers,
            itemPlacement: move(tiers.itemPlacement, event),
          };
        })
      }}
    >
      <div className="tier-list">
        <div className="named-tiers">
          {assigned.map((tierId) => {
            const assignedItems = tiers.itemPlacement[tierId].map((itemId) => {
              return items.find((item) => item.image === itemId);
            });
            return (
              <TierContainer
                key={tierId}
                id={tierId}
                name={tiers.names[tierId]}
                items={assignedItems}
                nameChanged={(name) => {
                  onNameChanged(tierId, name);
                }}
                onRemove={() => {
                  handleTierRemove(tierId);
                }}
              />
            );
          })}
          <div className="add-tier-button-container">
            <button
              type="button"
              onClick={handleAddTierClick}
              className="add-tier-button"
            >
              Add tier
            </button>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="bottom-bar-limiter">
            <div className="unassigned-tier-wrapper">
              <TierContainer
                id={"t0"}
                name={tiers.names["t0"]}
                items={unassignedItems}
                unassigned
                removeMode={removeMode}
                onItemRemove={handleItemRemove}
              />
            </div>
            <div className="actions">
              <div className="row">
                <NewItemDialog onConfirm={handleNewItemSubmit} />
                <button
                  type="button"
                  onClick={handleRemoveItemsClick}
                  className="add-item-button"
                >
                  {!removeMode ? "Remove mode" : "End remove mode"}
                </button>
                <button type="button" onClick={handleShareClick}>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}
