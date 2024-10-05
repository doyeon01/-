import axios from 'axios';


const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/feeds';

// 피드 생성 API
export const FeedCreate = async (formData: FormData) => {
  const response = await axios.post(`${BaseUrl}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log('피드 생성 완료:', response.data);  
};

// 마이페이지 피드 목록 조회 API
export const FeedList = (userId: number, page: number, size = 6) => {
  return axios.get(`${BaseUrl}/created`, {
    params: {
      userId: userId, 
      page: page,
      size: size,
    },
  });
};

// 마이페이지 좋아요 목록 조회 API
export const LikeFeedList = (userId: number, page: number, size = 6) => {
  return axios.get(`${BaseUrl}/liked`, {
    params: {
      userId: userId, 
      page: page,
      size: size,
    },
  });
};
