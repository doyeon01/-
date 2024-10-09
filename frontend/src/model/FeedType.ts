// 맞춤 피드 조회

export interface FeedsType {
    id: number;
    totalPlanId: number;
    placeName: string;
    title: string;
    content: string;
    imageUrl: string;
    userId: number;
    likeCount: number;
    commentCount: number;
    address1: string;
    address2: string;
    longitude: number;
    latitude: number;
    placeType: string;
    nickName: string;
    userProfileImageUrl: string;
    isLiked: boolean;
    createdDate: string;
}


export interface FeedRecommendType {
    response: {
        feeds: FeedsType[];
        currentPage: number;
        hasNextPage: boolean;
    }
}


export  interface FeedRecommendApiResponseType {
success: boolean;
response: FeedRecommendType;
error: null | Error; 
}

//상세피드조회
 export interface ModalFeedDetailTypeProps {
    selectedId:number;
    closeModal: (updatedData?: { likeCount: number; commentCount: number }) => void; 
  }

export interface FeedDetailType{
    id: number;
    userId: number;
    nickName: string;
    profileImageUrl: string;
    feedImageUrl: string;
    title: string;
    content: string;
    address1: string;
    address2: string;
    longitude: number;
    latitude: number;
    placeType: string;
    likeCount: number;
    isLiked: boolean;
    createdDate:string;
}

export interface FeedDetailAPiResponseType {
  success: boolean;
  response: FeedDetailType;
  error: null | Error; 
}

// 피드 상세 댓글
export interface FeedCommentType {
    id: number;
    userId: number;
    feedId: number;
    content: string;
    nickName: string;
    profileImageUrl: string;
    createdDate: string; 
  }
  
  export interface FeedCommentsAPiResponseType {
    success: boolean;
    response: {
      comments: FeedCommentType[];
    };
    error: null|Error;
  }
  
  // 일정에 따른 피드 이미지 정보
  export interface FeedImageInfo {
    feedId: number;
    feedImageUrl: string;
  }
  