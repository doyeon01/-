import axios from "axios";

// 마이페이지 여행계획 리스트 
export const PlanListApi = () => {
  return axios.get('https://j11c205.p.ssafy.io/api/v1/plans/total')

}