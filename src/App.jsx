import "./App.css";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { DebounceInput } from "react-debounce-input";

function App() {
    const [searchBook, setSearchBook] = useState("");
    const [result, setResult] = useState([]);

    
    const searchTheBook = async () => {
    
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchBook}`);
      setResult(response.data.items);

    };

    useEffect(() => {
      searchTheBook();
    }, [searchBook]);
  
  return (
    <div className="App">
    
      <h1>FInd A BOOKs.</h1>
  <DebounceInput
    type="text"
    debounceTimeout={1000}
    value={searchBook}
    onChange={(event) => setSearchBook(event.target.value)} />
  <ul>
        {result.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>
        })}
      </ul>
    </div>
)}

export default App;
