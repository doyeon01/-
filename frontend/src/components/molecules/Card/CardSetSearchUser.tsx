import React from 'react';

interface User {
  user: string;
  address: string;
  testimg: string;
  title: string; 
}

interface CardSetSearchUserProps {
  users: User[];
  onItemClick: (item: User) => void;
}

const CardSetSearchUser: React.FC<CardSetSearchUserProps> = ({ users,onItemClick }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {users.map((user, index) => (
        <div 
        key={index} 
        className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm w-1/2"
        onClick={() => onItemClick(user)}
        >
          <div className="flex items-center space-x-4">
            <img
              src={user.testimg}
              alt={user.user}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user.user}</p>
              <p className="text-sm text-gray-500">{user.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-500 text-sm">동행온도 <span className="font-semibold text-black">36.5</span></p>
            <button className="px-4 py-1 text-white text-sm rounded-full bg-[#707C60] hover:bg-[#4F5843]">
              팔로우
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSetSearchUser;
