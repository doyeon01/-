import React from 'react';

interface Place {
  title: string;
  address: string;
  testimg: string;
  user: string;
}

interface CardSetSearchPlaceProps {
  places: Place[];
  onItemClick: (item: Place) => void;
}

const CardSetSearchPlace: React.FC<CardSetSearchPlaceProps> = ({ places,onItemClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {places.map((place, index) => (
        <div 
        key={index} 
        className="relative group"
        onClick={() => onItemClick(place)}
        >
          <img
            src={place.testimg}
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
            <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100">
              <p className="text-lg font-bold">{place.user}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
              <p className="text-2xl">❤️</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSetSearchPlace;
