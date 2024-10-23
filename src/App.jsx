import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]); 

  // Ma'lumotlarni olish funksiyasi
  const fetchData = () => {
    fetch("http://localhost:3600/todos")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Xatolik:', error));
  };

  // useEffect orqali ma'lumotlarni yuklash
  useEffect(() => {
    fetchData(); // Komponent yuklanganda ma'lumotlarni oladi
  }, []);

  // Ma'lumotni o'chirish funksiyasi
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

  return (
    <>
      {data.map((item) => (
        <div className="w-[300px] mb-[20px] p-2 rounded-[20px] border border-[2px] border-[red]" key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <button onClick={() => deleteItem(item.id)} className="rounded-[20px] bg-[red] p-2">delete</button>
          <button className="rounded-[20px] bg-[green] p-2">edit</button>
        </div>
      ))}
    </>
  );
}

export default App;
