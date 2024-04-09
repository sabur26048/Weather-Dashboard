import React from 'react';
import { Weather} from '../../data/weatherData';

interface WeatherCardProps {
  weather: Weather;
  unit: 'C' | 'F';
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {

  const handleFavoriteClick = (value :any) => {
    onAddFavorite(value)
  };
 const celsiusToFahrenheit=(celsius:number)=> {
    return (celsius * 9/5) + 32;
  }

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      {unit==='C'?<td>{weather.temperature}</td>:
        <td>{celsiusToFahrenheit(weather.temperature)}</td>
      }
      <td>{weather.description}</td>
      {!isFavorite?(<td>
        <button onClick={()=>{handleFavoriteClick(weather.id)}} data-testid={`weather-card-action-${weather.id}`}>
          Add to favorites
        </button>
      </td>):""}
      {isFavorite?(<td>
        <button onClick={()=>{onRemoveFavorite(weather.id)}} data-testid={`weather-card-action-${weather.id}`}>
          Remove from favorites
        </button>
      </td>):""}
    </tr>
  );
};

export default WeatherCard;

