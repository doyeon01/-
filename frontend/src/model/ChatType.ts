export interface ModalChatTypeProps {
    onClose: () => void;
  }


  export interface userType {
    userId:number;
    nickname:string;
    profileImageUrl:string;
  }

  export interface ChatRoomType {
    chatRoomId: number;
    lastMessage:string;
    lastMessageTime:string;
    lastUserName:string;
    user:userType;
  }
  
  export interface MessageType {
    senderId: number;
    chatRoomId:number;
    content: string;
    timeStamp:string;
  }

  export interface ClientOptionsType {
    brokerURL: string;
    onConnect?: (frame: any) => void; 
    onStompError?: (frame: any) => void;
  }