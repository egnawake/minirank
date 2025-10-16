import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TierContainer } from "./TierContainer";

export function SortableTierList(props) {
  const [initialTierList, initialTierInfo] = makeTierListMaps(props.tiers);
  const [tiers, setTiers] = useState(initialTierList);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setTiers((tiers) => move(tiers, event));
      }}
    >
      <div>
        {Object.entries(tiers).map(([tierId, tier]) => {
          const items = tier.map((itemId) => {
            return props.items.find((item) => item.id === itemId);
          });
          return (
            <TierContainer
              key={tierId}
              id={tierId}
              name={initialTierInfo[tierId].name}
              items={items}
            />
          );
        })}
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
