import { useEffect, useState } from "react";
import "./App.css";
// import PacmanLoader from 'react-spinner/PacmanLoader';
import ClipLoader from "react-spinners/ClipLoader";
import Article from "./Article.jsx";
import SearchForm from "./SearchForm";

function App() {
  const [search, setsearch] = useState("");

  const [page, setPage] = useState(0);

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [paginator, setPaginator] = useState(false);

  // useEffect(()=>{
  //   setLoading(true);
  //   fetch(`http://hn.algolia.com/api/v1/search`)
  //   .then(response => response.json())
  //   .then(data => {
  //     // console.log(data.hits);
  //     setArticles(data.hits);
  //     setLoading(false);
  //   })
  //   .catch(error => console.error(error));
  // },[]);

  useEffect(() => {
    console.log("SEARCH OR PAGE STATE HAS BEEN SET");
    console.log(
      `fetching: http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`
    );
    setPaginator(false);
    setLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.hits);
        setArticles(data.hits);
        setLoading(false);
        //console.log(' ------------------- start article entries ------------------------ ')
        //for (const [key, value] of Object.entries(data.hits[10])) {
        //  console.log(`${key}: ${value}`);
        //}
        //console.log(' ------------------- end article entries ------------------------ ')
        if (!data.hits[19]) {
          setPaginator(false);
        } else {
          setPaginator(true);
        }
      })
      .catch((error) => {
        console.error(error);
        // alert(
        //   `something went wrong fetching http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`
        // );
        setPaginator(false);
      });
  }, [search, page]);

  function turnLeft() {
    setPage(page - 1);
  }

  function turnRight() {
    setPage(page + 1);
  }

  return (
    <>
      <header>
        <a href="/">
          <img src="./src/assets/images.jpeg" />{" "}
        </a>
      </header>
      <main>
        {paginator ? (
          <div id="pagination">
            <button className="arrows" disabled={page === 0} onClick={turnLeft}>
              &larr;
            </button>
            <button className="arrows" onClick={turnRight}>
              &rarr;
            </button>
          </div>
        ) : (
          ""
        )}

        {loading ? (
          <ClipLoader />
        ) : !articles.length ? (
          <div>
            <img className="oops" src="./src/assets/oops.jpg" />
            <p>
              <b>no matching articles</b>
            </p>
          </div>
        ) : (
          articles.map((article, index) => (
            <Article article={article} index={index + page * 20} />
          ))
        )}
      </main>
      <footer>
        <hr></hr>
        <SearchForm setsearch={setsearch} />
      </footer>
    </>
  );
}

export default App;
