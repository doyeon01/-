export interface UserProfileType {
    id: number;
    nickname: string;
    birth: string;  
    gender: string; 
    residence: string;
    introduction: string;
    accompanyTemperature: number;
    isFollowed:boolean;
    profileImageUrl:string;
  }
  
  export interface UserProfileResponseType {
    success: boolean;
    response: UserProfileType[];
    error:null|Error
  }
  
//키워드로 유저 조회 타입
 export interface UserSearchResponseType {
    success: boolean;
    response: UserDataType[];
    error: string | null;
  }
  
 export interface UserDataType {
    id: number;
    email: string | null;
    name: string;
    nickname: string ;
    gender: 'MALE' | 'FEMALE';
    age: string;
    profileImageUrl: string ;
    residence: string | null;
    introduction: string;
    travelStyl1: string;
    travelStyl2: string;
    travelStyl3: string;
    travelStyl4: string;
    isFollowed: boolean;
    accompanyTemperature: number;
  }