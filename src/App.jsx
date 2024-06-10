import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [Timer, setTimer] = useState(null);

  const searchBook = async (text) => {
    try {
      const data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      setSearchResult(data.data.items);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Timer) {
      clearTimeout(Timer);
    }

    const timerId = setTimeout(() => {
      if (searchText) {
        searchBook(searchText);
      }
    }, 500);

    setTimer(timerId);
    return () => clearTimeout(timerId);
  }, [searchText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      {searchResult.map((item, index) => (
        <div key={index}>
          <li>{item["volumeInfo"].title}</li>
        </div>
      ))}
    </div>
  );
}

export default App;
