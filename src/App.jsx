import { Form } from "./assets/component/Form";
import { Logo } from "./assets/component/Logo";
import { PackingList } from "./assets/component/PackingList";
import { Stats } from "./assets/component/Stats";
import { useState, useEffect } from "react";

export default function App() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // const [completed, setCompleted] = useState(false);

  function handleAddItem(item){
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
      if (!window.confirm("Are you sure you want to clear the list?")) return;
         setItems([]);
    }

  

  function handleToggleItem(id){
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // setItems((items) => [...items, newItem]);
    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
    console.log(newItem);
  }


  return (
    <div className="app">
      <Logo />
      <Form
        onSubmit={handleSubmit}
        description={description}
        quantity={quantity}
        setDescription={setDescription}
        setQuantity={setQuantity}
      />
      <PackingList items={items} setItems={setItems} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} handleClearList={handleClearList} />
      <Stats items={items} />
    </div>
  );
}
