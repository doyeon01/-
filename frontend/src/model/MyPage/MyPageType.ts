// 피드 생성 api
export interface Feed {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
  likeCount: number;
  address1: string;
  address2: string;
  longitude: number;
  latitude: number;
  placeType: string;
  username: string;
  userProfileImageUrl: string;
  isLiked: boolean;
  createdDate: string;
  commentCount: number;
  content: string;
}

export interface FeedResponse {
  success: boolean;
  response: {
    feeds: Feed[];
  };
  error: null;
}

// FeedCard 컴포넌트 Props
export interface CardProps {
  title: string;
  address?: string;
  content: string;
  createdDate: string;
  comment: number;
  like: number;
  image: string;
}


