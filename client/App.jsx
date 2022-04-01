import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";


const App = () => {
  const [username, setUsername] = useState("");
  const [content, setMessage] = useState("");
  const [chirps, setChirps] = useState([]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleChirpSubmit = (e) => {
    e.preventDefault();

    const newChirp = {
      id: uuidv4(),
      username: username,
      message: message,
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    };

    setChirps([...chirps, newChirp]);
  };

  const getChirps = () => {
    fetch('http://localhost:3000/api/chirps/')
      .then(res => res.json())
      .then(res => setChirps(res))
  }

  useEffect(() => {
    getChirps();
  }, []);

  const handleDeleteChirp = (id) => {
    fetch(`http://localhost:3000/api/chirps/${id}`, {
      method: 'DELETE'
    });
    getChirps();
  }

  

  return (
    <>
      <div className="container text-body text-center">
        <div className="row">
          <div className="col-12 p-0">
            <nav>
              <img
                className="banner"
                src="./assets/banner.jpg"
                alt="logo for awesome site yay"
              />
              <h1>Ghibli Chirpr</h1>
            </nav>
          </div>
        </div>
        <div className="row">
          <form action="">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <textarea
                className="form-control mb-2"
                aria-label="With textarea"
                placeholder="(500 characters max)"
                value={message}
                onChange={handleMessageChange}
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn btn-dark" onClick={handleChirpSubmit}>
                Chirp It!
              </button>
            </div>
          </form>
          <div className=" chirps mb-4">
            {chirps.map((chirp) => (
              <ChirpCard
                key={chirp.id}
                id={chirp.id}
                username={chirp.username}
                content={chirp.content}
                location={chirp.location}
                handleDeleteChirp={handleDeleteChirp}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
