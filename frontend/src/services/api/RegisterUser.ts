import axios from 'axios';
import { RegisterUserType } from '../../model/RegisterUserType';
import { FilterFeedType } from '../../model/SearchingFeedType';

export const RegisterUser = async (id:number)=>{
    try {
        const response = await axios.post<RegisterUserType>(`https://j11c205.p.ssafy.io/api/v1/user/${id}/survey`);
        return response.data;
      } catch (error) {
        throw new Error('API 요청 중 오류가 발생했습니다.');
      }
}
//RegisterUser.ts
export const GetFeed = async(keyword: string, page: number, size: number): Promise<FilterFeedType> => {
  try {
    const response = await axios.get<FilterFeedType>(`https://j11c205.p.ssafy.io/api/v1/feeds/search?keyword=${keyword}&page=${page}&size=${size}`);
    // const reponseFeed = response.data.respons
    return response.data;
  } catch (error) {
    throw new Error('API error');
  }
}