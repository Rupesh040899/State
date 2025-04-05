import React, { useState, useEffect } from "react";
import "./CitySelector.css"

export default function CitySelector() {
  const [countries, setCountries] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const remoteData = await response.json();
        setCountries(remoteData);
      } catch (error) {
        console.log("Error fetching countries: " + error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStateData = async () => {
        try {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          const stateData = await response.json();
          setStateData(stateData);
          setCities([]);
          setSelectedStates("");
          setSelectedCity("");
        } catch (error) {
          console.log("Error fetching states: " + error);
        }
      };
      fetchStateData();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedStates) {
      const fetchCitiesData = async () => {
        try {
          const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedStates}/cities`
          );
          const remoteData = await response.json();
          setCities(remoteData);
        } catch (error) {
          console.log("Error fetching cities: " + error);
        }
      };
      fetchCitiesData();
    }
  }, [selectedCountry, selectedStates]);

  return (
    <div>
      <h1>Select Location</h1>
      <div id="main">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedStates}
          onChange={(e) => setSelectedStates(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {stateData.map((eachState) => (
            <option value={eachState} key={eachState}>
              {eachState}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedStates}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((eachCity) => (
            <option value={eachCity} key={eachCity}>
              {eachCity}
            </option>
          ))}
        </select>
      </div>
      {selectedCity ? (
        <div>
          You have selected{" "} 
          <strong>
            {selectedCity}, {selectedStates}, {selectedCountry}
          </strong>
          .
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
