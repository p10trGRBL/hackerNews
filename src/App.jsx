import { useEffect, useState } from 'react'
import './App.css';
// import PacmanLoader from 'react-spinner/PacmanLoader';
import ClipLoader from "react-spinners/ClipLoader";
import Article from './Article.jsx'
import SearchForm from './SearchForm'

function App() {
  const [search, setsearch] = useState("");

  const [page, setPage] = useState(0);

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

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


  useEffect(()=> {
    console.log("SEARCH OR PAGE STATE HAS BEEN SET");
    console.log(`fetching: http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`);
    setLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data.hits);
      setArticles(data.hits);
      setLoading(false);
      console.log(' ------------------- start article entries ------------------------ ')
      for (const [key, value] of Object.entries(data.hits[0])) {
        console.log(`${key}: ${value}`);
      }
      console.log(' ------------------- end article entries ------------------------ ')
    })
    .catch(error => {
      console.error(error);
      alert(`something went wrong fetching http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`);
    });
  },[search, page]);

  function turnLeft() {
    setPage(page-1);
  }

  function turnRight() {
    setPage(page+1); 
  }


  return (
    <>
      <header></header>
      <main>
        <div className='pagination'>
          <button disabled={page===0} onClick={turnLeft}>&larr;</button>
          <button onClick={turnRight}>&rarr;</button>
        </div>
      {loading
        ? 
        <ClipLoader/>
        : 
        !articles.length 
        ?
        "no matching articles"
        :
        articles.map((article, index) => (
            <Article article={article} index={index+page*20} />
          ))
        }
      </main>
      <footer>
        <SearchForm setsearch={setsearch}/>
      </footer>
    </>
  )
}

export default App
