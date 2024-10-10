export interface RegisterUserType {
    nickname: string; 
    residence: string; 
    introduction: string | null; // 프로필 이미지 경로
    travelStyl1: string | null; // 여행 스타일 1 (null 가능)
    travelStyl2: string | null; // 여행 스타일 2 (null 가능)
    travelStyl3: string | null; // 여행 스타일 3 (null 가능)
    travelStyl4: string | null; // 여행 스타일 4 (null 가능)
  }