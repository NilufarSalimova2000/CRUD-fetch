import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '' });


  const fetchData = () => {
    fetch("http://localhost:3600/todos")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Xatolik:', error));
  };


  useEffect(() => {
    fetchData();
  }, []);

  const createItem = () => {
    fetch("http://localhost:3600/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
        setNewItem({ title: '', description: '' });
      })
      .catch((error) => console.error('Yangi ma’lumot yaratishda xatolik:', error));
  };


  const deleteItem = (id) => {
    fetch(`http://localhost:3600/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          fetchData();
        } else {
          console.error('O‘chirishda xatolik yuz berdi');
        }
      })
      .catch((error) => console.error('Ma’lumotni o‘chirishda xatolik:', error));
  };


  const editItem = (item) => {
    const newTitle = prompt("Yangi sarlavhani kiriting:", item.title);
    const newDescription = prompt("Yangi tavsifni kiriting:", item.description);

    if (newTitle && newDescription) {
      fetch(`http://localhost:3600/todos/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...item, title: newTitle, description: newDescription })
      })
        .then((res) => {
          if (res.ok) {
            fetchData();
          } else {
            console.error('Tahrirlashda xatolik yuz berdi');
          }
        })
        .catch((error) => console.error('Ma’lumotni tahrirlashda xatolik:', error));
    }
  };

  return (
    <>
      <div className="container">
        <div className="mb-5 mt-5">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <button onClick={createItem} className="bg-blue-500 text-white p-2 rounded">
            Add
          </button>
        </div>
      </div>

      <div className="container">
        {data.map((item) => (
          <div className="w-[300px] mb-[20px] p-2 rounded border border-[2px] border-blue-500" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item.id)} className="rounded bg-[red] p-2 mr-2">delete</button>
            <button onClick={() => editItem(item)} className="rounded bg-[green] p-2">edit</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
