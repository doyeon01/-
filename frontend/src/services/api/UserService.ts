import axios from "axios";

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/users';

export const UserInfo = () => {
  return axios.get(`${BaseUrl}/myInfo`, {
    withCredentials: true, 
  });
}