import axios from "axios";

const BaseUrl = 'https://j11c205.p.ssafy.io/api/v1/plans';
const totalPlanId = 4;

// 마이페이지 여행계획 리스트 
export const PlanListApi = () => {
  return axios.get(`${BaseUrl}/total`, {
    withCredentials: true, 
  });
};

export const PlanDetailApi = () => {
  return axios.get(`${BaseUrl}/${totalPlanId}/all`, {
    withCredentials: true, 
  });
};
