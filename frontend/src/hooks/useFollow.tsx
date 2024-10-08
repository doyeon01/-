import { useState } from 'react';
import axios from 'axios';

const useFollow = () => {  
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [isFollowed, setIsFollowed] = useState<{ [key: number]: boolean }>({}); 

  const toggleFollow = async (userId: number, currentStatus: boolean) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    setError(null);

    try {
      const url = currentStatus
        ? `https://j11c205.p.ssafy.io/api/v1/users/unfollow/${userId}`
        : `https://j11c205.p.ssafy.io/api/v1/users/follow/${userId}`;

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsFollowed((prev) => ({
          ...prev,
          [userId]: !currentStatus,  
        }));
      }
    } catch (err) {
      setError('Error in follow/unfollow action');
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return { isFollowed, toggleFollow, loading, error, setIsFollowed };
};

export default useFollow;
