import React, { useCallback, useEffect, useState } from "react";
import { MovieCard } from "../../components";

import SearchIcon from "../../assets/search.svg";

import "./MoviePage.css";

const APIURL = process.env.REACT_APP_MOVIE_API;

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchMovies = useCallback(async (title) => {
    let initialSearch = "Spiderman";
    const search = title || initialSearch;

    const response = await fetch(`${APIURL}&s=${search}`);
    const data = await response.json();
    setMovies(data.Search);
  }, []);

  useEffect(() => {
    searchMovies();
  }, [searchMovies]);

  const handleRenderMovies = () => {
    if (!movies) {
      return (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      );
    }
    return (
      <div className="container">
        {movies?.map((movie, index) => (
          <MovieCard key={index + 1} movie={movie} />
        ))}
      </div>
    );
  };

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

      {handleRenderMovies()}
    </div>
  );
};

export default MoviePage;
