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
  