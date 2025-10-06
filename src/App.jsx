import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import "./App.css";

function App() {
  const [parent, setParent] = useState(null);
  const containers = ["S", "A", "B", "C"];

  const draggable = (
    <Draggable id="draggable">
      <img
        src="https://www.litter-robot.com/media/wysiwyg/blue_cream_himalayan_cat_color.jpeg"
        width={80}
        height={80}
      />
    </Draggable>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {!parent ? draggable : null}
        {containers.map((container) => (
          <Droppable key={container} id={container}>
            {parent === container ? draggable : "Drop here"}
          </Droppable>
        ))}
      </DndContext>
    </>
  );
}

export default App;
