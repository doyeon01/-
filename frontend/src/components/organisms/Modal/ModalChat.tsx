import React, { useState, useEffect, useRef } from 'react';

import { ModalChatTypeProps, ChatRoomType, userType,MessageType } from '../../../model/ChatType';
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
  const [followings,setFollowings] = useState<UserFollowingType[]|[]>([])
  const [userId] = useRecoilState(UserIdAtom);  
  const scrollRef = useRef<HTMLDivElement | null>(null); 

  const fetchData = () => {
    axios
      .get(`${BaseUrl}/api/v1/chat/user?userId=${userId}`)
      .then((response) => {         
        console.log(`챗아이디${response.data.response}`);
        console.log(response.data.response);
        setChatRooms(response.data.response);
      })
      .catch((error) => {
        console.error('채팅 방을 가져오는 중 오류가 발생했습니다:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  //웹소켓 언결
  const connectWebSocket = (roomId: number) => {
    console.log(`이 채팅방으로 연결 시도 ${roomId}`);
    fetchData()
    const socket = new SockJS('https://j11c205.p.ssafy.io/chat-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log(`연결시도하는 채팅방번호 ${roomId}`);
        setStompClient(client); 
        client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('브로커에서 보고된 오류:', frame.headers['message']);
      },
      onDisconnect: () => {
        console.log(`채팅방 ${roomId}에서 연결이 끊어졌습니다.`);
      },
      onWebSocketClose: (event) => {
        console.error('웹소켓 연결이 닫혔습니다:', event);
      },      
    });
    client.activate();
  };
  
  //채팅 룸설정
  const selectChatRoom = (roomId: number, user: userType) => {
    setPartnerUser(user);
    setSelectedRoomId(roomId);
    setMessages([]);
  
    axios
      .get(`${BaseUrl}/api/v1/chat/${roomId}`)
      .then((response) => {
        console.log(`채팅 룸설정 ${response.data.response}`);
        console.log(response.data.response);
        const sortedMessages = response.data.response.sort((a: MessageType, b: MessageType) => {
          return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
        });
  
        setMessages(sortedMessages);
      })
      .catch((error) => {
        console.error('메시지를 가져오는 중 오류 발생:', error);
      });
  
    if (stompClient) {
      stompClient.deactivate();
      stompClient.onDisconnect = () => {
        connectWebSocket(roomId);
      };
    } else {
      connectWebSocket(roomId);
      console.log("웹소켓에 연결 중입니다.");
    }
  };
  
  //팔로잉 채팅 연결
  const selectFollowingChatRoom = (followingId: number) => {
    const roomExists = chatRooms.some(chat => chat.user.userId === followingId);
    if (roomExists) {
      const existingChatRoom = chatRooms.find(chat => chat.user.userId === followingId);
      console.log(` ${followingId} : 이미 채팅룸 있음`, existingChatRoom);
      if (existingChatRoom && existingChatRoom.chatRoomId && existingChatRoom.user) {
        selectChatRoom(existingChatRoom.chatRoomId, existingChatRoom.user);
        console.log('이미 있는 채팅룸으로 연결');
      }      
      return; 
    }
      axios
      .post(`${BaseUrl}/api/v1/chat?userId=${userId}&partnerId=${followingId}`)
      .then((response) => {
        console.log(`팔로잉 채팅 연결${response}`);
        console.log(response.data);
        
        const chatRoomId = response.data.response.chatRoomId; 
        if (chatRoomId) {
          selectChatRoom(chatRoomId, response.data.response.userIds[1]);
        } else {
          console.error("chatRoomId가 정의되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.error('팔로잉에 대한 채팅 방을 가져오는 중 오류가 발생했습니다:', error);
      });
  };
  
  
  //팔로잉 리스트 가져오기
  useEffect(() => {
    const fetchFollowingList = async () => {
      const data:UserFollowingResponseType = await getFollowingList();       
      if (data.success) {
        setFollowings(data.response)
        }
    };
  
    fetchFollowingList();  
  }, []);  

  const sendMessage = () => {
    console.log('스톰프 클라이언트:', stompClient);
    console.log('새로운 메시지:', newMessage);
    if (stompClient && newMessage.trim() !== '') {
      
      const chatMessage = {
        senderId: userId,
        content: newMessage,
      };
      console.log(newMessage);
      
      stompClient.publish({
        destination: `/app/api/v1/chat/${selectedRoomId}`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
}, [messages]); 
  return (
    <>
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}/>
      <div className="fixed top-[30px] left-[200px] z-50 bg-[#F4F4EE] w-full max-w-6xl h-[90vh] rounded-lg shadow-lg overflow-hidden ">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50">
          &times;
        </button>

        <div className="flex h-full">
          <div className="w-[250px] bg-[#E5E2D9] border-r border-gray-400">
            <div className="mb-4">
              <input
                type="text"
                placeholder="검색"
                className="w-[230px] p-2 rounded-md bg-white border border-gray-300 m-2"
              />
            </div>
            <div className="w-full overflow-y-auto"   style={{ maxHeight: '90vh' , msOverflowStyle: 'none', scrollbarWidth: 'none'  }}>
              <ul>
                {followings.map((following, index) => (
                  <li
                    key={index}
                    className="flex items-center m-2 cursor-pointer "
                    onClick={() => selectFollowingChatRoom(following.id)}
                    >
                    {following.profileImage ? (
                    <img 
                      src={following.profileImage} 
                      alt={following.name} 
                      className='w-12 h-12 rounded-full mr-2' 
                    />
                    
                  ) : (
                    <UserIconMini3/>
                  )}
                    <p className="font-bold">{following.nickname}</p>
                  </li>
                ))}
              </ul>
              <div className='h-[100px]'></div>
            </div>
          </div>

          <div className="w-[250px] bg-[#F4F4EE]  border-r m-2 border-gray-400 overflow-y-auto"  style={{ maxHeight: '90vh' , msOverflowStyle: 'none', scrollbarWidth: 'none'  }}>
            <ul>
              {chatRooms.map((chat, index) => (
                <li
                  key={index}
                  onClick={() => selectChatRoom(chat.chatRoomId,chat.user)}
                  className="flex items-center mb-4 cursor-pointer ml-2"
                >
                  <img src={chat.user.profileImageUrl} alt={chat.user.nickname} className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <p className="font-bold">{chat.user.nickname}</p>
                    <p className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap" title={chat.user.nickname}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 relative z-40 border-b border-gray-400">
            {messages&&partnerUser ? (
              <>
                <div className="flex items-center m-4  ">
                  <img src={partnerUser.profileImageUrl} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <p className="font-bold">{partnerUser.nickname}</p>
                  </div>
                </div>

                <div
                  ref={scrollRef}
                  className="flex flex-col space-y-4 mb-4 overflow-y-auto"
                  style={{
                      maxHeight: '90vh',
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none',
                  }}
              >
                <div className='mb-[150px]'>
                  {messages.map((message, index) => (
                    <div key={index}>
                          {userId === message.senderId ? (
                            // 내가 보낸 메시지
                            <div className="flex justify-end mr-4">
                            <div className="bg-white p-2 rounded-lg border border-gray-300 mb-1">
                              <p>{message.content}</p>
                              <p className="text-xs text-gray-500 text-right">
                                {message.timeStamp ? message.timeStamp.substring(11, 16) : '방금 전'}
                              </p>
                            </div>
                          </div>                          
                          ) : (
                              // 상대가 보낸 메시지
                              <div className="flex items-start ml-4">
                                  <img
                                      src={partnerUser.profileImageUrl}
                                      alt="Profile"
                                      className="w-8 h-8 rounded-full mr-2"
                                  />
                                  <div className="bg-[#E5E2D9] p-2 rounded-lg border border-gray-300 mb-1">
                                      <p>{message.content}</p>
                                      <p className="text-xs text-gray-500 text-right">
                                        {message.timeStamp ? message.timeStamp.substring(11, 16) : '방금 전'}
                                      </p>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
                </div>
                <div className='h-[150px]'/>
              </div>

                {/* 대화입력창 */}
                <div className="absolute bottom-0 left-0 w-full bg-[#F4F4EE] p-4 border-t flex items-center space-x-2 z-50">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력해주세요."
                    className="flex-1 p-2 rounded-md border border-gray-300"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button onClick={sendMessage} className="bg-[#707C60] text-white px-4 py-2 rounded-md">
                    전송
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">채팅할 친구를 선택하세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalChat;
