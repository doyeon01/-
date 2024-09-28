import axios from 'axios';

const BaseUrl = 'https://i11c205.p.ssafy.io:8080/api/v1/feeds';

// 피드 생성 api 
export const FeedCreate = async (formData: FormData) => {
  const response = await axios.post(`${BaseUrl}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': `Bearer ${token}`,
      
    },
  });

  console.log('피드 생성 완료:', response.data);  
};
