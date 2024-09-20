import React from 'react';

interface PhotoCardProps {
  title: string;
  address?: string; // address는 선택적 값
  testimg: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ title, address, testimg }) => {
  return (
    <div className="relative overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg">
      <img
        src={testimg}
        alt={title}
        className="w-full h-72 object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        {address && <p className="text-sm">{address}</p>} 
      </div>
    </div>
  );
};
