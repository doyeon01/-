import axios from 'axios';


const BaseUrl = 'https://j11c205.p.ssafy.io:8080/api/v1/feeds';

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
export const FeedList = (userId: number, page = 0, size = 10) => {
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


export const LikeFeedList = (userId: number,page = 0, size = 10) => {
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
