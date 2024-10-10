import axios from "axios";
import {UserSearchResponseType} from '../../model/User'
const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/users';

// 내 정보 조회 api 
export const UserInfo = () => {
  return axios.get(`${BaseUrl}/myInfo`, {
    withCredentials: true, 
  });
}

// 너 정보 조회 api
export const getYourInfo = async (targetId: number) => {
  try {
    const response = await axios.get(`${BaseUrl}/follow-status/${targetId}`,{
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    throw new Error(`유저 못찾앗음: ${error}`);
  }
};


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

export const getFollowingList = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/following-users`,{
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    throw new Error(`유저 못찾앗음: ${error}`);
  }
};
