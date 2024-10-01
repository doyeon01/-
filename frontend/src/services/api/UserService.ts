import axios from "axios";

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/user';

export const UserInfo = () => {
  return axios.get(`${BaseUrl}/myInfo`, {
    // headers: {
    //   // 'Authorization': `Bearer ${token}`,  // 인증이 필요하면 토큰 추가
    // },
  });
}