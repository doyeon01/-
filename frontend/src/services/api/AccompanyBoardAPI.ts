import axios from 'axios';
import {ArticleApiResponse, ArticleDetailApiResponse} from '../../model/AccompanyBoardType'


export const fetchArticles = async () => {
  try {
    const response = await axios.get<ArticleApiResponse>('http://localhost:8080/api/v1/accompanyboards/articles');
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};

export const fetchArticleDetail = async (id:number) => {
  try {
    const response = await axios.get<ArticleDetailApiResponse>(`http://localhost:8080/api/v1/accompanyboards/articles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('API 요청 중 오류가 발생했습니다.');
  }
};