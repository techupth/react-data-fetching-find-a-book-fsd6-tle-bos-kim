import axios from "axios";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
useState;
function Search() {
  const [inputMessage, setInputmessage] = useState("");
  const [message, setMessage] = useState([]);
  const googleSearch = async () => {
    const nameBook = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${inputMessage}`
    );
    setMessage(nameBook.data.items);
    // console.log(nameBook.data.items);
  };

  useEffect(() => {
    googleSearch();
  }, [inputMessage]);
  return (
    <>
      <h1>Find a Book</h1>
      <label htmlFor="search"></label>
      <DebounceInput
        type="text"
        debounceTimeout={1000}
        onChange={(event) => {
          setInputmessage(event.target.value);
        }}
        value={inputMessage}
      />
      <ul>
        {message.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>;
        })}
      </ul>
    </>
  );
}
// 1
export default Search;
