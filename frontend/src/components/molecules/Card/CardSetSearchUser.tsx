import React, { useEffect, useState } from 'react';
import { UserDataType } from '../../../model/User';
import { getUserSearch } from '../../../services/api/UserService';
import { UserIconMini } from '../../../assets/icons/svg';
import useFollow from '../../../hooks/useFollow';

interface CardSetSearchUserProps {
  keyword: string;
}

const CardSetSearchUser: React.FC<CardSetSearchUserProps> = ({ keyword }) => {
  const [users, setUsers] = useState<UserDataType[] | null>(null);
  const { isFollowed, toggleFollow, loading, setIsFollowed } = useFollow(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserSearch(keyword);
        setUsers(response.response);
        const initialFollowState: { [key: number]: boolean } = {};
        response.response.forEach((user: UserDataType) => {
          initialFollowState[user.id] = user.isFollowed;
        });
        setIsFollowed(initialFollowState);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, [keyword]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {users && users.length > 0 ? (
        users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm w-1/2"
          >
            <div className="flex items-center space-x-4">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.nickname}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <UserIconMini />
              )}
              <div>
                <p className="font-semibold">{user.nickname}</p>
                <p className="text-sm text-gray-500">{user.residence}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-sm">
                동행온도 <span className="font-semibold text-black">36.5</span>
              </p>
              <button
                onClick={() => toggleFollow(user.id, isFollowed[user.id])}
                className="px-4 py-1 text-white text-sm rounded-full bg-[#707C60] hover:bg-[#4F5843]"
                disabled={loading[user.id]}
              >
                {loading[user.id]
                  ? '로딩 중'
                  : isFollowed[user.id]
                  ? '언팔로우'
                  : '팔로우'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>검색된 사람이 없습니다.</p>
      )}
    </div>
  );
};

export default CardSetSearchUser;
