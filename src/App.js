import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url,setUrl] = useState('https://swapi.py4e.com/api/films/');

  const toggleUrl = () => {
    if(url === 'https://swapi.py4e.com/api/films/'){
      setUrl('https://swapi.py4e.com/api/film/');
    }
    else{
      setUrl('https://swapi.py4e.com/api/films/');
    }
  }

  const fetchRequestHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try{
      const fetchData = await fetch(url);
      if(!fetchData.ok){
        throw new Error("Something went wrong!");
      }
      const jsonData = await fetchData.json();
      const newdata = jsonData.results.map(value => {
            return {
              id: value.episode_id,
              title: value.title,
              releaseDate: value.release_date,
              openingText: value.opening_crawl
            }
          });
      setMovies(newdata);
    }
    catch(error){
      setError(error.message);
    }
    setLoading(false);
  },[url]);

  useEffect(()=>{
    fetchRequestHandler();
  },[fetchRequestHandler]);

  // Shortcut to write function

  // const fetchRequestHandler = () => {
  //   fetch('https://swapi.py4e.com/api/films/').then(response => response.json()).then(data => {
  //     const newdata = data.results.map(value => {
  //       return {
  //         id: value.episode_id,
  //         title: value.title,
  //         releaseDate: value.release_date,
  //         openingText: value.opening_crawl
  //       }
  //     })
  //     setMovies(newdata);
  //   })
  // }

  let content = <p>Let's fetch some movies</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }
  if(error){
    content = <p>{error}</p>;
  }
  if(isLoading){
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchRequestHandler}>Fetch Movies</button>
        <button onClick={toggleUrl}>Toggle Error State</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
