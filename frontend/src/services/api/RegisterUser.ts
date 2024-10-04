import axios from 'axios';
import { RegisterUserType } from '../../model/RegisterUserType';

export const RegisterUser = async (id:number)=>{
    try {
        const response = await axios.post<RegisterUserType>(`http://j11c205.p.ssafy.io/api/v1/user/${id}/survey`);
        return response.data;
      } catch (error) {
        throw new Error('API 요청 중 오류가 발생했습니다.');
      }
}
//RegisterUser.ts
export const GetFeedFood = async(keyword:String,page:number,size:number)=>{
  try{
    const response = await axios.get(`http://j11c205.p.ssafy.io/api/v1/feeds/search?keyword=${keyword}&page=${page}&size=${size}`)
    return response.data
  } catch(error){
    throw new Error('API error')
  }
}