import { useState } from 'react';
import axios from 'axios';

const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);

  const toggleFollow = async (userId: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = isFollowed
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
        setIsFollowed(!isFollowed);  
      }
    } catch (err) {
      setError('Error in follow/unfollow action');
    } finally {
      setLoading(false);
    }
  };

  return { isFollowed, toggleFollow, loading, error };
};

export default useFollow;
