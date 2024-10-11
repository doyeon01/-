export interface FeedType {
    id: number;
    scheduleId: number;
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
    profileImageUrl: string;
    isLiked: boolean;
    createdDate: string; // ISO 8601 날짜 형식
  }
  
  export interface FeedResponseType {
    feeds: FeedType[];
    currentPage: number;
    hasNextPage: boolean;
  }
  
  export interface FilterFeedType {
    success: boolean;
    response: FeedResponseType;
    error: string | null; // 에러가 없을 경우 null
  }

  export interface FeedClusterType {
    clusterId: string;
    latitude: number;
    longitude: number;
    feeds: FeedType[];
  }