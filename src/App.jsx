import { useEffect } from "react";
import "./App.css";
import { SortableTierList } from "./SortableTierList";

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
  {
    id: "https://purrfect-cattery.co.uk/wp-content/uploads/2022/02/pixabay_ben-kerckx_cat-300572_1920.jpg",
    name: "One more cat",
    image:
      "https://purrfect-cattery.co.uk/wp-content/uploads/2022/02/pixabay_ben-kerckx_cat-300572_1920.jpg",
  },
  {
    id: "http://upload.wikimedia.org/wikipedia/commons/d/d4/Cat_March_2010-1a.jpg",
    name: "One more cat",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/d/d4/Cat_March_2010-1a.jpg",
  },
  {
    id: "https://hips.hearstapps.com/hmg-prod/images/close-up-of-cat-sitting-on-wood-turkish-angora-cat-royalty-free-image-1658453231.jpg?crop=0.738xw:0.738xh;0.119xw",
    name: "One more cat",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/close-up-of-cat-sitting-on-wood-turkish-angora-cat-royalty-free-image-1658453231.jpg?crop=0.738xw:0.738xh;0.119xw",
  },
  {
    id: "https://www.momtastic.com/wp-content/uploads/sites/5/2013/12/Cat.jpg",
    name: "One more cat",
    image:
      "https://www.momtastic.com/wp-content/uploads/sites/5/2013/12/Cat.jpg",
  },
];

const initialTiers = [
  {
    id: "t0",
    name: "",
    items: items.map((item) => item.id),
  },
  {
    id: "t1",
    name: "S",
    items: [],
  },
  {
    id: "t2",
    name: "A",
    items: [],
  },
  {
    id: "t3",
    name: "B",
    items: [],
  },
];

function App() {
  useEffect(() => {
    const url = new URL(document.location.href);

    const base64 = atob(url.pathname.replace("/", ""));

    let json = null;
    try {
      json = JSON.parse(base64);
    } catch (e) {
      console.log("Invalid JSON");
    }

    console.log("Data:", json);
  }, []);
  return <SortableTierList items={items} tiers={initialTiers} />;
}

export default App;
