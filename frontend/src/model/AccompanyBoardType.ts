export interface Article {
  id: number;
  userId: number;
  scheduleId: number;
  title: string;
  profileImage: string; 
  nickname: string;
  accompanyDate: string;
}

export interface ArticleApiResponse {
  success: boolean;
  response: {
    articles: Article[];
  };
  error: Error  | null;
}


  
  export interface ArticleDetail {
    id: number;     
    userId: number; 
    scheduleId: number; 
    title: string;  
    description: string;
    profileImage: string; 
    nickname: string;
    accompanyDate:string;
  }

  export  interface ArticleDetailApiResponse {
    success: boolean;
    response: ArticleDetail;
    error: null | Error; 
  }
  