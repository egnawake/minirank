import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TierContainer } from "./TierContainer";
import "./TierList.css";

export function SortableTierList(props) {
  const [initialTierList, initialTierInfo] = makeTierListMaps(props.tiers);
  const [tiers, setTiers] = useState(initialTierList);
  const [items, setItems] = useState(props.items);
  const [tierInfo, setTierInfo] = useState(initialTierInfo);
  const [imageUrl, setImageUrl] = useState("");
  const [tierIdIncrement, setTierIdIncrement] = useState(props.tiers.length);

  const unassigned = tiers["t0"];
  const assigned = Object.entries(tiers).filter(([id, _]) => true);
  const unassignedItems = unassigned.map((itemId) => {
    return items.find((item) => item.id === itemId);
  });

  function onNameChanged(id, name) {
    const newTierInfo = {
      ...tierInfo,
      [id]: {
        ...tierInfo[id],
        name: name,
      },
    };

    setTierInfo(newTierInfo);
  }

  function handleAddItemClick() {
    if (imageUrl === "") {
      return;
    }

    if (items.find((item) => item.id === imageUrl) !== undefined) {
      return;
    }

    const newItem = {
      id: imageUrl,
      name: "",
      image: imageUrl,
    };
    setItems([...items, newItem]);

    const newTiers = {
      ...tiers,
      ["t0"]: [...tiers["t0"], imageUrl],
    };
    setTiers(newTiers);
  }

  function handleAddTierClick() {
    const newId = `t${tierIdIncrement}`;
    const newTiers = {
      ...tiers,
      [newId]: [],
    };
    setTiers(newTiers);

    const newTierInfo = {
      ...tierInfo,
      [newId]: {
        id: newId,
        name: "",
      },
    };
    setTierInfo(newTierInfo);

    setTierIdIncrement(tierIdIncrement + 1);
  }

  function handleTierRemove(id) {
    // Keep at least 1 tier (plus 1 - the unassigned tier)
    if (Object.keys(tiers).length <= 2) {
      return;
    }

    const itemsInTier = tiers[id];

    const newTiers = {};
    const keys = Object.keys(tiers).filter((key) => key !== id);
    for (const k of keys) {
      newTiers[k] = tiers[k];
    }
    newTiers["t0"] = [...tiers["t0"], ...itemsInTier];
    setTiers(newTiers);
  }

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setTiers((tiers) => move(tiers, event));
      }}
    >
      <div>
        {assigned.map(([tierId, tier]) => {
          const assignedItems = tier.map((itemId) => {
            return items.find((item) => item.id === itemId);
          });
          return tierId !== "t0" ? (
            <TierContainer
              key={tierId}
              id={tierId}
              name={tierInfo[tierId].name}
              items={assignedItems}
              nameChanged={(name) => {
                onNameChanged(tierId, name);
              }}
              onRemove={() => {
                handleTierRemove(tierId);
              }}
            />
          ) : null;
        })}
        <button type="button" onClick={handleAddTierClick}>Add tier</button>
        <div className="bottom-bar">
          <input type="text" value={imageUrl} onChange={(e) => {
            setImageUrl(e.target.value);
          }} className="image-url-input" />
          <button type="button" onClick={handleAddItemClick} className="add-item-button">Add</button>
          <TierContainer
            id={"t0"}
            name={initialTierInfo["t0"].name}
            items={unassignedItems}
            unassigned
          />
        </div>
      </div>
    </DragDropProvider>
  );
}

function makeTierListMaps(tierList) {
  const tierLists = tierList.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.id]: cur.items,
    };
  }, {});

  const tierInfo = tierList.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.id]: { id: cur.id, name: cur.name },
    };
  }, {});

  return [tierLists, tierInfo];
}
