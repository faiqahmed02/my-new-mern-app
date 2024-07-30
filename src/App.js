import React, { useState, useEffect } from "react";
import "./App.css";
import AddItemForm from "./AddItem";
import axios from "axios";

function App() {
  const [message, setMessage] = useState([]);
  const [name, setName] = useState('');

  const handleGet = async () => {
    await axios.get("/api/items").then((res) => {
      console.log(res.data);
      // const data = JSON.stringify(res.data)
      setMessage(res.data);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/items/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert('Item added successfully');
        handleGet()
        setName(''); // Clear the input field

      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred')
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/items/delete/${id}`)
      console.log(response.data); // Handle the response data
      handleGet();
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
   
  };

  useEffect(() => {
    // fetch("/api/items")
    //   .then((response) => {
    //     console.log(response.body);
    //     response.text()})
    handleGet();
  }, [message.length]);
  // console.log(typeof(message));
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>{message}</p> */}
        <ul>
          {message
            ? message.map((d, i) => {
                return (
                  <li key={i}>
                    {d.name}{" "}
                    <span style={{ color: "red" }} onClick={() => handleDelete(d._id)}>
                      Delete
                    </span>{" "}
                  </li>
                );
              })
            : ""}
        </ul>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
      </header>
    </div>
  );
}

export default App;
