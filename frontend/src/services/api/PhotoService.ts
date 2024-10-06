import axios from "axios";

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/photocards';

// 마이페이지 포토카드 전체 목록 조회 API
export const GetPhotoCardList = async (userId: number, page: number, size = 6) => {
  try {
    const response = await axios.get(`${BaseUrl}/search/${userId}`, {
      params: { 
        page: page,
        size: size,
      },
      withCredentials: true, 
    });
    return response.data; 
  } catch (error) {
    console.error('포토카드 목록 조회 중 오류 발생:', error);
    throw error; 
  }
};

// 마이페이지 특정 포토카드 조회 API
export const GetPhotoCardDetail = async (feedId: number) => {
  try {
    const response = await axios.get(`${BaseUrl}/detail/${feedId}`, {
      withCredentials: true, 
    });
    return response.data; 
  } catch (error) {
    console.error('포토카드 상세 조회 중 오류 발생:', error);
    throw error;
  }
};

// 마이페이지 포토카드 생성 API
export const PostPhotoCard = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/create`, data, {
      withCredentials: true, 
    });
    return response.data; 
  } catch (error) {
    console.error('포토카드 생성 중 오류 발생:', error);
    throw error;
  }
};
