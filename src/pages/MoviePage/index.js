import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

import SearchIcon from "../../assets/search.svg";
import "./MoviePage.css";

const APIKey = "396096eb";

const APIURL = `http://www.omdbapi.com?apikey=${APIKey}`;

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${APIURL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);
  return (
    <div className="app">
      <h1 className="title">KenMovies</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchValue);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
