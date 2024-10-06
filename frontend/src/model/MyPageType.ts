// 유저 정보 얻는 api
export interface UserInfoType {
  id: number; // 유저 ID
  age: string; // 나이 (문자열, 예: "20-29")
  email: string; // 이메일
  gender: 'MALE' | 'FEMALE'; // 성별 (남성 또는 여성)
  name: string | null
  nickname: string | null; // 닉네임 (null 가능)
  profileImage: string; // 프로필 이미지 경로
  accompanyTemperature: number; // 동행 온도 (숫자형)
  introduction: string | null; // 자기소개 (null 가능)
  residence: null
  travelStyl1: string | null; // 여행 스타일 1 (null 가능)
  travelStyl2: string | null; // 여행 스타일 2 (null 가능)
  travelStyl3: string | null; // 여행 스타일 3 (null 가능)
  travelStyl4: string | null; // 여행 스타일 4 (null 가능)
}

export interface UserInfoResponseType {
  success: boolean;
  response: UserInfoType;
  error: null;
}


// 마이페이지 피드 목록 
export interface FeedType {
  id: number;
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
}

export interface FeedResponseType {
  success: boolean;
  response: {
    feeds: FeedType[];
    currentPage: number;
    hasNextPage: boolean;
  };
  error: null;
}

// 마이페이지 여행 일정 목록 
export interface PlanListType {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  thumbNailImageUrl: string;
  address: string;
  createdDate: string;
}

// 마이페이지 여행 일정 응답
export interface PlanListResponseType {
  success: boolean;
  response: PlanListType[];
  error: null;
  
}

// 각 장소 계획(플랜)의 타입
export interface PlanDetailType {
  id: number;
  day: number;
  placeName: string;
  imageUrl: string;
  address: string;
  placeType: string;
  details: string;
}

// 날짜별로 포함된 여러 플랜들의 타입
export interface DayPlanType {
  day: number;
  plans: PlanDetailType[];
}

// 마이페이지 일정 API 응답 타입
export interface PlanDetailResponseType {
  success: boolean;
  response: DayPlanType[];
  error: string | null;
}

// 포토카드 타입 정의
export interface PhotoCardType {
  id: number;
  userId: number;
  feedId: number;
  PlanTitle: string;
  photoCardUrl: string;
  createdDate: string;
}

// 마이페이지 특정 포토카드 조회 API 응답 타입 
export interface PhotoCardDetailResponseType {
  success: boolean;
  response: PhotoCardType
  error: string | null;
}


// 마이페이지 포토카드 전체 조회 API 응답 타입
export interface PhotoCardResponseType {
  success: boolean;
  response: {
    photoCards: PhotoCardType[];
    currentPage: number;
    hasNextPage: boolean;
  };
  error: string | null;
}

// FeedCard 컴포넌트 Props
export interface CardProps {
  title: string;
  address?: string;
  content: string;
  createdDate: string;
  comment: number;
  like?: number;
  image: string;
}


