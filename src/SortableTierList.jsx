import { useState } from "react";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  DragDropProvider
} from "@dnd-kit/react";

import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";

import { Droppable } from "./Droppable";
import { Sortable } from "./Sortable";

export function SortableTierList(props) {
  const [tiers, setTiers] = useState(makeTierListMap(props.tiers));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function tierItem(id, index, group) {
    const item = props.items.find((el) => el.id === id);

    return (
      <Sortable key={id} id={id} index={index} group={group}>
        <img src={item.image} alt={item.name} height={50} width={50} />
      </Sortable>
    );
  }

  function handleDragOver({ event, manager }) {
    const { operation } = event;
    const { source: active, target: over } = operation;

    if (active.id === over.id) {
      return;
    }

    const activeTier = tiers.find(tier => tier.items.includes(active.id));

    const containerId = over.id.startsWith("t")
      ? over.id
      : null;

    if (containerId === activeTier.id) {
      return;
    }

    if (containerId !== null) {
      const newTiers = tiers.map((tier) => {
        // Remove item from its current tier
        if (tier.id === activeTier.id) {
          return {
            ...tier,
            items: tier.items.filter(id => id !== active.id),
          };
        }
        // Add item to new tier
        if (tier.id === containerId) {
          return {
            ...tier,
            items: [...tier.items, active.id],
          };
        }
        return tier;
      });

      setTiers(newTiers);
      return;
    }

    const overTier = tiers.find((tier) => tier.items.includes(over.id));

    if (activeTier.id === overTier.id) {
      const newTiers = tiers.map((tier) => {
        if (tier.id === activeTier.id) {
          const oldIndex = tier.items.indexOf(active.id);
          const newIndex = tier.items.indexOf(over.id);
          return {
            ...tier,
            items: arrayMove(tier.items, oldIndex, newIndex),
          };
        }
        return tier;
      });
      setTiers(newTiers);
      return;
    }

    const newTiers = tiers.map((tier) => {
      if (tier.id === activeTier.id) {
        return {
          ...tier,
          items: tier.items.filter(id => id !== active.id),
        };
      }
      if (tier.id === overTier.id) {
        const overIndex = overTier.items.indexOf(over.id);
        return {
          ...tier,
          items: [...tier.items.slice(0, overIndex), active.id, ...tier.items.slice(overIndex)],
        };
      }
      return tier;
    });
    setTiers(newTiers);
  }

  function handleDragEnd(e) {
    const { active, over } = e;

    if (active.id === over.id) {
      return;
    }

    const activeTier = tiers.find(tier => tier.items.includes(active.id));

    const containerId = over.id.startsWith("t")
      ? over.id
      : null;

    if (containerId === activeTier.id) {
      return;
    }

    if (containerId !== null) {
      const newTiers = tiers.map((tier) => {
        // Remove item from its current tier
        if (tier.id === activeTier.id) {
          return {
            ...tier,
            items: tier.items.filter(id => id !== active.id),
          };
        }
        // Add item to new tier
        if (tier.id === containerId) {
          return {
            ...tier,
            items: [...tier.items, active.id],
          };
        }
        return tier;
      });

      setTiers(newTiers);
      return;
    }

    const overTier = tiers.find((tier) => tier.items.includes(over.id));

    if (activeTier.id === overTier.id) {
      const newTiers = tiers.map((tier) => {
        if (tier.id === activeTier.id) {
          const oldIndex = tier.items.indexOf(active.id);
          const newIndex = tier.items.indexOf(over.id);
          return {
            ...tier,
            items: arrayMove(tier.items, oldIndex, newIndex),
          };
        }
        return tier;
      });
      setTiers(newTiers);
      return;
    }

    const newTiers = tiers.map((tier) => {
      if (tier.id === activeTier.id) {
        return {
          ...tier,
          items: tier.items.filter(id => id !== active.id),
        };
      }
      if (tier.id === overTier.id) {
        const overIndex = overTier.items.indexOf(over.id);
        return {
          ...tier,
          items: [...tier.items.slice(0, overIndex), active.id, ...tier.items.slice(overIndex)],
        };
      }
      return tier;
    });
    setTiers(newTiers);
  }

  return (
    <div>
      {Object.values(tiers).map((tier) => (
        <div key={tier.id} id={tier.id} style={{ height: "100px", border: "1px solid white" }}>
          {tier.items.map((id, index) => tierItem(id, index, tier.id))}
        </div>
      ))}
    </div>
  );
}

function makeTierListMap(tierList) {
  return tierList.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.id]: cur,
    };
  }, {});
}
