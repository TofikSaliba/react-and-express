import React from "react";
import axios from "axios";
import { useState } from "react";
import "./app.css";

function App() {
  const [backEndData, setBackEndData] = useState({});
  const [location, setLocation] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    setBackEndData(null);
    try {
      const { data } = await axios.get(`/api/weather/${location}`);
      setBackEndData(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLocation("");
    }
  };

  const getWeatherJSX = () => {
    if (!backEndData.city) return;
    return (
      <>
        <div>{`${backEndData.city}, ${backEndData.country}`}</div>
        <div>{`${backEndData.description}, ${backEndData.temp}`}</div>
      </>
    );
  };

  return (
    <div className="mainContainer">
      <form onSubmit={getWeather}>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <button type="submit">get weather</button>
      </form>
      {backEndData && <div className="weatherData">{getWeatherJSX()}</div>}
      {!backEndData && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;
