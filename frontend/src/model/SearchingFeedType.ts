export interface FilterFeedType {
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
    username: string;
    userProfileImageUrl: string;
    isLiked: boolean;
    createdDate: string;

    // 필요한 다른 속성도 정의할 수 있습니다.
  }