import React from "react";
import axios from "axios";
import { useState } from "react";
import { API } from "./api/api";
import "./app.css";

function App() {
  const [backEndData, setBackEndData] = useState({});
  const [location, setLocation] = useState("");
  const [notFound, setNotFound] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    setNotFound("");
    setBackEndData(null);
    try {
      const res = await API.get(`/weather/${location}`);
      setBackEndData(res.data);
    } catch (err) {
      console.log(err);
      setNotFound(`City Not Found, entered: ${location}`);
      setBackEndData({});
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
      {<div className="loading">{notFound}</div>}
    </div>
  );
}

export default App;
