import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TierContainer } from "./TierContainer";
import "./TierList.css";

export function SortableTierList(props) {
  const [initialTierList, initialTierInfo] = makeTierListMaps(props.tiers);
  const [tiers, setTiers] = useState(initialTierList);
  const unassigned = tiers["t0"];
  const assigned = Object.entries(tiers).filter(([id, _]) => true);
  const unassignedItems = unassigned.map((itemId) => {
    return props.items.find((item) => item.id === itemId);
  });

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setTiers((tiers) => move(tiers, event));
      }}
    >
      <div>
        {assigned.map(([tierId, tier]) => {
          const items = tier.map((itemId) => {
            return props.items.find((item) => item.id === itemId);
          });
          return tierId !== "t0" ? (
            <TierContainer
              key={tierId}
              id={tierId}
              name={initialTierInfo[tierId].name}
              items={items}
            />
          ) : null;
        })}
        <TierContainer
          id={"t0"}
          name={initialTierInfo["t0"].name}
          items={unassignedItems}
          unassigned
        />
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
