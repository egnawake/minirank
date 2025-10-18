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
            />
          ) : null;
        })}
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
