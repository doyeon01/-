import React, { useState, useEffect } from 'react';
import { ModalChatTypeProps, ChatRoomType, userType, MessageType } from '../../../model/ChatType';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { getFollowingList } from '../../../services/api/UserService';
import { UserFollowingResponseType, UserFollowingType } from '../../../model/User';
import { UserId as UserIdAtom } from '../../../Recoil/atoms/Auth'; 
import { useRecoilState } from 'recoil';
import { UserIconMini3 } from '../../../assets/icons/svg';

const BaseUrl = 'https://j11c205.p.ssafy.io';

const ModalChat: React.FC<ModalChatTypeProps> = ({ onClose }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [partnerUser, setPartnerUser] = useState<userType | null>(null);
  const [followings, setFollowings] = useState<UserFollowingType[] | []>([]);
  const [userId] = useRecoilState(UserIdAtom);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/v1/chat/user?userId=${userId}`);
        setChatRooms(response.data.response);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };
    fetchData();
  }, [userId]);

  // WebSocket 연결 설정
  const connectWebSocket = (roomId: number) => {
    console.log(`Attempting to connect to WebSocket for room ${roomId}`);
    const socket = new SockJS(`${BaseUrl}/chat-websocket`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log(`Connected to chat room ${roomId}`);
        setStompClient(client); 
        client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
      },
      onWebSocketClose: (event) => {
        console.error('WebSocket connection closed:', event);
        if (!event.wasClean) {
          setTimeout(() => {
            connectWebSocket(roomId);
          }, 5000);
        }
      },
    });
    client.activate();
  };

  // 채팅방 선택 및 메시지 로드
  const selectChatRoom = async (roomId: number, user: userType) => {
    setPartnerUser(user);
    setSelectedRoomId(roomId);
    setMessages([]);

    try {
      const response = await axios.get(`${BaseUrl}/api/v1/chat/${roomId}`);
      setMessages(response.data.response);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }

    if (stompClient) {
      stompClient.deactivate({ force: true });
      connectWebSocket(roomId);  
    } else {
      connectWebSocket(roomId);
    }

  };

  // 팔로잉한 유저와 채팅방 연결
  const selectFollowingChatRoom = async (followingId: number) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/chat?userId=${userId}&partnerId=${followingId}`);
      const chatRoomId = response.data.response.chatRoomId;
      if (chatRoomId) {
        selectChatRoom(chatRoomId, response.data.response.userIds[1]);
      } else {
        console.error("chatRoomId is undefined");
      }
    } catch (error) {
      console.error('Error fetching chat room for following:', error);
    }
  };

  // 팔로잉 리스트 가져오기
  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const data: UserFollowingResponseType = await getFollowingList();
        if (data.success) {
          setFollowings(data.response);
        }
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };
    fetchFollowingList();
  }, []);

  // 메시지 전송
  const sendMessage = () => {
    if (stompClient && newMessage.trim() !== '' && selectedRoomId) {
      const chatMessage = {
        senderId: userId,
        content: newMessage,
      };
      stompClient.publish({
        destination: `/app/api/v1/chat/${selectedRoomId}`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed top-[30px] left-[200px] z-50 bg-[#F4F4EE] w-full max-w-6xl h-[90vh] rounded-lg shadow-lg overflow-hidden ">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50">
          &times;
        </button>

        <div className="flex h-full">
          {/* 팔로잉 목록 */}
          <div className="w-1/5 bg-[#E5E2D9] p-4">
            <input type="text" placeholder="검색" className="w-full p-2 rounded-md bg-white border border-gray-300 mb-4" />
            <ul>
              {followings.map((following, index) => (
                <li key={index} className="flex items-center mb-4 cursor-pointer" onClick={() => selectFollowingChatRoom(following.id)}>
                  {following.profileImage ? (
                    <img src={following.profileImage} alt={following.name} className='w-12 h-12 rounded-full mr-2' />
                  ) : (
                    <UserIconMini3 />
                  )}
                  <p className="font-bold">{following.name}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* 채팅방 목록 */}
          <div className="w-1/4 bg-[#F4F4EE] p-4 border-l">
            <ul>
              {chatRooms.map((chat, index) => (
                <li key={index} onClick={() => selectChatRoom(chat.chatRoomId, chat.user)} className="flex items-center mb-4 cursor-pointer">
                  <img src={chat.user.profileImageUrl} alt={chat.user.nickname} className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <p className="font-bold">{chat.lastUserName}</p>
                    <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 채팅 창 */}
          <div className="flex-1 p-4 relative z-40">
            {messages && partnerUser ? (
              <>
                <div className="flex items-center mb-4">
                  <img src={partnerUser.profileImageUrl} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                  <p className="font-bold">{partnerUser.nickname}</p>
                </div>

                <div className="flex flex-col space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <div key={index}>
                      {userId === message.senderId ? (
                        <div className="flex justify-end">
                          <div className="bg-white p-2 rounded-lg border border-gray-300">
                            <p>{message.content}</p>
                            <p className="text-xs text-gray-500 text-right">{message.timeStamp}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start">
                          <img src={partnerUser.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                          <div className="bg-[#E5E2D9] p-2 rounded-lg">
                            <p>{message.content}</p>
                            <p className="text-xs text-gray-500">{message.timeStamp}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 flex items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-lg"
                    placeholder="메시지를 입력하세요"
                  />
                  <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    전송
                  </button>
                </div>
              </>
            ) : (
              <p>채팅방을 선택해주세요.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalChat;
