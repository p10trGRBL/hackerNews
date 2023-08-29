import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
// import PacmanLoader from 'react-spinner/PacmanLoader';
import ClipLoader from "react-spinners/ClipLoader";
import Article from './Article.jsx'
import SearchForm from './SearchForm'

function App() {
  const [count, setCount] = useState(0)

  const [search, setsearch] = useState("");

  const [page, setPage] = useState(0);

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=react&page=${page}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data.hits);
      setArticles(data.hits);
      setLoading(false);
    })
    .catch(error => console.error(error));
  },[]);



  return (
    <>
      <header></header>
      <main>
      {loading
        ? 
        <ClipLoader/>
        : 
        articles.map((article) => (
            <Article article={article} />
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
