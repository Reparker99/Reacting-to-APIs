import React, { useState, useEffect } from "react";

const App = () => {
  const [filmLoaded, setFilmLoaded] = useState(false);
  const [peopleLoaded, setPeopleLoaded] = useState(false);
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => res.json())
      .then((allFilms) => setFilms(allFilms));
  }, []);
  
  useEffect(() => {
    fetch("https://ghibliapi.herokuapp.com/people")
      .then((res) => res.json())
      .then((allPeople) => setPeople(allPeople));
  }, []);

  const handleFilmClick = () => {
    setFilmLoaded(true);
    setPeopleLoaded(false);
  };

  const handleCharacterClick = () => {
    setPeopleLoaded(true);
    setFilmLoaded(false);
  }

  if (filmLoaded === true) {
    return (
      
      <main className="container">
        <section className="row justify-content-center mt-5">
          <button onClick={handleCharacterClick}>Load Characters</button>
          </section>
        <section className="row justify-content-center mt-3">
          <h1 className="text-danger">Films Created by Studio Ghibli:</h1>
          {films.map((film) => (
            <div className="col-md-6" key={`film-card-${film.id}`}>
              <div className="card shadow my-2">
                <img className="card-img-top" src={film.image} />
                <div className="card-body">
                  <h4 className="card-title">{film.title}</h4>
                  <p className="card-subtitle text-muted">
                    {film.original_title} / {film.original_title_romanised}
                  </p>
                  <p className="card-subtitle text-muted my-1">Directed by: {film.director}</p>
                  <p className="card-subtitle text-muted my-1"> Produced by: {film.producer}</p>
                  <p className="card-subtitle text-muted my-1">Year of Release: {film.release_date}</p>
                  <p className="card-subtitle text-muted my-1">Running Time: {film.running_time} Minutes</p>
                  <p className="card-text">{film.description}</p>
                  <a href={film.url} target="_blank">API Resource Link</a>
                </div>
              </div>
            </div>
          ))}
        </section>
        </main>
    )} else if (peopleLoaded === true) {
      return (
        <main className="container">
          <section className="row justify-content-center mt-5">
          <button onClick={handleFilmClick}>Load Films</button>
          </section>
          <section className="row justify-content-center mt-5">
            <h1 className="text-danger">List of Characters in Studio Ghibli Films:</h1>
            {people.map((character) => (
              <div className="col-md-6" key={`character-card-${character.id}`}>
                <div className="card shadow my-2">
                <div className="card-body">
                <h4 className="card-title">{character.name}</h4>
                <p className="card-subtitle text-muted my-1">Gender: {character.gender}</p>
                <p className="card-subtitle text-muted my-1">Age: {character.age}</p>
                <p className="card-subtitle text-muted my-1">Eye Color: {character.eye_color}</p>
                <p className="card-subtitle text-muted my-1">Hair Color: {character.hair_color}</p>
                <a href={character.url} target="_blank">API Resource Link</a>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      )
    } else {
      return (
      <main className="container">
        <section className="row justify-content-center mt-5">
      <button onClick={handleFilmClick}>Load Films</button>
      <button onClick={handleCharacterClick}>Load Characters</button>
          </section>
      </main>
  );
      }
};

export default App;
