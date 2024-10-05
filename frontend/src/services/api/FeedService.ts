import axios from 'axios';

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/feeds';
const userId: number = 1; // userId에 숫자 타입 지정
	
// 피드 생성 API
export const FeedCreate = async (formData: FormData) => {
  const response = await axios.post(`${BaseUrl}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': `Bearer ${token}`, // 토큰이 필요하면 추가
    },
  });

  console.log('피드 생성 완료:', response.data);  
};

// 마이페이지 피드 목록 조회 API
export const FeedList = (page = 0, size = 10) => {
  return axios.get(`${BaseUrl}/created`, {
    params: {
      userId: userId, 
      page: page,
      size: size,
    },
    headers: {
      // 'Authorization': `Bearer ${token}`,  // 인증이 필요하면 토큰 추가
    },
  });
};

// 좋아요한 피드 목록 조회 API
export const LikeFeedList = (page = 0, size = 10) => {
  return axios.get(`${BaseUrl}/liked`, {
    params: {
      userId: userId, 
      page: page,
      size: size,
    },
    headers: {
      // 'Authorization': `Bearer ${token}`,  // 인증이 필요하면 토큰 추가
    },
  });
};

// 맞춤 피드 추천 API
export const postFeedRecommend = (page = 1, size = 10) => {
  return axios.post(`${BaseUrl}/user/recommended`, {
    userId: userId,
    page: page,
    size: size,
  }, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,  // 인증이 필요하면 토큰 추가
      'Cookie': 'accessToken=token', // 쿠키 헤더 추가
    },
  });
};


//맞춤피드 상세조회 API
export const getFeedDetail = (id: number) => {
  return axios.get(`${BaseUrl}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },   
    withCredentials: true, 
  });
};

//피드 댓글 API
  export const getFeedComment = (id: number) => {
    return axios.get(`${BaseUrl}/${id}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,  // 인증이 필요하면 토큰 추가
        'Cookie': 'accessToken=token', // 쿠키 헤더 추가
      },
    });
  };

  //댓글 등록 API
  export const postComment = async (feedId: number, content: string) => {
    try {
      const response = await axios.post(`${BaseUrl}/${feedId}/comments`, {
        userId,
        content,
      }, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // 인증이 필요하면 토큰 추가
          'Cookie': 'accessToken=token', // 쿠키 헤더 추가
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      throw error;
    }
  };

  //좋아요 API
  export const postLike = async (feedId: number): Promise<void> => {
    try {
      await axios.post(`${BaseUrl}/like/${feedId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${token}`, // 인증이 필요하면 토큰 추가
          'Cookie': 'accessToken=token', // 쿠키 헤더 추가
        },
      });
      console.log(`피드 ${feedId}에 좋아요가 등록되었습니다.`);
    } catch (error) {
      console.error('좋아요 등록 실패:', error);
      throw error;
    }
  };

  //좋아요 취소 api
  export const postUnlike = async (feedId: number): Promise<void> => {
    try {
      await axios.post(`${BaseUrl}/unlike/${feedId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${token}`, // 인증이 필요하면 토큰 추가
          'Cookie': 'accessToken=token', // 쿠키 헤더 추가

        },
      });
      console.log(`피드 ${feedId}에 좋아요가 취소되었습니다.`);
    } catch (error) {
      console.error('좋아요 취소 실패:', error);
      throw error;
    }
  };