import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    let data = await fetch(
      `https://v1.nocodeapi.com/suraj31/spotify/lsDUJbHzDTovCCMC/search?q=${keyword}}&type=track`
    );
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
  };

  return (
    <>
      <nav onLoad={getTracks} className="navbar navbar-dark bg-dark">
        <div className="container-fluid ">
          <img className="febicon" src="icons8-spotify-240.png" alt="" />
          <a className="navbar-brand">SPOTIFY lite</a>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="form-control me-2 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />

          <button onClick={getTracks} className="btn btn-outline-success">
            Search
          </button>
        </div>
      </nav>

      <div className="container"></div>
      <div className="row"></div>

      <div className="box">
        {tracks.map((track) => {
          return (
            <div key={track.id} className="col name cardContainer">
              <div className="card " style={{ width: "18rem" }}>
                <img
                  src={track.album.images[0].url}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{track.name}</h5>
                  Artists : {track.album.artists[0].name} <br />
                  Release Date : {track.album.release_date}
                  <audio
                    className="w-100"
                    src={track.preview_url}
                    controls
                  ></audio>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
