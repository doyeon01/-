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
  totalPlanId: number;
  title: string;
  profileImageUrl: string; 
  nickName: string;
  createdDate:string;
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
  id: number;                       // 게시글 ID
  userId: number;                   // 사용자 ID
  totalPlanId: number;               // 일정 ID
  title: string;                    // 제목
  description: string;              // 설명
  profileImageUrl: string;          // 프로필 이미지 URL
  nickName: string;                 // 닉네임
  createdDate: string;              // 생성 날짜 (JSON의 createdDate와 일치)
  commentCount: number;              // 댓글 수
  accompanyDate?: string;           // 동행 날짜 (선택적, 필요시 추가)
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
  