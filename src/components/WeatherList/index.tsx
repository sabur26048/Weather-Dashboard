import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

const WeatherList: React.FC = () => {
    const [search,setSearch]=useState('')
    const [error,setError]=useState('')
    const [FavCity,setFavCity]=useState<Weather[]>([
  { id: 1, city: 'New York', temperature: 18, description: 'Sunny' },
  { id: 2, city: 'London', temperature: 12, description: 'Cloudy' },])

    const [unit,setUnit]=useState<string>("Celsius")

    const [allData,setallData]=useState<Weather[]>(weatherData)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setSearch(event.target.value)
    if(event.target.value!='' && event.target.value.length<2){setError("error")}
    else if(event.target.value && event.target.value!=='' && event.target.value.length>1)
      {
        const searchdata=weatherData.filter((newCity)=>{
          let str=newCity.city;
          let searchStr=search;
       return  str.toUpperCase().includes(searchStr.toUpperCase())
        })
    setallData(searchdata);
    setError("")
    }
    else  {  
      setError("")
      setallData(weatherData)}
  };

  const handleClearSearch = () => {
      setSearch("")
      setallData(weatherData)
   };

  const handleUnitChange = () => {
    if(unit==="Celsius"){
      setUnit("Farenhite")
    }
    else {setUnit("Celsius")

    }
   };

  const handleAddFavorite = (cityId: number) => {
    if(FavCity.filter(city => city.id === cityId).length===0)
   { const fav = weatherData.filter(city => city.id === cityId);
    setFavCity([...FavCity,...fav])
   }
   };

  const handleRemoveFavorite = (cityId: number) => { 
    const remove=FavCity.filter(city=> city.id!==cityId)
    setFavCity(remove)
  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
       { error!==''?<p className='error'>Serach value greater then 2 charecter</p>:""}
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
            value={search}
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              {unit==="Celsius"?(<th>Temperature(&deg;C)</th>):
              (<th>Temperature(&deg;F)</th>)}
              <th>Description</th>
              <th>Add to favorites</th>
            </tr>
          </thead>
          <tbody>
            {
              allData.map((val,index)=><WeatherCard
              key={index}
              weather={val}
              unit={unit==="Celsius"?"C":"F"}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={false}
            />)
            }
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {unit==="Celsius"?"Farenhite":"Celsius"}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              {unit==="Celsius"?(<th>Temperature(&deg;C)</th>):
              (<th>Temperature(&deg;F)</th>)}
              <th>Description</th>
              <th>Remove from favorites</th>
            </tr>
          </thead>
          <tbody>
            {
              FavCity.map((val,index)=><WeatherCard
              key={index}
              weather={val}
              unit={unit==="Celsius"?"C":"F"}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={true}
            />)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
