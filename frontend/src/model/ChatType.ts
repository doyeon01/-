export interface ModalChatProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export  interface Friend {
    name: string;
    img: string;
    lastMessage: string;
  }

  
  export interface user {
    birthday:string;
    gender:string;
    id:number;
    nickname:string;
    profileImage:string;
  }

  export interface ChatRoom {
    chatRoomId: number;
    lastMessage:string;
    lastMessageTime:string;
    lastUserName:string;
    users:user[];
  }
  
  export interface Message {
    senderId: number;
    chatRoomId:number;
    content: string;
    timeStamp:null|string;
  }

  export interface ClientOptions {
    brokerURL: string;
    onConnect?: (frame: any) => void; 
    onStompError?: (frame: any) => void;
  }