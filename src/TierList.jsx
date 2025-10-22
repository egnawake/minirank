import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { TierItem } from "./TierItem";
import { TierContainer } from "./TierContainer";

export function TierList(props) {
  const [tiers, setTiers] = useState(props.tiers);

  const items = props.items;

  function handleDragEnd({ active, over }) {
    if (over === null) {
      return;
    }

    const tierInId = over.id;
    const tierOutId = tiers.find((tier) => {
      return tier.items.includes(active.id);
    })?.id;

    if (tierInId === tierOutId) {
      return;
    }

    const newTiers = tiers.map((tier) => {
      if (tier.id === tierInId) {
        return {
          ...tier,
          items: [...tier.items, active.id],
        };
      }
      if (tier.id === tierOutId) {
        return {
          ...tier,
          items: tier.items.filter((itemId) => itemId !== active.id),
        };
      }
      return tier;
    });

    setTiers(newTiers);
  }

  const unassignedItems = items.filter((item) => {
    return !tiers.some((tier) => tier.items.includes(item.id));
  });

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {unassignedItems.map((item) => (
          <TierItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
          />
        ))}
        {tiers.map((tier) => {
          return (
            <TierContainer
              key={tier.id}
              id={tier.id}
              name={tier.name}
              items={tier.items.map((itemId) =>
                items.find((item) => item.id === itemId),
              )}
            />
          );
        })}
      </DndContext>
    </>
  );
}
