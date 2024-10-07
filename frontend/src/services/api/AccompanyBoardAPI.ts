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


//동행 게시글 등록
export const createArticles = async (data: CreateArticleType): Promise<CreateArticleApiResponseType> => {
  try {
    const response = await axios.post<CreateArticleApiResponseType>(
      'http://localhost:8080/api/v1/accompanyboards/articles/create',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      response: { id: 0, userId: 0,scheduleId:0, title: '',description:''},
      error: error.message,
    };
  }
};  


// 게시글 목록 요청
export const fetchArticles = async () => {
  try {
    const response = await axios.get<ArticleApiResponseType>('http://localhost:8080/api/v1/accompanyboards/articles');
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

// 게시글 상세 요청
export const fetchArticleDetail = async (id: number) => {
  try {
    const response = await axios.get<ArticleDetailApiResponseType>(`http://localhost:8080/api/v1/accompanyboards/articles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

// 댓글 목록 요청
export const fetchArticleComment = async (accompanyBoardArticleId: number) => {
  try {
    const response = await axios.get<CommentApiResponseType>(`http://localhost:8080/api/v1/accompanyboards/comments/${accompanyBoardArticleId}`);
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

// 댓글 등록 요청
export const createComment = async (data: CreateCommentRequestType): Promise<CreateCommentResponseType> => {
  try {
    const response = await axios.post<CreateCommentResponseType>(
      'http://localhost:8080/api/v1/accompanyboards/comments/create',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
  return axios.get(`http://localhost:8080/api/v1/accompanyboards/articles/user/${userId}`, {
    params: {
      page: page,
      size: size,
    },
    headers: {
      // 'Authorization': `Bearer ${token}`,  // 인증이 필요하면 토큰 추가
    },
  });
};


