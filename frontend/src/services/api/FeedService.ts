import axios from 'axios';
import { FeedCommentsAPiResponseType, FeedDetailAPiResponseType } from '../../model/FeedType';
// import { UserId } from '../../Recoil/atoms/Auth';
// import { useRecoilValue } from 'recoil';

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/feeds';
// const userId = useRecoilValue(UserId);
const userId = 2896

// 피드 생성 API
export const FeedCreate = async (data: FormData) => {
  const response = await axios.post(`${BaseUrl}/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, 
  });

  console.log('피드 생성 완료:', response.data);  
};

// 마이페이지 피드 목록 조회 API
export const FeedList = (userId: number, page: number, size = 6) => {
  return axios.get(`${BaseUrl}/users/created`, {
    params: {
      userId: userId,
      page: page,
      size: size,
      sort: "createdDate,desc"
    },
    withCredentials: true, 
  });
};

// 좋아요한 피드 목록 조회 API
export const LikeFeedList = (userId: number, page: number, size = 100) => {
  return axios.get(`${BaseUrl}/liked`, {
    params: {
      userId: userId, 
      page: page,
      size: size,
    },
    withCredentials: true, 
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
    },
    withCredentials: true, 
  });
};


//맞춤피드 상세조회 API
export const getFeedDetail = (id: number):Promise<FeedDetailAPiResponseType> => {
  return axios.get(`${BaseUrl}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },   
    withCredentials: true, 
  });
};

//피드 댓글 API
  export const getFeedComment = (id: number):Promise<FeedCommentsAPiResponseType> => {
    return axios.get(`${BaseUrl}/${id}/comments`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
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
        },
        withCredentials: true, 
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
      await axios.post(`${BaseUrl}/like/${feedId}?userId=${userId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true, 
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
      await axios.post(`${BaseUrl}/unlike/${feedId}?userId=${userId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true, 
      });
      console.log(`피드 ${feedId}에 좋아요가 취소되었습니다.`);
    } catch (error) {
      console.error('좋아요 취소 실패:', error);
      throw error;
    }
  };
