import axios from "axios";
import {UserSearchResponseType} from '../../model/User'
const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/users';

export const UserInfo = () => {
  return axios.get(`${BaseUrl}/myInfo`, {
    withCredentials: true, 
  });
}

export const getUserSearch = async ( keyword:string,date?: string): Promise<UserSearchResponseType> => {
  try {
    const response = await axios.get<UserSearchResponseType>(`${BaseUrl}/search`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        keyword,
        date, 
      },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    throw new Error(`유저 못찾앗음: ${error}`);
  }
};