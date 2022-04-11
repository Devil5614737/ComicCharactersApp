import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { Context } from "../context/Context";

function MyApp({ Component, pageProps }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      let time = 1;
      let api_key = "40c7ae95cd05146a49ca12d5450dfde5";

      let hash2 = "f1338ace3bfdf9514e1aa592805d4813";
      let url2 = `http://gateway.marvel.com/v1/public/characters?name=${query}&orderBy=name&ts=${time}&apikey=${api_key}&hash=${hash2}`;

      if (query === null) {
        return;
      } else {
        const res = await fetch(url2, {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        });
        const data = await res.json();
        setSearchResults(data.data.results);
      }
    };
    // fetchResults();
  }, [query]);



  return (
    <Context.Provider
      value={{
        query,
        setQuery,
        searchResults,
      }}
    >
      <Navbar />
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
