//동행게시글 등록타입
export interface CreateArticleType {
  userId: number;
  scheduleId: number;
  title: string;
  description: string;
}

export interface CreateArticleWithIdType extends CreateArticleType {
  id: number; 
}

export interface CreateArticleApiResponseType {
  success: boolean;
  response: CreateArticleWithIdType;
  error: Error | null;
}


//동행게시글 전체타입
export interface ArticleType {
  id: number;
  userId: number;
  scheduleId: number;
  title: string;
  profileImage: string; 
  nickname: string;
  accompanyDate: string;
}

export interface ArticleApiResponseType {
  success: boolean;
  response: {
    articles: ArticleType[];
  };
  error: Error  | null;
}


//동행게시글 상세 타입
  export interface ArticleDetailType {
    id: number;     
    userId: number; 
    scheduleId: number; 
    title: string;  
    description: string;
    profileImage: string; 
    nickname: string;
    accompanyDate:string;
  }

  export  interface ArticleDetailApiResponseType {
    success: boolean;
    response: ArticleDetailType;
    error: null | Error; 
  }

//동행게시글 댓글
export interface CommentType {
  id: number;
  userId: number;
  accompanyBoardArticleId: number;
  profileImageUrl: string; 
  nickName: string;      
  content: string;
}

export interface CommentApiResponseType {
  success: boolean;
  response: {
    comments: CommentType[];
  };
  error: null | Error;
}
//댓글등록
 export interface CreateCommentRequestType {
    userId: number;
    accompanyBoardArticleId: number;
    content: string;
  }
  
 export interface CreateCommentResponseType {
    success: boolean;
    response: {
      id: number;
      userId: number;
      accompanyBoardArticleId: number;
      content: string;
    };
    error: null | Error;
  }


  // 마이페이지 동행게시글 

  export interface UserArticle {
    id: number;
    userId: number;
    scheduleId: number;
    title: string;
    description: string; 
    createdDate : string;
    commentCount: number;
    imageUrl: string;
    address: string;
  }
  
  export interface UserArticleApiResponse {
    success: boolean;
    response: {
      articles: UserArticle[];
      currentPage: number;
      hasNextPage: boolean;
    };
    error: Error  | null;
  }
  