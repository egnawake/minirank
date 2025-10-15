import "./App.css";
import { SortableTierList } from "./SortableTierList";

const initialTiers = [
  {
    id: "t0",
    name: "",
    items: ["i0", "i2"],
  },
  {
    id: "t1",
    name: "S",
    items: [],
  },
  {
    id: "t2",
    name: "A",
    items: ["i1"],
  },
  {
    id: "t3",
    name: "B",
    items: [],
  },
];

const items = [
  {
    id: "i0",
    name: "Cat",
    image:
      "https://www.litter-robot.com/media/wysiwyg/blue_cream_himalayan_cat_color.jpeg",
  },
  {
    id: "i1",
    name: "Another cat",
    image:
      "https://www.thesprucepets.com/thmb/cZCaN3uMPVX2SdL4lsn5xGnIGPM=/1112x1077/filters:no_upscale():max_bytes(150000):strip_icc()/AmericanShorthair-a379c1f6515945b286ad321df678b14b.jpg",
  },
  {
    id: "i2",
    name: "One more cat",
    image:
      "https://www.boredpanda.com/blog/wp-content/uploads/2022/12/63987559eec1d_hw2bszj0cu3a1__700.jpg",
  },
];

function App() {
  return <SortableTierList items={items} tiers={initialTiers} />;
}

export default App;
