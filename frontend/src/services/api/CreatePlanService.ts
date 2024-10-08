import axios from "axios";

export const getFeedCluster = async ()=>{
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

export const getFeedClusterRefresh = async ()=>{
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