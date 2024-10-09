import axios from "axios";
import {TravelPlan} from '../../model/RegisterPlanType'

export const getFeedCluster = async (id:number)=>{
    try{
        const response = await axios.get(`https://j11c205.p.ssafy.io/api/v1/feeds/like/clustering?userId=${id}`,{
            withCredentials:true,
        })
        
        return response.data
    }
    catch(error){ 
        throw new Error('API 요청 중 오류가 발생했습니다.')
    }
}

export const getFeedClusterRefresh = async (id:number)=>{
    try{
        const response = await axios.get(`https://j11c205.p.ssafy.io/api/v1/feeds/like/clustering/refresh?userId=${id}`,{
            withCredentials:true
        })
        return response.data
    }
    catch(error){
        throw new Error('API 요청 중 오류가 발생했습니다.')
    }
}

export const getFeedClusterByDistance = async (lat:number,lot:number,distance:number,page:number,size:number)=>{
    try{
        const response = await axios.get(`https://j11c205.p.ssafy.io/api/v1/feeds/cluster/center/nearby?latitude=${lat}&longitude=${lot}&distance=${distance}&page=${page}&size=${size}`,{
            withCredentials:true
        })
        return response.data
    }
    catch(error){
        throw new Error('API 요청 중 오류가 발생했습니다.')
    }
}

export const postPlan = async(planData:TravelPlan[])=>{
    try{
        const response = await axios.post<TravelPlan[]>(`https://j11c205.p.ssafy.io/api/v1/plans/create`,planData, {
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 데이터를 보낼 때 필요
            },
            withCredentials: true
          });
          console.log('POST',response);
          return response.data;
        } catch (error) {
          throw new Error('API 요청 중 오류가 발생했습니다.');
        }
    }