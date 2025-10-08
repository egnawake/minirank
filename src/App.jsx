import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import "./App.css";
import { TierItem } from "./TierItem";
import { TierContainer } from "./TierContainer";

const initialTiers = [
  {
    id: 0,
    name: "S",
    items: [],
  },
  {
    id: 1,
    name: "A",
    items: [],
  },
  {
    id: 2,
    name: "B",
    items: [],
  },
];

const items = [
  {
    id: 0,
    name: "Cat",
    image:
      "https://www.litter-robot.com/media/wysiwyg/blue_cream_himalayan_cat_color.jpeg",
  },
  {
    id: 1,
    name: "Another cat",
    image:
      "https://www.thesprucepets.com/thmb/cZCaN3uMPVX2SdL4lsn5xGnIGPM=/1112x1077/filters:no_upscale():max_bytes(150000):strip_icc()/AmericanShorthair-a379c1f6515945b286ad321df678b14b.jpg",
  },
];

function App() {
  const [tiers, setTiers] = useState(initialTiers);

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

    console.log(newTiers);

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

export default App;
