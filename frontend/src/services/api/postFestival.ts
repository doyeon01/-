import axios from 'axios';

const API_KEY = import.meta.env.VITE_FESTIVAL_API_KEY;

const getFestivalUrl = (
  pageNo: number = 1, 
  numOfRows: number = 10, 
  eventStartDate: string = '20240923', 
  areaCode?: string | null 
) => {
  const baseUrl = 'https://apis.data.go.kr/B551011/KorService1/searchFestival1';
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    MobileApp: 'AppTest',
    MobileOS: 'ETC',
    pageNo: String(pageNo),
    numOfRows: String(numOfRows),
    eventStartDate: eventStartDate,
    listYN: 'Y',
    arrange: 'A',
    _type: 'json'
  });

  if (areaCode) {
    params.append('areaCode', areaCode);
  }

  console.log(`${baseUrl}?${params.toString()}`);
  
  return `${baseUrl}?${params.toString()}`;
};

export const getFestivalData = async (
  pageNo: number = 1, 
  numOfRows: number = 10, 
  eventStartDate: string = '20240923', 
  areaCode?: string | null 
) => {
  try {
    const response = await axios.get(getFestivalUrl(pageNo, numOfRows, eventStartDate, areaCode));

    const items = response.data.response?.body?.items?.item;
    if (!items) {
      throw new Error('No items found in the response.');
    }
    
    return items;
  } catch (error) {
    console.error('Failed to fetch festival data', error);
    throw error;
  }
};
