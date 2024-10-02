import axios from 'axios';
import { RegisterUserType } from '../../model/RegisterUserType';

export const RegisterUser = async (id:number)=>{
    try {
        const response = await axios.post<RegisterUserType>(`http://localhost:8080//api/v1/user/${id}/survey`);
        return response.data;
      } catch (error) {
        throw new Error('API 요청 중 오류가 발생했습니다.');
      }
}