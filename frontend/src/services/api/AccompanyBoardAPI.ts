import axios from 'axios';
import {
  ArticleApiResponseType,
  ArticleDetailApiResponseType,
  CommentApiResponseType,
  CreateCommentRequestType,
  CreateCommentResponseType,
  CreateArticleType,
  CreateArticleApiResponseType,
} from '../../model/AccompanyBoardType';

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/accompanyboards';

// 동행 게시글 등록
export const createArticles = async (data: CreateArticleType): Promise<CreateArticleApiResponseType> => {
  try {
    const response = await axios.post<CreateArticleApiResponseType>(
      `${BaseUrl}/articles/create`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,  
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      response: { id: 0, userId: 0, scheduleId: 0, title: '', description: '' },
      error: error.message,
    };
  }
};

// 게시글 목록 요청
export const fetchArticles = async (page:number) => {
  try {
    const response = await axios.get<ArticleApiResponseType>(`${BaseUrl}/articles?page=${page}`, {
      withCredentials: true,  
    });
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

// 게시글 상세 요청
export const fetchArticleDetail = async (id: number) => {
  try {
    const response = await axios.get<ArticleDetailApiResponseType>(`${BaseUrl}/articles/${id}`, {
      withCredentials: true,  
    });
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

// 댓글 목록 요청
export const fetchArticleComment = async (accompanyBoardArticleId: number) => {
  try {
    const response = await axios.get<CommentApiResponseType>(`${BaseUrl}/comments/${accompanyBoardArticleId}`, {
      withCredentials: true,  
    });
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

// 댓글 등록 요청
export const createComment = async (data: CreateCommentRequestType): Promise<CreateCommentResponseType> => {
  try {
    const response = await axios.post<CreateCommentResponseType>(
      `${BaseUrl}/comments/create`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true, 
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      response: { id: 0, userId: 0, accompanyBoardArticleId: 0, content: '' },
      error: error.message,
    };
  }
};

// 특정 사용자의 전체 동행 게시글 조회
export const articleList = (userId: number, page: number, size = 6) => {
  return axios.get(`${BaseUrl}/articles/user/${userId}`, {
    params: {
      page: page,
      size: size,
    },
    withCredentials: true,  
  });
};
